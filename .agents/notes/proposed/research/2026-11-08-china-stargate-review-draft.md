# Galaxy video review draft

Class: research. Lifecycle: proposed. The user requested six revisions and a low-resolution draft for validation on 2026-11-08. Delivery-quality rendering is outside this revision step.

The draft uses narration only. The music element and automatic music preparation are removed. The first export and its audio are retained locally for comparison; this revision does not overwrite the delivery MP4.

The requested visual changes are a real Lei Zhang photograph, turbine blades clear of the power line, company/project identification with verified marks, and a higher-contrast China locator inset with its own background.

Power comparisons require explicit boundaries. Household comparisons convert continuous power into annual electricity using a dated EIA baseline. Stadium comparisons refer to available electrical capacity. The AI-centre comparison uses an explicit 100 MW computing-load example, not a universal facility size or an installed-chip claim.

Photo identity, rights, original URLs and any crop are recorded in the image manifest and credits. Brand marks identify the companies; no unrelated Galaxy business or Stargate entertainment logo belongs in this story.

The existing approved 1080p export is documented in the implemented research note. Draft measurements and user validation belong to this proposed note and the draft review files.

The portrait uses the 12 May 2025 Beijing meeting photograph by Ricardo Stuckert / Presidência da República, published by Lula Oficial under CC BY-SA 2.0. A right-half CSS crop preserves his full head and upper body. The Envision mark comes from its official site bundle; the OpenAI wordmark is sourced to its brand guidance. No standalone Stargate project mark was verified.

The 800 MW plan is compared with about 650,000 US homes’ annual grid purchases (EIA 2022, continuous full-year consumption), 67 Allianz Arena electrical connections (12 MW available each), and eight illustrative 100 MW IT centres. The 120 MW phase is about 100,000 homes on the same annual basis; the 5 MW pilot is about 4% of that phase. Cooling and other site loads remain additional. Exact formulas and source boundaries live in `research/china-stargate/data/power-comparisons.json`.

Revised narration is 203.32 seconds; the review timeline is 223 seconds, including 18 seconds of credits. All script figures match local ASR; approved spelling remains in captions. Reviewed ASR aliases cover proper names and unit abbreviations, while changed numbers still halt alignment.

Source validation passes runtime, layout, motion, contrast, craft and audio with zero errors. Six chapter-density warnings remain. The China inset has its own white panel, dark country outline, amber regional highlight and larger legend. The turbine power line starts outside the rotor’s entire swept area.

System `/tmp` returned a disk-quota error despite reported free space and closed Chrome during still capture. Project-local `TMPDIR` under the ignored `.hyperframes/tmp` resolves capture and audio preparation. `scripts/prepare-draft.py` copies the composition into an ignored 960 × 540, 15 fps project with a half-scale stage. It preserves the full-resolution source and first export.

The review draft is verified at `research/china-stargate/video/film/exports/galaxy-review-draft-2026-11-08.mp4`: 960 × 540, 15 fps, 223 seconds, 7,722,640 bytes. One software screenshot worker rendered it in 138.8 seconds. All 36 scene midpoints and representative decoded frames were inspected. Audio measures −14.2 LUFS integrated and −1.0 dBTP; credits are silent. Transcription and measurements do not replace the user’s listening review.

`verification-draft.json` and `REVIEW-draft.md` describe this review file. The first export’s hash is unchanged. User validation remains pending; no new delivery-quality render, push, publishing or outreach is part of this draft handoff. Keep this note proposed until that review is resolved.

## Motion revision, 9 November 2026

The approved revision follows the fax project's picture-first motion approach. Custom `sequences/capacity.html`, `sequences/power.html` and `sequences/energy.html` replace the capacity, engineering and energy chapter templates. `scripts/motion_sequences.py` inserts measured speech anchors and the existing opening and ending material for those chapters. The generator retains the template sources so rebuilding preserves the motion.

Power conversion reveals each stage in order. The constant 100 kW DC example animates voltage from 400 to 800 V and computes current as 100,000 W divided by voltage. At fixed resistance, the heating ratio is (125/250)² = 0.25. This refers to conductor heating in the illustrative example.

The wind sequence uses a declared relative-generation profile and constant example load. Stored energy integrates generation minus load over the example interval. Charging, discharge direction and exhaustion follow that integral. The example assumes lossless storage, omits power limits and introduces no Galaxy capacity or reliability measurements. One timeline clock drives the state for deterministic seeking.

The user's editor changes to opening-photo cropping and caption visibility are preserved in place and checkpointed under `.hyperframes/checkpoints/motion-review`. They are excluded from this revision's commits. The 203.32-second narration is reused, with staged actions placed at its existing sentence anchors. The 223-second duration stays within the approved 3–4 minute format.
