import glob, json, re, sys

SKIP = re.compile(r"(commons-logo|wiki.?letter|question.?book|edit-clear|ambox|symbol|icon|flag of|padlock|wiktionary|wikisource|wikiquote|wikibooks|wikinews|wikiversity|wikivoyage|portal|crystal|nuvola|disambig|text-x|folder|loudspeaker|speaker icon|sound-icon|red pog|increase|decrease|steady|lock-|merge|split|stub|signature\.svg|ooui|p vip|gnome|office-|emblem|star|magnify|external)", re.I)

seen = set()
for path in sorted(glob.glob(sys.argv[1] + "/*.json")):
    d = json.load(open(path))
    rows = []
    for im in d["images"]:
        f = im["file"]
        if SKIP.search(f) or f in seen:
            continue
        seen.add(f)
        rows.append(im)
    if not rows:
        continue
    print(f"\n## [{d['group']}] {d['article']}")
    for im in rows:
        print(f"- {im['file'][5:]} | {im['license']} | {im['width']}x{im['height']} | {im['date'][:30]} | {im['artist'][:40]} | {im['description'][:110]}")
