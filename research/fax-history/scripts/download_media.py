"""Download Commons media listed in a manifest and write CREDITS.md + credits.json.

usage: python3 -I download_media.py MANIFEST.tsv ROOT_DIR
manifest columns: folder<TAB>basename<TAB>File:title<TAB>caption
Folder "audio" goes to ROOT/audio, everything else to ROOT/images/<folder>.
Images wider than 1600px (and SVG/TIFF) are fetched as 1600px Commons thumbnails.
"""
import json, os, re, sys, time, urllib.parse, urllib.request

UA = "fax-history-research/0.1 (moveflux@gmail.com)"
API = "https://commons.wikimedia.org/w/api.php"
ENWIKI = "https://en.wikipedia.org/w/api.php"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(4):
        try:
            return urllib.request.urlopen(req, timeout=120).read()
        except Exception:  # noqa: BLE001
            if attempt == 3:
                raise
            time.sleep(3 + attempt * 5)


def strip(s):
    s = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()
    m = re.fullmatch(r"(.+?)\s*\1", s)  # Commons often renders "Unknown authorUnknown author"
    return m.group(1) if m else s


manifest, root = sys.argv[1], sys.argv[2]
rows = [line.rstrip("\n").split("\t") for line in open(manifest) if line.strip()]
credits = []
for folder, base, title, caption in rows:
    q = urllib.parse.urlencode({"action": "query", "format": "json", "formatversion": 2, "titles": title,
                                "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1600})
    page = json.loads(get(API + "?" + q))["query"]["pages"][0]
    host = "Wikimedia Commons"
    if "imageinfo" not in page:  # local (non-Commons) file on English Wikipedia
        page = json.loads(get(ENWIKI + "?" + q))["query"]["pages"][0]
        host = "English Wikipedia"
    if "imageinfo" not in page:
        print("MISSING", title)
        continue
    ii = page["imageinfo"][0]
    em = ii.get("extmetadata", {})
    g = lambda k: strip(em.get(k, {}).get("value", ""))  # noqa: E731
    mime = ii.get("mime", "")
    is_audio = folder == "audio"
    use_thumb = (not is_audio) and ii.get("thumburl") and (
        ii.get("width", 0) > 1600 or mime in ("image/svg+xml", "image/tiff"))
    url = ii["thumburl"] if use_thumb else ii["url"]
    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower() or ".bin"
    ext = {".jpeg": ".jpg"}.get(ext, ext)
    dest_dir = os.path.join(root, "audio" if is_audio else os.path.join("images", folder))
    os.makedirs(dest_dir, exist_ok=True)
    fn = base + ext
    path = os.path.join(dest_dir, fn)
    if os.path.exists(path):
        data = open(path, "rb").read()
    else:
        data = get(url)
        with open(path, "wb") as f:
            f.write(data)
    credits.append({
        "folder": "audio" if is_audio else f"images/{folder}", "file": fn, "caption": caption,
        "source_title": title, "host": host, "source_page": ii.get("descriptionurl"), "original_url": ii["url"],
        "original_size": f"{ii.get('width')}x{ii.get('height')}", "downloaded": "1600px thumbnail" if use_thumb else "original",
        "author": g("Artist")[:200] or "Unknown", "date": re.sub(r"\s*date QS:.*$", "", g("DateTimeOriginal"))[:60],
        "license": g("LicenseShortName"), "license_url": g("LicenseUrl"),
        "attribution_required": g("AttributionRequired"),
        "commons_description": g("ImageDescription")[:500],
    })
    print(f"ok {len(data)//1024:6} KB  {folder}/{fn}  [{g('LicenseShortName')}]")
    time.sleep(0.1)

with open(os.path.join(root, "credits.json"), "w") as f:
    json.dump(credits, f, indent=1, ensure_ascii=False)


def md_escape(s):
    return (s or "").replace("|", "\\|")


out = ["# Media credits", "",
       "Every file below comes from Wikimedia Commons (one from English Wikipedia). Licenses are copied from each file's Commons page "
       "at download time; check the source page before publishing. CC BY and CC BY-SA files need on-screen "
       "or end-credit attribution; CC BY-SA also requires sharing adaptations under the same license.", ""]
by_folder = {}
for c in credits:
    by_folder.setdefault(c["folder"], []).append(c)
for folder in sorted(by_folder):
    out += [f"## {folder}", "", "| File | Caption | Author | Date | License | Source |", "|---|---|---|---|---|---|"]
    for c in by_folder[folder]:
        out.append(f"| `{c['file']}` | {md_escape(c['caption'])} | {md_escape(c['author'][:80])} | {md_escape(c['date'][:25])} | "
                   f"{md_escape(c['license'])} | [{'Commons' if c['host'] == 'Wikimedia Commons' else 'en.wikipedia'}]({c['source_page']}) |")
    out.append("")
with open(os.path.join(root, "CREDITS.md"), "w") as f:
    f.write("\n".join(out))
print(f"\n{len(credits)} files; credits written")
