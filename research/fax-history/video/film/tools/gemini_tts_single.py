"""Generate the whole narration in ONE Gemini TTS request, then split it into lines.

One request keeps one voice: separate requests drift, and `seed` does not make
gemini-3.8-flash-tts reproducible. Lines from audio_request.json are joined with
`<long pause>`, and the result is cut back into lines at the pauses that best fit
each line's length.

Run from the film folder:
  GEMINI_API_KEY=... python3 -I tools/gemini_tts_single.py
  python3 -I tools/gemini_tts_single.py --split-only   # re-split the saved file
Writes assets/voice/narration-full.wav and assets/voice/<id>.wav for every line.
"""

import base64
import io
import json
import os
import sys
import urllib.request
import wave
from pathlib import Path

import numpy as np

FILM = Path.cwd()
VOICE = FILM / "assets" / "voice"
req = json.loads((FILM / "audio_request.json").read_text())
lines = req["lines"]
full = FILM / "assets" / "voice" / "narration-full.wav"

if "--split-only" not in sys.argv:
    text = " <long pause> ".join(line["text"] for line in lines)
    body = {
        "model": req["tts_model"],
        "input": [
            {
                "type": "user_input",
                "content": [
                    {
                        "type": "text",
                        "text": text,
                        "annotations": [{"type": "speech_metadata", "style": req["style"]}],
                    }
                ],
            }
        ],
        "response_format": {"type": "audio", "mime_type": "audio/wav"},
        "generation_config": {"speech_config": [{"voice": req["voice"]}]},
        "store": False,
    }
    request = urllib.request.Request(
        "https://generativelanguage.googleapis.com/v1beta/interactions",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "x-goog-api-key": os.environ["GEMINI_API_KEY"]},
    )
    with urllib.request.urlopen(request, timeout=900) as response:
        payload = json.load(response)
    if payload.get("status") != "completed":
        sys.exit(f"Gemini TTS did not complete: {payload.get('status')}")
    audio = [
        part
        for step in payload.get("steps", [])
        if step.get("type") == "model_output"
        for part in step.get("content", [])
        if part.get("type") == "audio"
    ]
    if len(audio) != 1:
        sys.exit(f"expected one audio block, got {len(audio)}")
    VOICE.mkdir(parents=True, exist_ok=True)
    full.write_bytes(base64.b64decode(audio[0]["data"]))

with wave.open(str(full)) as w:
    rate, width, channels = w.getframerate(), w.getsampwidth(), w.getnchannels()
    pcm = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
if channels != 1 or width != 2:
    sys.exit("expected mono 16-bit WAV")
x = pcm.astype(np.float64) / 32768
hop = rate // 100  # 10 ms frames
frames = x[: len(x) // hop * hop].reshape(-1, hop)
db = 20 * np.log10(np.sqrt((frames**2).mean(1)) + 1e-9)
silent = db < -45

# Every pause of 200 ms or more is a candidate boundary. The model does not make
# <long pause> reliably longer than a sentence pause, so pick the 31 cuts whose
# segment lengths best match each line's share of the text (dynamic programming),
# preferring longer pauses when two choices fit equally well.
runs, start = [], None
for i, s in enumerate(silent):
    if s and start is None:
        start = i
    elif not s and start is not None:
        runs.append((start, i))
        start = None
first_voice = int(np.argmax(~silent))
last_voice = len(silent) - int(np.argmax(~silent[::-1]))
runs = [r for r in runs if r[0] > first_voice and r[1] < last_voice and r[1] - r[0] >= 20]
need = len(lines) - 1
chars = np.array([len(line["text"]) for line in lines], dtype=float)
total = (last_voice - first_voice) / 100
expected = chars / chars.sum() * total
INF = float("inf")
n = len(runs)
# best[k][j]: cost of ending line k's segment at candidate j (k cuts used so far).
best = np.full((need, n), INF)
back = np.zeros((need, n), dtype=int)


def seg_cost(k, a, b, pause):
    d = (b - a) / 100
    return ((d - expected[k]) / expected[k]) ** 2 - 0.15 * pause


for j, (a, b) in enumerate(runs):
    best[0][j] = seg_cost(0, first_voice, a, (b - a) / 100)
for k in range(1, need):
    for j, (a, b) in enumerate(runs):
        pause = (b - a) / 100
        for i in range(j):
            if best[k - 1][i] == INF:
                continue
            c = best[k - 1][i] + seg_cost(k, runs[i][1], a, pause)
            if c < best[k][j]:
                best[k][j], back[k][j] = c, i
final = [
    best[need - 1][j] + seg_cost(need, runs[j][1], last_voice, 0) if best[need - 1][j] < INF else INF
    for j in range(n)
]
j = int(np.argmin(final))
picked = [j]
for k in range(need - 1, 0, -1):
    j = int(back[k][j])
    picked.append(j)
cuts = [runs[j] for j in sorted(picked)]
if len(cuts) != need:
    sys.exit(f"found {len(cuts)} cuts, need {need}")
print(f"total {len(x) / rate:.1f}s from {n} candidate pauses")

PAD = 0.3  # seconds of silence kept before and after each line
edges = [first_voice] + [c for cut in cuts for c in cut] + [last_voice]
report = []
for k, line in enumerate(lines):
    a, b = edges[2 * k], edges[2 * k + 1]  # voiced span in 10 ms frames
    s0 = max(0, int((a / 100 - PAD) * rate))
    s1 = min(len(pcm), int((b / 100 + PAD) * rate))
    out = VOICE / f"{line['id']}.wav"
    with wave.open(str(out), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm[s0:s1].tobytes())
    report.append({"id": line["id"], "duration_s": round((s1 - s0) / rate, 2), "speech_s": round((b - a) / 100, 2)})
(FILM / "assets" / "voice" / "split.json").write_text(json.dumps(report, indent=1))
for r in report:
    print(r["id"], r["speech_s"])
