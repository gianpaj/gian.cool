# Galaxy video production

Use the global `hyperframes-cli` skill for composition, validation and rendering.
Speech follows the global `gemini-tts` skill and its companion Prompting Guide.

- Keep the approved wording in `../story_script.json`; performance cues belong in `audio/narration-request.json`.
- `scripts/build-film.py` builds the chapter HTML from the story and measured `audio/timing.json`. Update the generator alongside composition changes so rebuilding preserves edits.
- Keep all media local. `scripts/prepare-assets.py` restores the credited image copies and music.
- Every figure needs a source or an explicit illustrative label. Preserve reported, planned and unverified qualifiers.
- Keep permission-needed photography out of the film. Preserve the H100 watermark and full image and music attribution.
- Use the pinned CLI in `package.json`. Run `npx hyperframes@0.9.20 check --json`, inspect snapshots, render, then inspect decoded output frames and audio measurements.
- Store generated audio, exports and rendering state outside Git. Never store an API key or an entire API response.
- Record production decisions in the existing `.agents/notes` research note. Commit only this task’s files.
- Publishing and interview outreach require a separate user request.
