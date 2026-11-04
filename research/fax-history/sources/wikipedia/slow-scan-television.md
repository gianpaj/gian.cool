# Slow-scan television

Source: https://en.wikipedia.org/wiki/Slow-scan_television
Revision: 1383150106 (2026-11-01T06:25:59Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

Slow-scan television (SSTV) is a picture transmission method, used mainly by amateur radio operators, to transmit and receive static pictures via radio in monochrome or color.
A literal term for SSTV is narrowband television. Analog broadcast television requires at least 6 MHz wide channels, because it transmits 25 or 30 picture frames per second (see ITU analog broadcast standards), but SSTV usually only takes up to a maximum of 3 kHz of bandwidth. It is a much slower method of still picture transmission, usually taking from about eight seconds to a couple of minutes, depending on the mode used, to transmit one image frame.
Since SSTV systems operate on voice frequencies, amateurs use it on shortwave (also known as HF by amateur radio operators), VHF and UHF radio.


== History ==


=== Concept ===
The concept of SSTV was introduced by Copthorne Macdonald in 1957–58. He developed the first SSTV system using an electrostatic monitor and a vidicon tube. It was deemed sufficient to use 120 lines and about 120 pixels per line to transmit a black-and-white still picture within a 3 kHz telephone channel. First live tests were performed on the 11-meter ham band –  which was later given to the CB service in the US. In the 1970s, two forms of paper printout receivers were invented by hams.


=== Early usage in space exploration ===

SSTV was used to transmit images of the far side of the Moon from Luna 3.
The first space television system was called Seliger-Tral-D and was used aboard Vostok. Vostok was based on an earlier videophone project which used two cameras, with persistent LI-23 iconoscope tubes. Its output was 10 frames per second at 100 lines per frame video signal.

The Seliger system was tested during the 1960 launches of the Vostok capsule, including Sputnik 5, containing the space dogs Belka and Strelka, whose images are often mistaken for the dog Laika, and the 1961 flight of Yuri Gagarin, the first man in space on Vostok 1.
Vostok 2 and thereafter used an improved 400-line television system referred to as Topaz.
A second generation system (Krechet, incorporating docking views, overlay of docking data, etc.) was introduced after 1975.
A similar concept, also named SSTV, was used on Faith 7, as well as on the early years of the NASA Apollo program.

The Faith 7 camera transmitted one frame every two seconds, with a resolution of 320 lines.

The Apollo TV cameras used SSTV to transmit images from inside Apollo 7, Apollo 8, and Apollo 9, as well as the Apollo 11 Lunar Module television from the Moon. NASA had taken all the original tapes and erased them for use on subsequent missions; however, the Apollo 11 Tape Search and Restoration Team formed in 2003 tracked down the highest-quality films among the converted recordings of the first broadcast, pieced together the best parts, then contracted a specialist film restoration company to enhance the degraded black-and-white film and convert it into digital format for archival records. 

The SSTV system used in NASA's early Apollo missions transferred 10 frames per second with a resolution of 320 frame lines in order to use less bandwidth than a normal TV transmission.
The early SSTV systems used by NASA differ significantly from the SSTV systems currently in use by amateur radio enthusiasts today.


=== Progression ===
Commercial systems started appearing in the United States in 1970, after the FCC had legalized the use of SSTV for advanced level amateur radio operators in 1968.
SSTV originally required quite a bit of specialized equipment. Usually there was a scanner or camera, a modem to create and receive the characteristic audio howl, and a cathode-ray tube from a surplus radar set. The special cathode-ray tube would have "long persistence" phosphors that would keep a picture visible for about ten seconds.
The modem would generate audio tones between 1,200 and 2,300 Hz from picture signals, and picture signals from received audio tones. The audio would be attached to a radio receiver and transmitter.


== Current systems ==
A modern system, having gained ground since the early 1990s, uses a personal computer and special software in place of much of the custom equipment. The sound card of a PC, with special processing software, acts as a modem. The computer screen provides the output. A small digital camera or digital photos provides the input.


=== Modulation ===
Like the similar radiofax mode, SSTV is an analog signal. SSTV uses frequency modulation, in which every different value of brightness in the image gets a different audio frequency. In other words, the signal frequency shifts up or down to designate brighter or darker pixels, respectively. Color is achieved by sending the brightness of each color component (usually red, green and blue) separately. This signal can be fed into an SSB transmitter, which in part modulates the carrier signal.
There are a number of different modes of transmission, but the most common ones are Martin M1 (popular in Europe) and Scottie S1 (used mostly in the USA). Using one of these, an image transfer takes 114 (M1) or 110 (S1) seconds. Some black and white modes take only 8 seconds to transfer an image.


=== Header ===
A calibration header is sent before the image. It consists of a 300-millisecond leader tone at 1,900 Hz, a 10 ms break at 1,200 Hz, another 300-millisecond leader tone at 1,900 Hz, followed by a digital VIS (vertical interval signaling) code, identifying the transmission mode used. The VIS consists of bits of 30 milliseconds in length. The code starts with a start bit at 1,200 Hz, followed by 7 data bits (LSB first; 1,100 Hz for 1, 1,300 Hz for 0). An even parity bit follows, then a stop bit at 1,200 Hz. For example, the bits corresponding the decimal numbers 44 or 32 imply that the mode is Martin M1, whereas the number 60 represents Scottie S1.


=== Scanlines ===

A transmission consists of horizontal lines, scanned from left to right. The color components are sent separately one line after another. The color encoding and order of transmission can vary between modes. Most modes use an RGB color model; some modes are black-and-white, with only one channel being sent; other modes use a YC color model, which consists of luminance (Y) and chrominance (R–Y and B–Y). The modulating frequency changes between 1,500 and 2,300 Hz, corresponding to the intensity (brightness) of the color component. The modulation is analog, so even though the horizontal resolution is often defined as 256 or 320 pixels, they can be sampled using any rate. The image aspect ratio is conventionally 4:3. Lines usually end in a 1,200 Hz horizontal synchronization pulse of 5 milliseconds (after all color components of the line have been sent); in some modes, the synchronization pulse lies in the middle of the line.


=== Modes ===
Below is a table of some of the most common SSTV modes and their differences. These modes share many properties, such as synchronization and/or frequencies and grey/color level correspondence. Their main difference is the image quality, which is proportional to the time taken to transfer the image and in the case of the AVT modes, related to synchronous data transmission methods and noise resistance conferred by the use of interlace.

The mode family called AVT (for Amiga Video Transceiver) was originally designed by Ben Blish-Williams (N4EJI, then AA7AS) for a custom modem attached to an Amiga computer, which was eventually marketed by AEA corporation.
The Scottie and Martin modes were originally implemented as ROM enhancements for the Robot Research Corporation SSTV unit. The exact line timings for the Martin M1 mode are given in this reference.
The Robot SSTV modes were designed by Robot Research Corporation for their own SSTV units.
All four sets of SSTV modes are now available in various PC-resident SSTV systems and no longer depend upon the original hardware.


==== AVT ====
AVT is an abbreviation of "Amiga Video Transceiver", software and hardware modem originally developed by "Black Belt Systems" (USA) around 1990 for the Amiga home computer popular all over the world before the IBM PC family gained sufficient audio quality with the help of special sound cards.  These AVT modes differ radically from the other modes mentioned above, in that they are synchronous, that is, they have no per-line horizontal synchronization pulse but instead use the standard VIS vertical signal to identify the mode, followed by a frame-leading digital pulse train which pre-aligns the frame timing by counting first one way and then the other, allowing the pulse train to be locked in time at any single point out of 32 where it can be resolved or demodulated successfully, after which they send the actual image data, in a fully synchronous and typically interlaced mode.
Interlace, no dependence upon sync, and interline reconstruction gives the AVT modes a better noise resistance than any of the other SSTV modes. Full frame images can be  reconstructed with reduced resolution even if as much as 1/2 of the received signal was lost in a solid block of interference or fade because of the interlace feature. For instance, first the odd lines are sent, then the even lines. If a block of odd lines are lost, the even lines remain, and a reasonable reconstruction of the odd lines can be created by a simple vertical interpolation, resulting in a full frame of lines where the even lines are unaffected, the good odd lines are present, and the bad odd lines have been replaced with an interpolation. This is a significant visual improvement over losing a non-recoverable contiguous block of lines in a non-interlaced transmission mode. Interlace is an optional mode variation, however without it, much of the noise resistance is sacrificed, although the synchronous character of the transmission ensures that intermittent signal loss does not cause loss of the entire image. 
The AVT modes are mainly used in Japan and the United States. There is a full set of them in terms of black and white, color, and scan line counts of 128 and 256. Color bars and grayscale bars may be optionally overlaid top and/or bottom, but the full frame is available for image data unless the operator chooses otherwise. For receiving systems where timing was not aligned with the incoming image's timing, the AVT system provided for post-receive re-timing and alignment.


==== Other modes ====


=== Frequencies ===
Using a receiver capable of demodulating single-sideband modulation, SSTV transmissions can be heard on the following frequencies:


== Media ==


== In popular culture ==
In Valve's 2007 video game Portal, there was an internet update of the program files on 3 March 2010. This update gave a challenge to find hidden radios in each test chamber and bring them to certain spots to receive hidden signals. The hidden signals became part of an ARG-style analysis by fans of the game hinting at a sequel of the game –  some sounds were of Morse code strings that implied the restarting of a computer system, while others could be decoded as purposefully low-quality SSTV images. When some of these decoded images were put together in the correct order, it revealed a decodable MD5 hash for a bulletin-board system phone number (425)822-5251. It provides multiple ASCII art images relating to the game and its potential sequel. The sequel, Portal 2, was later confirmed. According to a hidden commentary node SSTV image from Portal 2, the BBS is running from a Linux-based computer and is linked to a 2,400 bit/s modem from 1987. It is hooked up in an unspecified Valve developer's kitchen. They kept spare modems in case one failed, and one did. The BBS only sends about 20 megabytes of data in total.
In the aforementioned sequel, Portal 2, there are four SSTV images. One is broadcast in a Rattman den. When decoded, this image is a very subtle hint towards the game's ending. The image is of a Weighted Companion Cube on the Moon. The other three images are decoded from a commentary node in another Rattman den. These 3 images are slides with bullet points on how the ARG was done, and what the outcome was, such as how long it took the combined internet to solve the puzzle (the average completion time was 71⁄2 hours).
In another video game, Kerbal Space Program, there is a small hill in the southern hemisphere on the planet "Duna", which transmits a color SSTV image in Robot 24 format. It depicts four astronauts standing next to what is either the Lunar Lander from the Apollo missions, or an unfinished pyramid. Above them is the game's logo and three circles. It emits sound if an object is near the hill.
Caparezza, an Italian songwriter, inserted an image on the ghost track of his album Prisoner 709.
The Aphex Twin release 2 Remixes by AFX contains a track that displays an SSTV image that has text about the programs used to make the release as well as a picture of Richard sitting on a couch.
The survival horror video game Signalis contains multiple SSTV radio transmissions which, when decoded, can be used to find hidden keys and unlock a secret ending.


== See also ==
Amateur television
Hellschreiber
Narrow-bandwidth television
Radiofax
Radioteletype
Shortwave
SSTV repeater
Videotelephony


== References ==


=== Notes ===


== External links ==
World Ham/11mtr SSTV cams - https://worldsstv.com/
eng075 - UK Norfolk 11 mtr sstv stration, live sstv signal reports
G0HWC sstv info - https://www.dxzone.com/dx16792/g0hwc-s-sstv-site.html

SSTV from the International Space Station lists images received from the International Space Station via SSTV
Image Communication on Short Waves – an online free ham radio handbook for SSTV, WEFAX and digital SSTV
Modem software:

MMSSTV for Microsoft Windows
Ham Radio Deluxe for Microsoft Windows
RX-SSTV Archived 2015-02-07 at the Wayback Machine for Microsoft Windows
QSSTV for Linux
MultiMode Cocoa for Mac OS X
MultiScan for Mac OS X
Robot36 for Android (operating system)(only decoding)
SSTV Encoder for Android (operating system) (only encoding)
SSTV Encoder/Decoder for iPhone/iPad
