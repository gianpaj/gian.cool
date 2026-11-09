#!/usr/bin/env python3
"""Gemini TTS skill performance workflow, using Google's documented 3.8 API."""
import argparse
import base64
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import subprocess
import time
import urllib.error
import urllib.request

FILM = Path(__file__).resolve().parent.parent


def request_body():
    story = json.loads((FILM.parent/'story_script.json').read_text())
    breaths = {4, 14, 21}
    pauses = {1, 8, 13, 17, 22, 27, 32}
    passages = []
    for shot in story['story_script']:
        if not shot['narration']:
            continue
        n = shot['segment_id']
        text = ('<breath> ' if n in breaths else '') + shot['narration']
        if n in pauses:
            text += ' <short pause>'
        passages.append(text)
    style = (
        'Calm, curious documentary narration. Clear neutral British English. '
        'Conversational and connected, with measured emphasis on the explanatory questions. '
        'Aim for about 140 words per minute, slowing slightly for electrical units and figures. '
        'Keep the same vocal character throughout. Natural light breathing, without theatrical reactions. '
        'Pronounce Lei Zhang approximately lay jahng, and Ulanqab approximately oo-lahn-chahb. '
        'Read DC as D C, AI as A I, and CEO as C E O. '
        'Preserve every qualifier such as reports, planned and unverified.'
    )
    return {
        'model': 'gemini-3.8-flash-tts',
        'input': [{'type': 'user_input', 'content': [{
            'type': 'text', 'text': '\n\n'.join(passages),
            'annotations': [{'type': 'speech_metadata', 'style': style}],
        }]}],
        'response_format': {'type': 'audio'},
        'generation_config': {'speech_config': [{'voice': 'Charon'}]},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--key-file', type=Path)
    parser.add_argument('--prepare-only', action='store_true')
    args = parser.parse_args()
    body = request_body()
    (FILM/'audio').mkdir(exist_ok=True)
    (FILM/'audio/narration-request.json').write_text(json.dumps(body, indent=2, ensure_ascii=False)+'\n')
    if args.prepare_only:
        print('Prepared speech_metadata, 3 breaths and 7 short-pause cues; no API call')
        return
    key = args.key_file.read_text().strip() if args.key_file else os.environ.get('GEMINI_API_KEY')
    if not key:
        raise SystemExit('A Gemini API key is required; provide --key-file or GEMINI_API_KEY')
    data = json.dumps(body).encode()
    request = urllib.request.Request(
        'https://generativelanguage.googleapis.com/v1beta/interactions', data=data,
        headers={'x-goog-api-key': key, 'Content-Type': 'application/json'}, method='POST',
    )
    started = time.monotonic()
    print('Generating one continuous Gemini 3.8 / Charon narration take', flush=True)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=540) as response:
                result = json.load(response)
            break
        except urllib.error.HTTPError as error:
            message = error.read().decode(errors='replace').replace(key, '[redacted]')[:1500]
            if error.code in [429, 500, 502, 503, 504] and attempt < 2:
                print(f'HTTP {error.code}; retrying once capacity is available', flush=True)
                time.sleep(8*(attempt+1))
                continue
            raise SystemExit(f'Gemini request failed, HTTP {error.code}: {message}')
    audio = [content for step in result.get('steps', []) if step.get('type') == 'model_output'
             for content in step.get('content', []) if content.get('type') == 'audio']
    if not audio and isinstance(result.get('output_audio'), dict):
        audio = [result['output_audio']]
    if not audio:
        raise SystemExit('Gemini response contained no audio; no output was accepted')
    raw = base64.b64decode(audio[-1]['data'], validate=True)
    if raw[:4] != b'RIFF' or raw[8:12] != b'WAVE':
        raise SystemExit('Expected documented unary WAV output; response needs inspection')
    original = FILM/'audio/narration-original.wav'
    original.write_bytes(raw)
    subprocess.run([
        'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(original),
        '-af', 'loudnorm=I=-16:TP=-1.5:LRA=9', '-ar', '48000', '-ac', '1',
        str(FILM/'audio/narration.wav'),
    ], check=True)
    probe = subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0',
        str(FILM/'audio/narration.wav'),
    ], text=True)
    record = {
        'model': body['model'], 'voice': 'Charon',
        'generated_date': datetime.now(timezone.utc).date().isoformat(),
        'audio_duration_seconds': float(probe.strip()),
        'request_sha256': hashlib.sha256(data).hexdigest(),
        'audio_sha256': hashlib.sha256((FILM/'audio/narration.wav').read_bytes()).hexdigest(),
        'generation_wall_seconds': round(time.monotonic()-started, 2),
        'source_skill': '~/.agents/skills/gemini-tts/SKILL.md',
        'prompting_guide': '~/.agents/skills/gemini-tts/references/prompting-guide.md',
        'api_documentation': 'https://aistudio.google.com/docs/speech-generation.md',
        'adapter_reason': 'The installed skill helper uses preview generateContent fields. Gemini 3.8 uses interactions, speech_metadata.style and angle-bracket vocal cues.',
    }
    (FILM/'narration-generation.json').write_text(json.dumps(record, indent=2)+'\n')
    print(json.dumps(record, indent=2), flush=True)


if __name__ == '__main__':
    main()
