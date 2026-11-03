# SPEC: The first fax was digital

Storyline A′ in `STORYLINES.md`. Picture only for now. A voiceover comes later, so on-screen lines carry the words. Every fact below comes from `../../notes/` and `../../technology/`; do not add new claims.

```text
GOAL:    the viewer leaves knowing a picture is just dots sent in step: fax began as on/off dots,
         went analog for a century, and won when it went back to dots in 1980.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps
TIME:    300 s x 30 = 9,000 frames. No music (not signed in to HeyGen); real recordings only.
LOOK:    the medium is a Group 3 fax printout on thermal paper.
         paper  #EFEFEC (--paper), flat. Optional scan texture: 1 px ink lines every 4 px at 3% opacity.
         ink    #141414 (--ink): every word and structural line.
         accent #FF4F1F (--accent): the moving scan line / playhead, and at most one word per scene.
                Accent text on paper uses #D93A0B (--accent-text) for contrast.
         darkroom #262624 (--darkroom): the ground of the analog era only (s04). Text there is --paper.
         images are baked, never CSS-filtered: *-bit.png = 1-bit fax dither (2x4 px dots),
         *-grey.png = continuous tone (analog era), *-onoff.png = hard threshold (1840s-60s).
         Before 1980 images are grey or on/off; from 1980 on they are 1-bit.
         display: "Archivo Black" 400, 84-120 px, tracking -1%, line-height 1.02, ink.
         quiet:   "Roboto" 500, 40-48 px, line-height 1.2.
         bits:    "IBM Plex Mono" 600, 36-64 px, for binary codes, Hz and bit counts only.
         no shadows, no grain, no vignette, no blur on stills.
OBJECTS: the page (Caselli's real 1862 Paris-Lyon pantelegram on a sheet), the scan line (3 px
         accent bar across the page at the print edge), pendulums (rod + round bob, ink, drawn),
         machines and photos (real archive images), the spectrogram (real recording), packets
         (paper-coloured rectangles with a 2 px ink outline, 1-bit dot pattern inside).
MOTION:  enter expo.out or power4.out, 0.5-0.8 s; camera and floods power2.inOut 0.6-1.2 s;
         exits power3.in, 40-50% shorter than the entrance; the scan line and playhead are linear.
         titles: vary per scene (per-word blur 6 px -> 0, 0.067 s apart; per-word grey -> ink;
         whole-line blur 8 px -> 0 in 0.18 s). A landed title is dead still. Exit: blur-out + fade 0.2 s.
         word stagger 60-120 ms. Something new every 2-4 s.
BANNED:  dark void with small floating things; glow, particles, gradients, glass cards; serif display,
         italic accent words, numbered "01/02" labels, small mono caps labels, pills; everything
         centred; every element fading and sliding up; text moving while read; corner labels,
         frame borders, HUD; three cards in a row; bullet lists; breathing or floating loops;
         CSS filters on images; emoji or icons in circles.
QA:      t=0 page already part-printed with scan line (thumbnail); t=13 "digital" in accent;
         t=33 sheared copy readable as slanted; t=50 on/off face; t=58 darkroom ground;
         t=95 page half noisy, half clean; t=130 67-dot row with runs; t=158 EOL code;
         t=190 two machines and two clocks; t=212 spectrogram playhead mid-way, labels;
         t=245 packets crossing; t=268 "67%"; t=289 final line; t=296 credits readable.
```

## Conventions for every scene file

- File `compositions/sNN.html`. Everything inside `<template>`. Root `<div id="root" data-composition-id="sNN" data-width="1920" data-height="1080">`, styled as `#root { position:absolute; inset:0; background: var(--paper); overflow:hidden; }`.
- Prefix every id with the scene id (`s04-title`). Timed elements: `class="clip"`, `data-start`, `data-duration` in seconds local to the scene; land end states before the end.
- One paused GSAP timeline per scene, registered last: `window.__timelines["sNN"] = tl;`. Use `fromTo` only. Never tween `display`/`visibility`/`autoAlpha` on a `.clip`; animate a child wrapper. No CSS `transform` on anything GSAP moves. No `Math.random`, `Date.now`, timers or `repeat: -1` (finite `repeat` with `yoyo` is fine).
- Assets: `assets/img/<name>.png` (sizes in `assets/manifest.json`), no leading slash. Show images at 1x or smaller (they are pre-sized), `image-rendering: pixelated` on `*-bit.png` and `*-onoff.png`.
- Text inside the title-safe box: x 192-1728, y 108-972. Text >= 28 px. A line holds at least 0.5 s + 0.3 s a word.
- Audio lives in `index.html` only. Do not add `<audio>` in scenes.
- Mark each scene's key frame with `data-beat` on its root or hero element so `snapshot --review` samples it.

## Shots

Times are absolute (scene-local = absolute - scene start). Copy is exact; keep it verbatim.

### s01 Hook, 0-20 (beat 1)
- 0-5.8: paper. The page (`page-bit`, shown at 0.85 = 748 x 952, right side, x 1010, y 64) prints top to bottom behind the scan line (linear, 0 -> 5.5 s). Frame 0 already shows ~30% printed. Left, x 192: "Why does a fax scream?" (display 112 px, per-word blur in from 0.3 s). Sound: the real handshake recording starts at 0.
- 6.0-11.0: camera push into the page (wrapper scale 1 -> 4.2 on the word "Paris", power2.inOut 1.2 s) until single dots read. Title swaps: "Every fax is made of dots."
- 10.9-12.2: pull back out, then the page is pulled up out of frame. 12.0-15.0: Bain's 1843 patent drawing (`bain-patent-grey`, 678 x 720 at x 1050, y 170) prints in its place behind a scan line. Left: "The first fax was digital." with "digital" in accent, then "In 1843.", then quiet: "Each dot: contact, or no contact. On or off."
- Hand-off: at 20.0 only the Bain drawing remains, right side (x 1050, y 170, 678 x 720); all text has left.

### s02 Bain's pendulums, 20-36 (beat 2, old way)
- 20-21.5: the Bain drawing starts where s01 left it (right) and exits right (power3.in 0.5 s). Two pendulums draw in on the left half (rods 340 px, bobs 56 px, labelled "sender" and "receiver" on the bobs, 32 px). They swing with a phase gap that grows over the scene.
- Right: a fresh copy prints behind the scan line from 21 to 31 s, using `page-sheared`, so each line lands further right.
- Lines, bottom-left band: "Two pendulums kept both machines in step." (21-25.2), "Almost. They drifted apart." (25.6-29.8), "So every line landed a little further right." (30.2-35.7).

### s03 Caselli, 36-54 (beat 2)
- Blur swap: the sheared page leaves; `caselli-drawing-grey` (height 900) enters left.
- "1865. Caselli's pantelegraph." (36.5-41), quiet: "A 2-metre pendulum held both ends in step." (38.5-44).
- 41-47: the page (`page-grey`, the real 1862 message) arrives right. "Paris to Lyon: the first regular fax service." quiet: "11 years before the telephone."
- 47-54: the page morphs into the on/off face (`coolidge-onoff`, height 900, right). "But on/off dots can't carry a face."
- Hand-off: face at the right holds.

### s04 Analog, 54-80 (beat 2)
- 54.0-54.4: colour flood paper -> darkroom; the face stays and crossfades on/off -> grey (`coolidge-grey`) over 0.6 s. Text in paper colour.
- "So fax went analog." (54.6-58.6), quiet: "Light became current. Current became shades of grey." (56.5-61).
- 59.5-65: on the face: "1924: a photo across the Atlantic by radio."
- 65-71: `belino-1914-grey`: "1914: a photo by phone line, in four minutes."
- 71-75: `icebreaker-grey`: "Radio carried weather maps to ships." (radiofax sound plays from 71).
- 75-80: `page-noisy` arrives: "Every crackle on the line became a mark on the page."
- 79.4-80: carry across: the noisy page moves to the right half (x 1000, height 950) while the ground floods back to paper.

### s05 New rule, 80-110 (beat 3)
- Start: noisy page right. Left: "Don't send the picture." then "Send the decision." ("decision" in accent).
- 86-96: a diagram grows on the left: a noisy analog wave (SVG, deterministic sum of sines), a dashed threshold line, then a clean on/off square wave drawn beneath. Quiet: "Above the line: white. Below: black. Small noise changes nothing."
- 93.5-96.5: the scan line sweeps down the page; above it `page-bit`, below it `page-noisy` (clip-path), so the page snaps clean.
- 96.5-109.5: `bartlane-grey` replaces the diagram. "1920: Bartlane sent photos across the Atlantic as telegraph code." quiet: "Five shades of grey, sent as code."

### s06 The scan line, 110-145 (beat 4, mechanism)
- 110-112: zoom through into one row of the clean page.
- "1980: one standard for every fax machine." (111-116), quiet: "Group 3, agreed at the CCITT."
- 116-122: a strip of 1,728 dots spans the frame; count-up "1,728 dots in every line."
- 122-135: the worked example from T.4. 67 squares (22 px each) for `12W 1B 12W 3B 24W 1B 14W`; runs bracket underneath with "12 white", "1 black", …; then the codes in bits face: `001000 010 001000 10 0101000 010 110100`. Line: "Send how many, not every dot." Count lands: "67 dots. 33 bits."
- 135-145: a blank line: `010011011 00110101 000000000001`. "A blank line: 1,728 dots in 29 bits." quiet: "Most of a page is blank."

### s07 Modem, sync, Japan, 145-180 (beat 4)
- 145-153: the 33-bit string morphs into a wave (SVG). "A modem turns the bits into sound." (modem sound 147-153).
- 153-163: "Every line ends with the same code:" then `000000000001` (bits face, 72 px). A small pair of pendulums (as in s02) appears and gives way to the code: "A code does the pendulum's job."
- 163-180: `minifax-bit` right. "Japan pushed hardest. Kanji are slow to type, easy to fax." then "Japan offered its compression patents free, if the world adopted them."

### s08 Proof: speed and scale, 180-205 (beat 5)
- 180-181: whip in. Left `mufax-grey`, right `kxf90-bit`. Under each a page prints: left crawls, right prints a whole page in about 2 s, again and again.
- Labels on each: "Group 1 (1968): 6 minutes a page" and "Group 3 (1980): 6 to 15 seconds".
- 193-205: a field of dots, one dot per 25,000 machines: 1 dot for 1970, growing to 200 dots for 1990. "US fax machines: 25,000 in 1970. 5 million in 1990." quiet: "Nearly all made in Japan."

### s09 The scream decoded, 205-232 (beat 5)
- 205-206: dip cut in. `spec-bit` full width (x 120, y 260, 1680 x 560). Title top: "The scream, decoded."
- 206.0-216.31: accent playhead moves linearly across (163 px per second; recording plays from 206). Labels land as it passes (y positions in `assets/manifest.json` `spec-axis`):
  - 206.0 "2,100 Hz: “I'm a fax.”"
  - 208.5 "Get ready"
  - 209.5 "What I can do, at 300 bits a second"
  - 211.0 "Silence: waiting for an answer"
  - 213.7 "No reply, so it asks again"
- 216.8: "Two machines agreeing how to send the dots." 222.5 quiet: "Then the page itself: a hiss of compressed bits."

### s10 Packets, 232-258 (beat 6, payoff)
- 232.0-232.4: colour flood paper -> ink; the spectrogram strip collapses into a row of bits.
- "Today, the call is often not a phone call." (232.5-238)
- 238-250: a diagram that grows left to right: fax -> tones -> "T.38" gateway -> bits -> packets crossing (with duplicate copies) -> gateway -> fax. Lines: "T.38 turns the tones back into bits" then "and sends them as internet packets, with spare copies."
- 250-258: "Digital, inside digital." ("inside" in accent).

### s11 Still here, 258-280 (beat 6)
- 258.0-258.4: flood back to paper. `receiving-2009-bit` left. Count-up "67%" then "of US hospitals still used fax in 2023."
- 266-272: `sharp-home-bit` right. "In Japan, 59% of homes had a fax in 2012."
- 272-280: the page (`page-bit`) prints centred behind the scan line (272-276, print sound plays). "Dots, like 1843. This time, every one exact."

### s12 Action, 280-292 (beat 7)
- 280-285.5: the page shrinks left; a strip of the spectrogram right with its 2,100 Hz band marked in accent (tone plays 280.5-283). "Next time a fax screams, listen for the 2,100 Hz tone." quiet: "It's saying: I'm a fax."
- 286-292: alone on paper, display 110 px: "A picture is just dots, sent in step." Holds to the end.

### s13 Credits, 292-300
Paper, ink, Roboto 30 px, two columns, all on screen by 292.6 and held. Text:

Images (changed to 1-bit and greyscale), via Wikimedia Commons:
- 1914 Belinograph photo: BnF, CC BY-SA 4.0
- Mufax Courier: Richard Ash, CC BY-SA 2.0
- Panasonic KX-F90: Pittigrilli, Georgfotoart, CC BY-SA 4.0
- NTT Minifax MF1: Spbear, CC BY-SA 4.0
- Receiving a fax: Karl Baron, CC BY 2.0
- Sharp UX-D63CL: Mr.ちゅらさん, CC BY-SA 4.0
- Public domain: Bain patent (EPO), Caselli drawings, 1862 pantelegram (R. W. Burns, IEE), Coolidge photoradiogram (Radio News, 1925), Bartlane (Science and Invention), icebreaker weather fax (Helsingin Sanomat)

Sounds:
- Fax answering tones: Anton, CC BY-SA 2.5
- Radiofax: US National Weather Service, public domain
- V.92 fax modem: EditUZB, CC BY-SA 4.0
- Laser fax: Work With Sounds / Werstas, CC BY 4.0
