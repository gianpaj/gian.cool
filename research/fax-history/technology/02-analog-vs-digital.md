# Analog vs digital signals, told through fax

Fax is a good teaching vehicle because it has been both. It started on/off, went analog to carry photographs, and came back to digital to get fast and reliable.

## The two ideas

- **Analog signal**: a quantity (voltage, tone frequency) that varies continuously and directly mirrors the original. A brighter spot gives a higher tone, smoothly. Any value is allowed, so any noise added on the way becomes part of the signal, and the receiver can't tell the difference.
- **Digital signal**: the original is turned into a sequence of symbols from a small fixed set (two, for bits). The receiver only has to decide *which* symbol it got. If the noise stays below the decision threshold, the copy is **perfect**, and it can be regenerated, stored, compressed and error-checked.

Images: `../images/05-digital-signals/analog-vs-digital-sampled-signal.png`, `digital-signal-noise.png`.

## Turning a page into numbers: sample, quantise, code

1. **Sample (in space).** Chop the page into a grid. Group 3: 1,728 dots across, 98 or 196 lines per inch down. Bartlane (1920) used a coarse grid of photo cells.
2. **Quantise.** Round each dot's brightness to a fixed level. Group 3: 1 bit (black or white). Bartlane: 5 levels (15 from 1929). Colour fax (JPEG): 8 bits per channel.
3. **Code.** Represent the levels compactly. Group 3 uses run-length plus Huffman codes (`03-compression.md`).

**Nyquist–Shannon:** to capture detail of a given size you need samples closer than half that size. Undersample and you get **aliasing**, false patterns. Fax users saw this as moiré when faxing printed photos made of halftone dots. Image: `aliasing-moire-bricks.jpg`, `nyquist-sampling-animation.gif`.

## Why analog fax struggled

- Line loss and noise show up directly in the picture. Nyquist (AT&T, 1920s) found that a change in line loss that sounds like a slightly quieter call shows up as **bands of wrong shading** on a photo, and that frequency-dependent delay **blurs edges**.
- Group 1 and Group 2 machines sent the page as a continuously varying tone, one scan line after another "in the same manner as a frame of analog television". They needed 6 and 3 minutes per page and dedicated attention to line quality.
- Analog can't be compressed by skipping blank space: a white margin takes as long to send as a dense paragraph.

## Why digital won

- **Noise immunity.** Bits are either right or wrong, and with ECM wrong ones are re-sent.
- **Compression.** Most of a business letter is white. Coding *runs* of white instead of every dot cuts the data about 10–20×.
- **Interoperability.** A digital standard (T.4/T.30, 1980) lets any brand talk to any other.
- **Cheap chips.** By 1980 a microprocessor and modem chip cost less than precision drum motors.

## Do the maths: compression made Group 3 fast, not just "being digital"

| Rate | Raw page (1.98 Mbit) | With 10× compression | With 20× compression |
|---|---|---|---|
| 4,800 bit/s (early G3, V.27ter) | 412 s ≈ 6.9 min | 41 s | 21 s |
| 9,600 bit/s (typical G3, V.29) | 206 s ≈ 3.4 min | 21 s | 10 s |
| 14,400 bit/s (V.17) | 137 s | 14 s | 7 s |
| 33,600 bit/s (V.34 "Super G3") | 59 s | 6 s | 3 s |

An uncompressed digital page at 9,600 bit/s would take about as long as an analog Group 2 page (3 minutes). The win came from **digital plus compression**. The Fax article puts typical MH compression at "around 20", or about 10 s per page.

## Digital data still travels as analog sound

The phone line between two fax machines only carries audio (about 300–3,400 Hz). A **modem** (MOdulator-DEModulator) encodes bits as changes in a tone:

- **FSK** (frequency-shift keying): two tones for 0 and 1. Fax uses V.21 FSK at 300 bit/s for its handshake. Image: `fsk-frequency-shift-keying.jpg`.
- **PSK / QAM**: shift the phase (and amplitude) of a carrier among a few allowed states; each state carries several bits. V.27ter (4,800), V.29 (9,600), V.17 (14,400).
- The receiver still makes a digital decision: which of the allowed states was closest?

**Shannon's limit**: a ~3.1 kHz phone channel with a signal-to-noise ratio around 35 dB can carry at most about 36 kbit/s (C = B·log₂(1 + S/N)). That's why V.34's 33.6 kbit/s is close to the ceiling for an analog phone call. 56k modems only beat it because one end sat directly on the digital network.

## The arc for the video

1. **1843–1870, on/off.** Bain and Caselli's machines detect contact or no contact. Effectively 1-bit pixels, though nobody called them bits.
2. **1888, digital too early.** Gray's telautograph sends pen movement as pulses. The hardware can't keep up, and analog wins for decades.
3. **1902–1970s, analog greys.** Photocells make photographs possible, sent as continuously varying currents and tones.
4. **1920, a digital island.** Bartlane quantises photos to 5 grey levels and sends them as telegraph code across the Atlantic.
5. **1924–1948, theory.** Nyquist, working partly on picture transmission, and then Shannon define how many symbols a channel can carry.
6. **1969–1980, digital takes over.** Dacom patents run-length compression (1969), Ricoh ships the RIFAX digital fax (1973), and the CCITT Group 3 standard (1980) makes it universal: 1-bit pixels again, now compressed. A standards engineer called it "the first digital transmission of visual information" (Musmann), though Bartlane had a claim 60 years earlier.
7. **1998–today, digital inside digital.** T.38 turns fax tones back into bits and ships them as IP packets.

## Sources

`../sources/wikipedia/`: `digital-signal.md`, `analog-signal.md`, `nyquist-shannon-sampling-theorem.md`, `pulse-code-modulation.md`, `harry-nyquist.md`, `modem.md`, `fax.md`, `bartlane-system.md`, `telautograph.md`, `t-38.md`.
