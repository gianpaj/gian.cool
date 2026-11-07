# Galaxy: from wind to AI

An editable 16:9 educational news video about Envision's Galaxy campus. The approved narration is in [story_script.json](../story_script.json). Production uses HyperFrames 0.9.20, 1920 × 1080 at 30 fps.

The measured Gemini narration is 186.44 seconds. The current cut is 206 seconds, including an ending hold and 18 seconds of credits. Shot boundaries follow the generated speech; the plan's six-second units remain editorial references.

## Files

- `index.html` mounts seven editable chapter compositions and a captions track.
- `compositions/` contains the chapter HTML and seekable timelines.
- `audio/narration-request.json` contains the performance text, vocal cues and style metadata.
- `audio/timing.json` records measured shot and caption timings.
- `narration.srt` contains captions made from approved copy, aligned to local transcription.
- `exports/galaxy-explained.mp4` is the generated delivery file, excluded from Git.
- `REVIEW.md` records visual and audio checks and remaining limits.

## Reproduce

Run commands from this folder. Node.js 22+, Python 3 and FFmpeg/FFprobe are required.

```sh
python3 scripts/prepare-assets.py
python3 scripts/generate-narration.py --key-file /path/to/private/gemini-key
npx --yes hyperframes@0.9.20 transcribe audio/narration.wav --engine whisper --model small.en --language en --no-runtime-install --json
python3 scripts/align-narration.py
python3 scripts/prepare-assets.py
python3 scripts/build-film.py
npx --yes hyperframes@0.9.20 check --snapshots --json
npx --yes hyperframes@0.9.20 render --quality delivery --workers 4 -o exports/galaxy-explained.mp4
```

The first asset preparation restores the image copies and current music duration. Repeat it after a fresh narration changes the measured timing. Gemini generation is nondeterministic; another take changes the timing and hash. Existing generated audio can be reused without another API request.

The speech workflow follows `~/.agents/skills/gemini-tts/SKILL.md` and its companion Prompting Guide. The local adapter uses the documented Gemini 3.8 `interactions` request because the skill's bundled helper uses preview-model fields. Sustained direction is in `speech_metadata.style`; three breaths and seven short pauses are inline vocal events. Performance tags do not enter captions.

## Credits and evidence

Full image attribution, original pages, licenses and adaptations are in [the image credits](../../images/CREDITS.md) and [map credits](../../images/maps/CREDITS.md). The film fits or crops licensed photographs and animates the regional wind photo. The wind-photo adaptation retains CC BY-SA 3.0 terms. The H100 watermark remains visible.

Music: "Cylinder Eight" by Chris Zabriskie, from *Cylinders*, 2014. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [composer's album](https://chriszabriskie.com/cylinders/), [composer's reuse statement](https://chriszabriskie.com/use/). The excerpt is normalized, mixed quietly and faded. The direct file URL and hash are in `audio/music-source.json`.

[Sources](../../sources/README.md), [founder reporting](../../sources/lei-zhang.md) and [claim checks](../../notes/evidence.md) accompany the video. Campus photography requiring permission is excluded. Generic hardware is labelled illustrative. No interview or location sound is presented. The article's paid sections were not accessed.

Fonts retain their license in `assets/fonts/LICENSE.txt`; GSAP retains its header and license link in `assets/vendor/README.md`.
