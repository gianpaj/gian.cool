# Galaxy: from wind to AI

A 3:43 review cut about Envision's Galaxy campus, with an editable 16:9 project.
The script is in [story_script.json](../story_script.json). HyperFrames 0.9.20
keeps a 1920 × 1080 source and creates a separate 960 × 540, 30 fps motion draft for
user validation. The retained first export is 3:26 at 1080p.

The revised Gemini narration is 203.32 seconds. The review cut is 223 seconds,
including an ending hold and 18 seconds of credits. Shot boundaries follow
measured speech; six-second script units remain editorial references.

## Files

- `index.html` mounts seven editable chapter compositions and a captions track.
- `compositions/` contains the chapter HTML and seekable timelines.
- `audio/narration-request.json` contains the performance text, vocal cues and style metadata.
- `audio/timing.json` records measured shot and caption timings.
- `narration.srt` contains captions made from approved copy, aligned to local transcription.
- `exports/galaxy-explained.mp4` is the generated delivery file, excluded from Git.
- `REVIEW.md` records visual and audio checks and remaining limits.
- `scripts/prepare-draft.py` makes the ignored half-resolution review project.
- `exports/galaxy-review-draft-2026-11-08.mp4` is the revised draft, excluded from Git.
- `REVIEW-draft.md` and `verification-draft.json` record checks for that draft.
- `sequences/` contains the custom scale, power/current and wind/storage timelines. `scripts/motion_sequences.py` inserts narration anchors into these templates.
- `exports/galaxy-motion-draft-2026-11-09.mp4` is the motion revision for user review. Its evidence is in `REVIEW-motion.md` and `verification-motion.json`.

The retained [first export](exports/galaxy-explained.mp4) is 16.6 MiB.
[Its verification](verification.json) describes that file. It does not describe
the revised narration or current composition. The
[motion draft](exports/galaxy-motion-draft-2026-11-09.mp4) awaits user validation
before another delivery render.

## Reproduce

Run commands from this folder. Node.js 22+, Python 3 and FFmpeg/FFprobe are required. HyperFrames installs the local Whisper runtime and model on the first transcription when they are missing.

```sh
python3 scripts/prepare-assets.py
python3 scripts/generate-narration.py --key-file /path/to/private/gemini-key
npx --yes hyperframes@0.9.20 transcribe audio/narration.wav --engine whisper --model small.en --language en --json
python3 scripts/align-narration.py
python3 scripts/build-film.py
mkdir -p ~/.cache/agent-work/galaxy-motion
export TMPDIR=~/.cache/agent-work/galaxy-motion
npx --yes hyperframes@0.9.20 check --json
python3 scripts/prepare-draft.py
npx --yes hyperframes@0.9.20 snapshot .hyperframes/draft-project --frames 12 --no-browser-gpu --json
npx --yes hyperframes@0.9.20 render .hyperframes/draft-project --quality draft --fps 30 --workers 1 --low-memory-mode --no-browser-gpu -o exports/galaxy-motion-draft-2026-11-09.mp4
```

Asset preparation restores the image copies. The composition contains only the
narration audio track. Disk-backed task temporary storage avoids the system `/tmp`
quota that can close Chrome or fail the audio mix. Gemini generation is
nondeterministic; another take changes timing and hashes. Existing generated
audio can be reused without another API request.

The motion draft reuses the 203.32-second narration. Its custom sequences reveal
conversion stages, compute current while voltage changes, and integrate an
illustrative wind surplus and shortfall into battery state. Assumptions are in
[diagram-inputs.json](../../data/diagram-inputs.json). The 8 November draft is
retained at 15 fps. Remove the task scratch folder after rendering.

The speech workflow follows `~/.agents/skills/gemini-tts/SKILL.md` and its companion Prompting Guide. The local adapter uses the documented Gemini 3.8 `interactions` request because the skill's bundled helper uses preview-model fields. Sustained direction is in `speech_metadata.style`; three breaths and seven short pauses are inline vocal events. Performance tags do not enter captions.

## Credits and evidence

The [video credits](CREDITS.md) list only the material used in this cut.

Full image attribution, original pages, licenses and adaptations are in [the image credits](../../images/CREDITS.md) and [map credits](../../images/maps/CREDITS.md). The film fits or crops licensed photographs and animates the regional wind photo. The wind-photo adaptation retains CC BY-SA 3.0 terms. The H100 watermark remains visible.

The revised draft has no music, ambient bed or location sound. Music attribution
for the retained first export stays in [CREDITS.md](CREDITS.md).

[Sources](../../sources/README.md), [founder reporting](../../sources/lei-zhang.md) and [claim checks](../../notes/evidence.md) accompany the video. Campus photography requiring permission is excluded. Generic hardware is labelled illustrative. No interview or location sound is presented. The article's paid sections were not accessed.

Fonts retain their license in `assets/fonts/LICENSE.txt`; GSAP retains its header and license link in `assets/vendor/README.md`.

The CLI reports three companion HyperFrames skills missing. For further authoring support, the user can install the core pack with `npx hyperframes skills update`. The requested `hyperframes-cli` skill is installed.
