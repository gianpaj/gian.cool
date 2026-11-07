#!/usr/bin/env python3
"""Restore the film's image copies and licensed music from recorded sources."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import urllib.request

FILM = Path(__file__).resolve().parent.parent
RESEARCH = FILM.parents[1]
images = [('wind.jpg', 'open/ulanqab-wind-2012.jpg'), ('racks.jpg', 'open/server-racks.jpg'), ('h100.png', 'open/h100-board.png'), ('locator.png', 'maps/ulanqab-locator.png')]
(FILM/'assets/images').mkdir(parents=True, exist_ok=True)
for target, source in images:
    shutil.copyfile(RESEARCH/'images'/source, FILM/'assets/images'/target)
music = json.loads((FILM/'audio/music-source.json').read_text())
original = FILM/'audio/cylinder-eight.ogg'
if not original.exists():
    request = urllib.request.Request(music['direct_file_url'], headers={'User-Agent': 'gian.cool educational-video research'})
    with urllib.request.urlopen(request, timeout=90) as response:
        data = response.read()
    if hashlib.sha256(data).hexdigest() != music['sha256']:
        raise SystemExit('Music hash differs from the credited download')
    original.write_bytes(data)
timing = json.loads((FILM/'audio/timing.json').read_text())
duration = timing['duration_seconds']
subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(original), '-t', str(duration), '-af', f'loudnorm=I=-18:TP=-3:LRA=7,afade=t=in:d=1.5,afade=t=out:st={duration-4}:d=4', '-ar', '48000', '-ac', '2', str(FILM/'audio/music.wav')], check=True)
print('Prepared four credited image copies and the licensed music bed')
