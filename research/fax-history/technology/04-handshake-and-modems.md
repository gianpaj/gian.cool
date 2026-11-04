# The fax handshake: what the screech means (ITU-T T.30)

The famous fax noise is two machines negotiating in public. T.30 (1980) defines five phases. Recording: `../audio/fax-answering-tones.ogg`. Annotated modem spectrogram: `../images/05-digital-signals/modem-handshake-spectrogram-annotated.png`. Phase diagram: `../images/05-digital-signals/t30-fax-call-phases.jpg`.

## Phase A: call set-up

| Signal | Who | Sound | Purpose |
|---|---|---|---|
| **CNG** (calling tone) | Caller | 1,100 Hz beep, 0.5 s on / 3 s off | "I'm a fax." Lets a shared line or answering machine route the call. |
| **CED** (called terminal identification) | Answerer | At least 0.2 s silence, then 2,100 ± 15 Hz for 2.6–4.0 s, then a 75 ms gap | "I'm a fax too." 2,100 Hz is also the standard answer tone that switches off the network's echo suppressors so data can pass. Newer (V.8) machines send a modulated version, ANSam (`../audio/2016-ansam-2100hz-answer-tone.wav`). |

## Phase B: pre-message procedure (negotiation and training)

Control messages go as **HDLC frames over V.21 FSK at 300 bit/s**: the warbling "brrrr". Each burst starts with about 1 s of flag bytes so the receiver can lock on.

1. Answerer sends **CSI** (its number), optional **NSF** (vendor extras) and **DIS** (Digital Identification Signal), listing what it can do: modem speeds, resolutions, page width, compression (MH/MR/MMR/JBIG), error-correction mode.
2. Caller picks the best common settings and replies **TSI** (its number) + **DCS** (Digital Command Signal).
3. **Training check (TCF):** the caller sends 1.5 s of zeros at the chosen *high* speed. If the answerer receives them cleanly it sends **CFR** (confirmation to receive). If not, **FTT** (failure to train), and the caller drops a speed and tries again: 14,400 → 12,000 → 9,600 → 7,200 → 4,800 → 2,400.

The audible fall-back is fax's version of feeling out a bad line.

**Decoded recording.** `../audio/fax-answering-tones.ogg` was run through an FFT and matches T.30 exactly (full table in `../audio/CREDITS.md`):

| Time | Frequency | What it is |
|---|---|---|
| 0.0–2.5 s | 2,100 Hz | CED answer tone |
| 2.5–3.5 s | ~1,650 Hz | V.21 preamble (HDLC flags, mostly 1s) |
| 3.5–4.9 s | 1,650/1,850 Hz alternating | DIS: the answering machine's capability list |
| 5.0–7.7 s | silence | waiting for the caller |
| 7.7–10.3 s | 1,650, then 1,650/1,850 Hz | no reply, so it repeats preamble + DIS |

## Phase C: message (the page itself)

- High-speed modem training preamble, then the T.4-coded page (`03-compression.md`). Each line ends with EOL; six EOLs in a row (RTC) mark the end of the page.
- On the line this sounds like steady **hiss**. Well-compressed data looks like random noise.
- **ECM** (Error Correction Mode, T.30 Annex A): the page is cut into numbered frames of 64 or 256 bytes. The receiver lists bad frames (PPR, partial page request) and only those are re-sent. Needed for MMR/JBIG/JPEG in Group 3.

## Phase D: post-message

- Caller: **MPS** (more pages, same settings), **EOM** (more pages, renegotiate) or **EOP** (that's all).
- Answerer: **MCF** (message received OK), or **RTP/RTN** (received, but retrain positive/negative).

## Phase E: release

- **DCN** (disconnect). Both hang up.

## Modems used by fax

| ITU standard | Year (approx.) | Modulation | Rates (bit/s) | Role in fax |
|---|---|---|---|---|
| V.21 ch. 2 | 1964 | FSK (1,650 / 1,850 Hz) | 300 | T.30 control messages |
| V.27ter | 1976 | DPSK | 2,400 / 4,800 | Early Group 3 page data |
| V.29 | 1976 | QAM | 7,200 / 9,600 | Classic Group 3 |
| V.17 | 1991 | Trellis-coded QAM | 7,200–14,400 | "14.4" fax |
| V.34 | 1994 for fax | Adaptive QAM | up to 33,600 | Super G3 (control channel at 1,200 bit/s instead of V.21) |

Checked against ITU-T T.30 (09/2005) and V.21 (11/1988):

- CNG and CED timings.
- V.21 channel 2: 1,650 Hz = 1, 1,850 Hz = 0, 300 bit/s.
- The 1 s flag preamble.
- TCF as 1.5 s of zeros.
- CFR and FTT.

The Fax article says V.21, V.27ter and V.29 predate 1980 and were in the original T.4/T.30, and that V.34 was added for fax in 1994. The other years in the table come from general knowledge.

## Fax over IP

VoIP codecs mangle modem tones, so **T.38** gateways demodulate the fax into its HDLC frames and page bits, send those as UDP packets with redundant copies, and re-modulate at the far end. Diagram: `../images/05-digital-signals/t38-fax-over-ip-gateway.png`.

## Sources

`../sources/wikipedia/`: `fax.md` ("Fax tone", "Related standards"), `t-38.md`, `fax-modem.md`, `modem.md`. Primary: ITU-T T.30, T.4, V.21, V.27ter, V.29, V.17, V.34 (free PDFs at itu.int); quoted passages in `../sources/web-research.md` §6.
