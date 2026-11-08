#!/usr/bin/env python3
"""Align approved words to local ASR timings without replacing editorial text."""
import difflib
import json
import re
from pathlib import Path
import subprocess

FILM = Path(__file__).resolve().parent.parent
story = json.loads((FILM.parent/'story_script.json').read_text())
recognized = json.loads((FILM/'audio/transcript.json').read_text())
expected = []
spoken = []


def tokens(text):
    return re.findall(r"[a-z0-9]+(?:'[a-z]+)?", text.lower().replace('’', "'"))


for shot in story['story_script']:
    for word in shot['narration'].split():
        expected.append({'text': word, 'shot': shot['segment_id']})
for i, word in enumerate(expected):
    for token in tokens(word['text']):
        spoken.append((token, i))
asr_tokens = []
for i, word in enumerate(recognized):
    for token in tokens(word['text']):
        asr_tokens.append((token, i))
matcher = difflib.SequenceMatcher(None, [x[0] for x in spoken], [x[0] for x in asr_tokens], autojunk=False)
differences = []
for tag, a, b, c, d in matcher.get_opcodes():
    if tag != 'equal':
        differences.append({'kind': tag, 'approved': [x[0] for x in spoken[a:b]], 'asr': [x[0] for x in asr_tokens[c:d]]})
    allowed = [(['centre'], ['center']), (['kilometres'], ['kilometers']), (['ulanqab'], ['ulankarb']), (['semianalysis'], ['semi', 'analysis']), (["semianalysis's"], ['semi', "analysis's"]), (['five'], ['5'])]
    if tag != 'equal' and ([x[0] for x in spoken[a:b]], [x[0] for x in asr_tokens[c:d]]) not in allowed:
        raise SystemExit(f'Unexpected transcript difference needs review: {differences[-1]}')
    if tag == 'equal':
        mappings = [(a+i, c+i, c+i+1) for i in range(b-a)]
    elif tag == 'replace':
        mappings = [(i, c, d) for i in range(a, b)]
    else:
        raise SystemExit(f'Unmatched speech needs review before timing: {tag} {a}:{b} {c}:{d}')
    for expected_index, asr_start, asr_end in mappings:
        word = expected[spoken[expected_index][1]]
        first = recognized[asr_tokens[asr_start][1]]['start']
        last = recognized[asr_tokens[asr_end-1][1]]['end']
        word['start'] = min(word.get('start', first), first)
        word['end'] = max(word.get('end', last), last)

audio_duration = float(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0',
    str(FILM/'audio/narration.wav'),
], text=True).strip())
credits_start = int(audio_duration+1.999)
shot_starts = []
for shot in story['story_script'][:33]:
    first = next(x for x in expected if x['shot'] == shot['segment_id'])
    shot_starts.append(max(0, round(first['start']-0.1, 3)))
shot_starts[0] = 0
shot_starts += [credits_start, credits_start+6, credits_start+12]
captions = []
for shot in story['story_script'][:33]:
    words = [w for w in expected if w['shot'] == shot['segment_id']]
    group = []
    for i, word in enumerate(words):
        group.append(word)
        sentence_end = word['text'].endswith(('.', '?'))
        if len(group) >= 6 or sentence_end or i == len(words)-1:
            captions.append({'text': ' '.join(x['text'] for x in group), 'start': group[0]['start'], 'end': group[-1]['end'], 'shot': shot['segment_id']})
            group = []
for i, caption in enumerate(captions):
    next_start = captions[i+1]['start'] if i+1 < len(captions) else audio_duration
    caption['end'] = min(next_start, caption['end']+0.08)

timing = {
    'audio_duration_seconds': audio_duration, 'duration_seconds': credits_start+18,
    'shot_starts': shot_starts, 'captions': captions,
    'alignment': 'Approved text aligned by token position to whisper small.en word timings. ASR spelling does not replace script copy.',
    'asr_token_similarity': round(matcher.ratio(), 6), 'asr_differences': differences,
}
(FILM/'audio/timing.json').write_text(json.dumps(timing, indent=2, ensure_ascii=False)+'\n')


def stamp(seconds):
    ms = round(seconds*1000)
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'


(FILM/'narration.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(c["start"])} --> {stamp(c["end"])}\n{c["text"]}' for i,c in enumerate(captions))+'\n')
print(json.dumps({'narration_seconds': audio_duration, 'film_seconds': timing['duration_seconds'], 'caption_groups': len(captions), 'asr_token_similarity': timing['asr_token_similarity'], 'differences': differences}, indent=2))
