# How a fax works, 1843 to today

Every fax machine ever built does the same five things. What changes across 180 years is how each step is done.

```
 SCAN  →  ENCODE  →  MODULATE  →  [ wire / radio / phone line / IP ]  →  DEMODULATE  →  PRINT
  ↑                                                                                     ↑
  └──────────────────────────── SYNCHRONISE (both ends in step) ─────────────────────────┘
```

| Step | 1840s–1860s (Bain, Caselli) | 1900s–1970s (photo-telegraph, G1/G2) | 1980– (Group 3) |
|---|---|---|---|
| Scan | Metal stylus touches foil: conductive or ink | Light spot + selenium cell or photomultiplier on a spinning drum | Row of light sensors (CCD/CIS), one scan line at a time |
| Encode | None. Current on/off **is** the image (1 bit) | Current proportional to brightness (analog greys) | Threshold to black/white bits, then Modified Huffman compression |
| Modulate | DC pulses on telegraph wire | Tone whose frequency or amplitude follows brightness | Modem: bits become phase/amplitude changes of a carrier (V.27ter, V.29, V.17, V.34) |
| Channel | Dedicated telegraph line | Telephone line, leased line, HF radio | Any phone line; later IP (T.38) |
| Print | Electrochemical paper darkens under current | Photographic paper, electrolytic paper, stylus | Thermal paper, then inkjet or laser |
| Sync | Pendulums and clocks; drifted constantly | Precise motors + start/phasing tones | Clock recovered from the data; an end-of-line (EOL) code every line |

## The sync problem is the through-line

- **Bain (1843)**: two pendulums regulated by clocks. They drifted, and the images sheared.
- **Bakewell (1848)**: rotating cylinders. Better, still drifted, and he couldn't guarantee both styluses started on the same spot.
- **Caselli (1860s)**: a heavy regulating pendulum making and breaking current to keep both ends locked. Good enough for commercial service.
- **Bidwell (1881)**: dodged the problem by putting both cylinders on one shaft, which is useless over distance.
- **Radiofax / APT**: a *start tone* spins up the receiving drum and a *phasing signal* lines up the left margin.
- **Group 3**: there is no shared motion. The receiver recovers timing from the modem signal, and every scan line ends with a unique EOL code (`000000000001`). If a line is corrupted, the damage stops at the next EOL.

## What a Group 3 page actually is

- A4 width is scanned as **1,728 pixels per line** (about 204 per inch).
- "Standard" resolution: **98 lines per inch** (3.85 lines/mm), about 1,145 lines per A4 page. "Fine": 196 lines per inch.
- Each pixel is **1 bit**: black or white. No grey. (Halftone photos are faked with dither dots.)
- Raw page at standard resolution: 1,728 × 1,145 ≈ **1.98 million bits** (about 247 KB).
- Each coded line must take at least a *minimum scan-line time* (20 ms by default; 0, 5, 10 or 40 ms by negotiation), and the sender pads short lines with fill bits. The digital signal waits for the mechanical printer to keep up.

## What you hear on the line

See `04-handshake-and-modems.md`. In short: the calling machine beeps (1,100 Hz), the answering machine screeches (2,100 Hz), both trade capability messages in a 300 bit/s warble, test the line at high speed, and then send the page as a hiss of fast modem data.

## Visuals to pair

- Scan: `../images/04-office-fax-1960-2000/fax-ccd-scanner-chip.jpg`, `../images/01-origins-1840-1900/1866-pantelegraph-tinfoil-mechanism.jpg`
- Sync: `../images/01-origins-1840-1900/caselli-pantelegraph-full-drawing.png` (the 2 m pendulum)
- Print: `../images/04-office-fax-1960-2000/thermal-fax-paper-roll.jpg`
- Whole pipeline today: `../images/05-digital-signals/t30-fax-call-phases.jpg`
