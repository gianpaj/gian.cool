"""Fetch Wikipedia plaintext + image metadata for a list of titles.

usage: python3 -I fetch_articles.py OUT_TEXT_DIR OUT_META_DIR group:title [group:title ...]
"""
import json, re, sys, time, urllib.parse, urllib.request, datetime

UA = "fax-history-research/0.1 (moveflux@gmail.com)"
API = "https://en.wikipedia.org/w/api.php"
TODAY = datetime.date.today().isoformat()


def api(params, base=API):
    params = {**params, "format": "json", "formatversion": 2}
    req = urllib.request.Request(base + "?" + urllib.parse.urlencode(params), headers={"User-Agent": UA})
    for attempt in range(4):
        try:
            return json.load(urllib.request.urlopen(req, timeout=60))
        except Exception as e:  # noqa: BLE001
            if attempt == 3:
                raise
            time.sleep(2 + attempt * 3)


def slug(s):
    s = s.lower()
    s = re.sub(r"[^\w]+", "-", s, flags=re.UNICODE).strip("-")
    return s


def strip_html(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return re.sub(r"\s+", " ", s).strip()


def main():
    text_dir, meta_dir = sys.argv[1], sys.argv[2]
    for arg in sys.argv[3:]:
        group, title = arg.split(":", 1)
        d = api({"action": "query", "titles": title, "redirects": 1,
                 "prop": "extracts|revisions|info|images", "explaintext": 1,
                 "exsectionformat": "wiki", "rvprop": "ids|timestamp", "inprop": "url",
                 "imlimit": "max"})
        page = d["query"]["pages"][0]
        real = page["title"]
        rev = page["revisions"][0]
        text = page.get("extract", "")
        header = (f"# {real}\n\n"
                  f"Source: {page['fullurl']}\n"
                  f"Revision: {rev['revid']} ({rev['timestamp']})\n"
                  f"Retrieved: {TODAY}\n"
                  f"License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.\n\n---\n\n")
        fn = f"{text_dir}/{slug(real)}.md"
        with open(fn, "w") as f:
            f.write(header + text + "\n")
        files = [im["title"] for im in page.get("images", [])]
        meta = []
        for i in range(0, len(files), 40):
            chunk = files[i:i + 40]
            m = api({"action": "query", "titles": "|".join(chunk), "prop": "imageinfo",
                     "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1600})
            for p in m["query"]["pages"]:
                ii = (p.get("imageinfo") or [{}])[0]
                em = ii.get("extmetadata", {})
                g = lambda k: strip_html(em.get(k, {}).get("value", ""))  # noqa: E731
                meta.append({
                    "file": p["title"],
                    "page": ii.get("descriptionurl"),
                    "url": ii.get("url"),
                    "thumb": ii.get("thumburl"),
                    "width": ii.get("width"), "height": ii.get("height"),
                    "mime": ii.get("mime"),
                    "description": g("ImageDescription")[:600],
                    "date": g("DateTimeOriginal"),
                    "artist": g("Artist")[:200],
                    "credit": g("Credit")[:200],
                    "license": g("LicenseShortName"),
                    "license_url": g("LicenseUrl"),
                    "usage_terms": g("UsageTerms"),
                })
        with open(f"{meta_dir}/{group}__{slug(real)}.json", "w") as f:
            json.dump({"article": real, "url": page["fullurl"], "group": group, "images": meta}, f, indent=1, ensure_ascii=False)
        print(f"{group:10} {real:45} {len(text):7} chars  {len(meta):3} images")
        time.sleep(0.3)


if __name__ == "__main__":
    main()
