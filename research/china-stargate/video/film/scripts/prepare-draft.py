#!/usr/bin/env python3
"""Copy the composition into an ignored, half-resolution review project."""
import json
from pathlib import Path
import re
import shutil

FILM = Path(__file__).resolve().parent.parent
draft = FILM / '.hyperframes/draft-project'
draft.mkdir(parents=True, exist_ok=True)
for name in ['assets', 'compositions']:
    shutil.copytree(FILM/name, draft/name, dirs_exist_ok=True)
(draft/'audio').mkdir(exist_ok=True)
shutil.copy2(FILM/'audio/narration.wav', draft/'audio/narration.wav')

document = (FILM/'index.html').read_text()
document = document.replace('content="width=1920, height=1080"', 'content="width=960, height=540"')
document = document.replace('html,body{margin:0;width:1920px;height:1080px;', 'html,body{margin:0;width:960px;height:540px;')
document = document.replace('#root{position:relative;width:1920px;height:1080px;', '#root{position:relative;width:960px;height:540px;')
document = document.replace('</style></head>', '.draft-stage{position:absolute;width:1920px;height:1080px;transform:scale(0.5);transform-origin:0 0}</style></head>')
document, count = re.subn(
    r'(<div id="root"[^>]*data-width=")1920(" data-height=")1080(" data-fps=")30(">)',
    r'\g<1>960\g<2>540\g<3>15\g<4><div class="draft-stage">', document,
)
if count != 1:
    raise SystemExit('Expected exactly one master root; draft was not accepted')
document = document.replace('</div>\n<script>const tl=', '</div></div>\n<script>const tl=')
(draft/'index.html').write_text(document)
motion = json.loads((FILM/'index.motion.json').read_text())
motion['duration'] = json.loads((FILM/'audio/timing.json').read_text())['duration_seconds']
(draft/'index.motion.json').write_text(json.dumps(motion, indent=2)+'\n')
(draft/'meta.json').write_text(json.dumps({'id':'galaxy-review-draft','name':'Galaxy review draft — 540p'}, indent=2)+'\n')
print(f'Prepared {draft}: 960 × 540, 15 fps; narration only')
