#!/usr/bin/env python3
"""Restore the film's image copies from recorded sources."""
from pathlib import Path
import shutil

FILM = Path(__file__).resolve().parent.parent
RESEARCH = FILM.parents[1]
images = [('wind.jpg', 'open/ulanqab-wind-2012.jpg'), ('racks.jpg', 'open/server-racks.jpg'), ('h100.png', 'open/h100-board.png'), ('lei-zhang.jpg', 'open/lei-zhang-2025.jpg'), ('envision-wordmark.png', 'brand/envision-wordmark.png'), ('openai-wordmark.svg', 'brand/openai-wordmark.svg')]
(FILM/'assets/images').mkdir(parents=True, exist_ok=True)
for target, source in images:
    shutil.copyfile(RESEARCH/'images'/source, FILM/'assets/images'/target)
print('Prepared the credited photograph copies; narration-only audio')
