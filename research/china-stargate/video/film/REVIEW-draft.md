# Galaxy review draft

The [540p draft](exports/galaxy-review-draft-2026-11-08.mp4) is ready for user
validation. It runs 3:43 at 15 fps, with 203.32 seconds of narration and 18 seconds
of credits. The file is 7.4 MiB. No delivery-quality render was made for this
revision; the retained first export has the same SHA-256 as its verification.

## Requested changes

- Narration is the only audio source. Music, ambient beds and location sound are absent.
- Lei Zhang’s slide uses a documented May 2025 photograph, cropped to his full head and upper body. Photographer, publisher, license and crop are credited.
- The turbine power line starts beyond the complete rotor sweep and paints before the turbine. SVG rotation keeps the blades attached to the hub.
- The 800 MW plan has original home, stadium and AI-centre graphics. The household calculation assumes continuous full-year use and EIA 2022 grid purchases. Stadiums compare available electrical power. Eight AI centres assumes 100 MW of computing load each; cooling needs extra power. The 120 MW phase and 5 MW pilot also have scale context.
- Envision and OpenAI company marks accompany Galaxy and Stargate. No separate official Stargate project logo was verified; the marks identify the companies.
- The China inset has a white panel, dark border, stronger Inner Mongolia highlight and enlarged legend. Geographic reference points and straight-line distances are unchanged.

## Verification

HyperFrames checks pass runtime, layout, motion, contrast, craft and audio with
zero errors. All 51 contrast checks pass. Six lint warnings concern the number of
shots within coherent chapter files. Browser audits ran.

All 36 scene midpoints were inspected at draft size. Twelve frames were decoded
from the exported MP4; representative frames cover the turbine, portrait, map,
marks, comparisons and credits. Four static comparisons against source snapshots
have SSIM from 0.9667 to 0.9859, consistent with the deliberately compressed draft.
Frame times round to the nearest 1/15 second, so a caption can change near a
snapshot boundary.

The H.264/AAC file contains 3,345 video frames at 960 × 540 and exactly 223 seconds
of audio and video. Audio measures −14.2 LUFS integrated and −1.0 dBTP, below
clipping. The credits contain silence. Rendering took 138.8 seconds through one
software screenshot worker. Exact measurements and hashes are in
[verification-draft.json](verification-draft.json).

Whisper transcription was checked against the 438-word script. Figures and
qualifiers match. Reviewed differences are proper-name spellings, word splits
and unit abbreviations; numeric changes still halt alignment. Captions preserve
script spelling. Audio was measured and transcribed, not heard by the agent.
User listening review should cover pronunciation, breaths and pacing.

System `/tmp` returned a quota error during audio preparation and closed Chrome
during snapshots. Project-local `TMPDIR` under `.hyperframes/tmp` resolves both.
The derivative draft project and generated media remain outside Git.

## Evidence limits

The article’s paid sections were not accessed. Delivered capacity, the planned
campus and actual operating load remain distinct. No chip inventory, measured
efficiency, hourly energy mix or interview answer is asserted. Full photo,
brand-mark and source provenance is in [CREDITS.md](CREDITS.md).
