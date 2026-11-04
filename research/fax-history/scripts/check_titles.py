import json, sys, urllib.parse, urllib.request
UA = "fax-history-research/0.1 (moveflux@gmail.com)"
titles = sys.argv[1:]
for i in range(0, len(titles), 40):
    chunk = titles[i:i+40]
    q = urllib.parse.urlencode({"action": "query", "titles": "|".join(chunk), "redirects": 1, "format": "json", "prop": "info"})
    req = urllib.request.Request("https://en.wikipedia.org/w/api.php?" + q, headers={"User-Agent": UA})
    d = json.load(urllib.request.urlopen(req))
    redir = {r["from"]: r["to"] for r in d["query"].get("redirects", [])}
    norm = {r["from"]: r["to"] for r in d["query"].get("normalized", [])}
    pages = {p["title"]: p for p in d["query"]["pages"].values()}
    for t in chunk:
        t2 = norm.get(t, t)
        t3 = redir.get(t2, t2)
        p = pages.get(t3, {})
        status = "MISSING " if ("missing" in p or not p) else "ok      "
        arrow = "" if t3 == t else f"  -> {t3}"
        size = f"  ({p.get('length')} bytes)" if p.get("length") else ""
        print(status + t + arrow + size)
