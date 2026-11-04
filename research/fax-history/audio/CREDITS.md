# Audio credits (web research pass)

The three files below were added by the web research pass. All come from Wikimedia Commons; licenses were read from each file page on 2026-11-03.

The other six files in this folder came from the Commons sweep and are credited in [../CREDITS.md](../CREDITS.md). One of them, `dial-up-modem-handshake.ogg`, is tagged public domain on Commons, but its Commons credit line points to a YouTube upload. Check its provenance before using it.

| File | Source page | Author | Date | License | Caption |
|---|---|---|---|---|---|
| `2016-ansam-2100hz-answer-tone.wav` | https://commons.wikimedia.org/wiki/File:ANSam.wav | IAMGOOMBA | 2016-06-29 | CC0 1.0 | ITU-T 2100 Hz answer tone (ANSam), which V.8-capable fax machines and modems send in place of plain CED. 5.4 s. |
| `2005-v92-fax-modem-56k-handshake.wav` | https://commons.wikimedia.org/wiki/File:V.92_-_ElCom_HSP_PCI_Fax_modem_56k.wav | EditUZB | 2005-04-07 | CC BY-SA 4.0 | Connection sound of an ElCom HSP PCI V.92 56k fax modem. 21 s. |
| `2005-v34-dialup-modem-21600-handshake.wav` | https://commons.wikimedia.org/wiki/File:Dial-up_call,_speed_21600.wav | EditUZB | 2005-02-03 | CC BY-SA 4.0 | V.34 dial-up modem connection that settled at 21,600 bit/s. 27 s. Useful as the data-modem cousin of the fax handshake. |

## What the fax answering recording contains

`fax-answering-tones.ogg` (Commons: File:Faxhellorp.ogg, credited in ../CREDITS.md) was decoded with a 0.25 s FFT. Each segment lines up with ITU-T T.30 and V.21:

| Time | Dominant frequency | Meaning |
|---|---|---|
| 0.0–2.5 s | 2100 Hz steady | CED answer tone (T.30 §4.1.1: 2100 ± 15 Hz for 2.6–4.0 s; the clip starts mid-tone) |
| 2.5–3.5 s | about 1650 Hz | V.21 channel 2 preamble: HDLC flags (01111110, mostly binary 1 = 1650 Hz) for about 1 s |
| 3.5–4.9 s | alternating 1650/1850 Hz | 300 bit/s FSK frames, the answering machine's capability list (CSI/DIS) |
| 5.0–7.7 s | silence | waiting for the caller's reply |
| 7.7–10.3 s | 1650, then 1650/1850 Hz | no reply came, so it repeats the preamble and DIS |

Analysis script: `/tmp/fax-web-scripts/tones.py`, which lives outside the repository.
