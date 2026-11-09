# Galaxy video production

Use the global `hyperframes-cli` skill for composition, validation and rendering.
Read the core HyperFrames explainer and motion guidance bundled with the pinned CLI when changing explanatory scenes.
Speech follows the global `gemini-tts` skill and its companion Prompting Guide.

- Keep the approved wording in `../story_script.json`; performance cues belong in `audio/narration-request.json`.
- `scripts/build-film.py` builds the chapter HTML from the story and measured `audio/timing.json`. Update the generator alongside composition changes so rebuilding preserves edits.
- Custom capacity, power and energy sequences live in `sequences/`. `scripts/motion_sequences.py` inserts their measured speech anchors. Inspect actions and transitions across several frames, including backward seeks.
- Keep all media local. `scripts/prepare-assets.py` restores the credited image copies. The review draft uses narration only.
- Every figure needs a source or an explicit illustrative label. Preserve reported, planned and unverified qualifiers.
- Keep permission-needed photography out of the film. Preserve the H100 watermark, photo adaptation terms and company-mark provenance.
- Use the pinned CLI in `package.json`. Run `npx hyperframes@0.9.20 check --json`, inspect snapshots, render, then inspect decoded output frames and audio measurements.
- Store generated audio, exports and rendering state outside Git. Never store an API key or an entire API response.
- Record production decisions in the existing `.agents/notes` research note. Commit only this task’s files.
- Publishing and interview outreach require a separate user request.
