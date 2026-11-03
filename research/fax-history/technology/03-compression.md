# How fax compresses a page: MH, MR, MMR, JBIG

Most of a faxed letter is white paper. Group 3 compression is built on that one observation.

## Step 1: run-length encoding

Instead of sending every pixel, send how many of the same colour come in a row. Example scan line from the Modified Huffman article (W = white, B = black):

```
WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW   (67 pixels)
→ 12W 1B 12W 3B 24W 1B 14W
```

Lines always start with a white run. If a line starts black, a white run of length 0 is sent first, so colours simply alternate and never need to be named.

## Step 2: Huffman codes for the run lengths (Modified Huffman, T.4, 1980)

David Huffman (MIT, 1952) showed how to give frequent symbols short codes and rare ones long codes, with no code being the prefix of another. The CCITT measured run lengths on a set of test documents and fixed **two codebooks**, one for white runs and one for black. Short black runs (pen strokes) and medium or long white runs get the shortest codes.

Selected codes from ITU-T T.4 (the full tables are in the standard):

| Run | White code | Black code |
|---|---|---|
| 0 | `00110101` | `0000110111` |
| 1 | `000111` | `010` |
| 2 | `0111` | `11` |
| 3 | `1000` | `10` |
| 4 | `1011` | `011` |
| 12 | `001000` | `0000111` |
| 14 | `110100` | `00000111` |
| 24 | `0101000` | `00000010111` |
| make-up 64 | `11011` | `0000001111` |
| make-up 1728 (full line) | `010011011` | `0000001100101` |
| End of line (EOL) | `000000000001` | |

Runs of 64 or more are sent as a *make-up* code (a multiple of 64) plus a *terminating* code (0–63).

**Worked example** (the line above):

```
12W   1B   12W    3B  24W      1B   14W
001000 010 001000 10  0101000  010  110100   = 33 bits instead of 67 pixels
```

**A blank line** (1,728 white pixels) is make-up 1728 `010011011` + terminating 0 `00110101` = 17 bits, plus a 12-bit EOL: **29 bits instead of 1,728**, about 60× smaller.

**Catch: the printer has to keep up.** T.4 sets a minimum time per coded line (20 ms by default; 0, 5, 10 or 40 ms by negotiation) so a mechanical printer can finish each line. At 9,600 bit/s, 20 ms is 192 bits, so the sender pads the blank line with fill bits and the real saving is about 9×. The digital signal waits for the mechanics.

**A line with a little text**, for example 100 white, 4 black, then 1,624 white:

```
make-up 64 + W36      B4    make-up 1600 + W24       EOL
11011 00010101        011   010011010 0101000        000000000001   = 44 bits for 1,728 pixels
```

How much a whole page compresses depends on the page and the resolution:

- Wikipedia (Fax article): MH averages about **20×**.
- Hans Musmann, who was in the standards work: MH cut the bits "only by a factor of four", and the 2D code aimed for 10×.

On narration, "10 to 20 times" is safe for a typical letter. See `../images/05-digital-signals/huffman-tree.png`, `huffman-coding-visualisation.png` and the Dacom patent drawing `../images/web/1979-dacom-us4135214-facsimile-data-compression.png` (a letter on a pixel grid coded as runs).

Checked against ITU-T T.4 (07/2003): the white and black codes for runs 0–4, the make-up 64 and 1728 codes, EOL, the white codes for 24 and 36, and the minimum line time. Black codes for 12, 14 and 24 are from secondary reproductions; check them in the T.4 PDF before showing them on screen.

## Step 3: use the line above (Modified READ, T.4 optional)

READ = Relative Element Address Designate. Adjacent scan lines are usually nearly identical, so MR codes where each black/white edge sits **relative to the edge just above it** ("same place", "one pixel left", "three right"). Only when the two lines differ a lot does it fall back to run lengths.

- About twice MH's compression (IEEE milestone). Developed by Japan's NTT and KDD, partly building on 1960s 2D binary-image coding by Thomas Huang. At the CCITT Kyoto meeting Japan offered the patents free if MR was adopted.
- To stop one bit error from wrecking the rest of the page, MR re-sends a full MH line every **2 lines** (standard resolution) or **4 lines** (fine), the "K factor". Group 3 had no error correction at first.

## Step 4: trust the channel (MMR, T.6, Group 4)

Modified Modified READ drops the periodic MH reset and codes every line from the one above, assuming a clean digital channel (ISDN) or error correction (ECM). Roughly halves transmission time again.

## Step 5: predict each pixel (JBIG, T.82/T.85, added to fax in 1999)

- For every pixel, look at about 10 already-sent neighbours, estimate the chance this one is black, and feed that probability into an **arithmetic coder** (IBM Q-coder with a Mitsubishi refinement, the "QM-coder").
- 20–50% smaller than MMR on text, and up to **30×** better on halftone photos, where run-lengths do badly.
- Patent worries kept JBIG out of most free software until the last patents expired in 2012.

## Proprietary tricks

- **Matsushita Whiteline Skip** (Panasonic): squeezes several blank lines into the space of one, but only between two Panasonic machines.

## Before the standard

- Dacom's 1969 patent coded runs adaptively. The Dacom 450 used a 2D run-length code "two rows at a time", in 585-bit frames with a CRC (RFC 803, 1981).
- The CCITT MH code (1976–80) was a compromise between proposals from IBM, KDD and the German PTT / TU Braunschweig (Musmann).

## Why this matters for the story

Compression is what made fax fast. It also shows the standards process at work: a committee of rival companies and countries measured real documents, chose codebooks, and fixed them in a standard, so every machine in the world decodes the same bits the same way.

## Sources

`../sources/wikipedia/`: `fax.md` (Compression section), `modified-huffman-coding.md`, `run-length-encoding.md`, `huffman-coding.md`, `jbig.md`, `jbig2.md`. Primary: ITU-T Recommendations T.4, T.6, T.82, T.85 (free PDFs at itu.int); Hunter & Robinson, "International Digital Facsimile Coding Standards", *Proc. IEEE* 68(7), 1980. Web: IEEE milestone (G3, 1980), Musmann and Huang oral histories, RFC 803 (`../sources/web-research.md` §2, §4, §6).
