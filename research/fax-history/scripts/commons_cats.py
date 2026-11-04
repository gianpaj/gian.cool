"""List Commons category members (files + subcats) with license metadata.

usage: python3 -I commons_cats.py OUT_JSON "Category:A" "Category:B" ...
"""
import json, re, sys, time, urllib.parse, urllib.request

UA = "fax-history-research/0.1 (moveflux@gmail.com)"
API = "https://commons.wikimedia.org/w/api.php"


def api(params):
    params = {**params, "format": "json", "formatversion": 2}
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(params), headers={"User-Agent": UA})
    return json.load(urllib.request.urlopen(req, timeout=60))


def strip(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


out = {}
for cat in sys.argv[2:]:
    d = api({"action": "query", "list": "categorymembers", "cmtitle": cat, "cmlimit": 200, "cmtype": "file|subcat"})
    members = d["query"]["categorymembers"]
    subcats = [m["title"] for m in members if m["ns"] == 14]
    files = [m["title"] for m in members if m["ns"] == 6]
    meta = []
    for i in range(0, len(files), 40):
        m = api({"action": "query", "titles": "|".join(files[i:i + 40]), "prop": "imageinfo",
                 "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1600})
        for p in m["query"]["pages"]:
            ii = (p.get("imageinfo") or [{}])[0]
            em = ii.get("extmetadata", {})
            g = lambda k: strip(em.get(k, {}).get("value", ""))  # noqa: E731
            meta.append({"file": p["title"], "page": ii.get("descriptionurl"), "url": ii.get("url"),
                         "thumb": ii.get("thumburl"), "width": ii.get("width"), "height": ii.get("height"),
                         "mime": ii.get("mime"), "description": g("ImageDescription")[:600],
                         "date": g("DateTimeOriginal"), "artist": g("Artist")[:200], "credit": g("Credit")[:200],
                         "license": g("LicenseShortName"), "license_url": g("LicenseUrl")})
    out[cat] = {"subcats": subcats, "images": meta}
    print(f"\n## {cat}  ({len(files)} files)  subcats: {', '.join(s[9:] for s in subcats)}")
    for im in meta:
        print(f"- {im['file'][5:]} | {im['license']} | {im['width']}x{im['height']} | {im['date'][:25]} | {im['artist'][:30]} | {im['description'][:100]}")
    time.sleep(0.3)

json.dump(out, open(sys.argv[1], "w"), indent=1, ensure_ascii=False)
