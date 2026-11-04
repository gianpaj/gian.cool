# Review: The first fax was digital

## Creative calls

- Storyline A′ from `STORYLINES.md`, in 13 scenes over 300 s. A and C were not built. B's "scream decoded" became beat 5 (s09).
- The page carried through the film is Caselli's real 1862 Paris–Lyon pantelegram.
- Images are baked by `tools/prepare_assets.py`, never CSS-filtered:
  - before 1980 they are grey or hard on/off;
  - from 1980 they are a 1-bit fax dither in 2×4 px dots.
- No music: the project isn't signed in to HeyGen. Sound is only real recordings, each placed on the action that makes it: the handshake (0 s, 206 s, 280.5 s), radiofax (71 s), the V.92 modem (148.4 s) and the laser fax printing (272 s).
- Narration: Gemini `gemini-3.8-flash-tts`, voice Charon, 32 lines (`audio_request.json`). All lines are generated in one request by `tools/gemini_tts_single.py`, so the voice stays the same throughout; separate requests drifted, and `seed` does not make the model repeatable. The file is cut back into lines at the pauses that best fit each line's length (`assets/voice/split.json`); a transcription of every piece matched its first and last words. One `<audio>` per line in `index.html`, alternating tracks 7 and 8, each starting at its scene's anchor. The voice never repeats an on-screen line word for word.
- Effects sit under the voice: the hook recording drops from 0.8 to 0.2 after the 2,100 Hz tone, and radiofax plays at 0.18. The s09 decode (206–216.3 s) and the print (272–277 s) play with no voice over them.
- s12's last line starts at 287.6 s, after the narration ends.

## Measured

- `check --json`: ok, with no errors or warnings.
- Deliberate reading holds carry `data-hold`. Intended crops and exits carry `data-layout-allow-overflow`.
- `snapshot --review`: every scene start, middle and `data-beat`, plus the 12 seams. Seams match on both sides.
- The s09 playhead matches the audio to under 1 px (measured at 212 s).

## Looked at only

- Motion between sampled frames.
- The sound, which nobody has heard. Voice clips peak between −1 and −5 dBFS; the full mix was not measured because there is no render yet.

## Weakest shots

- **s08 (180–205):** two photos, two small pages and two dials read a little like a dashboard. With more time: one machine at a time, full-height.
- **s06 (122–135):** the 67-square row is a thin strip in a mostly empty frame. With more time: zoom the row to fill the height and run the codes under it at a larger size.
- **Layout repetition:** text on the left and an image on the right repeats in s03, s04, s05 and s07.

## Kept on purpose

- **Short blur transitions** (about 0.2 s CSS blur) on image wrappers: the s03 and s04 blur swaps and the s08 whip. They are motion smears, not still treatments.
- **Off-grid sizes:**
  - s11 "67%" at 220 px, so the number is the largest thing on screen.
  - s11's page at 480 × 611, to fit the two lines beside it.
- **Cuts through blank paper or ink:** about 0.35 s at 145 s (s06 → s07), 258 s (s10 → s11) and 292 s (s12 → s13).
- **The s08 dot field** grows through three known points: 25,000 in 1970, 250,000 in 1980 and 5 million in 1990. The years in between are interpolated.
