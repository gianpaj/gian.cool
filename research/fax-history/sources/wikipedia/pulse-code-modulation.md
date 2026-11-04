# Pulse-code modulation

Source: https://en.wikipedia.org/wiki/Pulse-code_modulation
Revision: 1378024045 (2026-10-02T14:15:35Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

Pulse-code modulation (PCM) is a method used to digitally represent analog signals. It is the standard form of digital audio in computers, compact discs, digital telephony and other digital audio applications. In a PCM stream, the amplitude of the analog signal is sampled at uniform intervals, and each sample is quantized to the nearest value within a range of digital steps. Claude Shannon, Bernard Oliver, and John Pierce were inducted into the National Inventors Hall of Fame for their PCM patent granted in 1952.
Linear pulse-code modulation (LPCM) is a specific type of PCM in which the quantization levels are linearly uniform. This is in contrast to PCM encodings in which quantization levels vary as a function of amplitude (as with the A-law algorithm or the μ-law algorithm). Though PCM is a more general term, it is often used to describe data encoded as LPCM.
A PCM stream has two basic properties that determine the stream's fidelity to the original analog signal: the sampling rate, which is the number of times per second that samples are taken; and the bit depth, which determines the number of possible digital values that can be used to represent each sample.


== History ==
Early electrical communications started to sample signals in order to multiplex samples from multiple telegraphy sources and to convey them over a single telegraph cable. The American inventor Moses G. Farmer conceived telegraph time-division multiplexing (TDM) as early as 1853. Electrical engineer W. M. Miner, in 1903, used an electro-mechanical commutator for time-division multiplexing multiple telegraph signals; he also applied this technology to telephony. He obtained intelligible speech from channels sampled at a rate above 3500–4300 Hz; lower rates proved unsatisfactory.
In 1920, the Bartlane cable picture transmission system used telegraph signaling of characters punched in paper tape to send samples of images quantized to 5 levels. In 1926, Paul M. Rainey of Western Electric patented a facsimile machine that transmitted its signal using 5-bit PCM, encoded by an opto-mechanical analog-to-digital converter. The machine did not go into production.
British engineer Alec Reeves, unaware of previous work, conceived the use of PCM for voice communication in 1937 while working for International Telephone and Telegraph in France. He described the theory and its advantages, but no practical application resulted. Reeves filed for a French patent in 1938, and his US patent was granted in 1943. By this time Reeves had started working at the Telecommunications Research Establishment.
The first transmission of speech by digital techniques, the SIGSALY encryption equipment, conveyed high-level Allied communications during World War II. In 1949, for the Canadian Navy's DATAR system, Ferranti Canada built a working PCM radio system that was able to transmit digitized radar data over long distances.
PCM in the late 1940s and early 1950s used a cathode-ray coding tube with a plate electrode having encoding perforations. As in an oscilloscope, the beam was swept horizontally at the sample rate while the vertical deflection was controlled by the input analog signal, causing the beam to pass through higher or lower portions of the perforated plate. The plate collected or passed the beam, producing current variations in binary code, one bit at a time. Rather than natural binary, the grid of Goodall's later tube was perforated to produce a glitch-free Gray code and produced all bits simultaneously by using a fan beam instead of a scanning beam.
In the United States, the National Inventors Hall of Fame has honored Bernard M. Oliver
and Claude Shannon
as the inventors of PCM,
as described in "Communication System Employing Pulse Code Modulation", U.S. patent 2,801,281 filed in 1946 and 1952, granted in 1956. Another patent by the same title was filed by John R. Pierce in 1945, and issued in 1948: U.S. patent 2,437,707. The three of them published "The Philosophy of PCM" in 1948.
The T-carrier system, introduced in 1961, uses two twisted-pair transmission lines to carry 24 PCM telephone calls sampled at 8 kHz and 8-bit resolution. This development improved capacity and call quality compared to the previous frequency-division multiplexing schemes.
In 1973, adaptive differential pulse-code modulation (ADPCM) was developed, by P. Cummiskey, Nikil Jayant and James L. Flanagan.


=== Digital audio recordings ===

In 1967, the first PCM recorder was developed by NHK's research facilities in Japan. The 30 kHz 12-bit device used a compander (similar to DBX Noise Reduction) to extend the dynamic range, and stored the signals on a video tape recorder. In 1969, NHK expanded the system's capabilities to 2-channel stereo and 32 kHz 13-bit resolution. In January 1971, using NHK's PCM recording system, engineers at Denon recorded the first commercial digital recordings.
In 1972, Denon unveiled the first 8-channel digital recorder, the DN-023R, which used a 4-head open reel broadcast video tape recorder to record in 47.25 kHz, 13-bit PCM audio. In 1977, Denon developed the portable PCM recording system, the DN-034R. Like the DN-023R, it recorded 8 channels at 47.25 kHz, but it used 14-bits "with emphasis, making it equivalent to 15.5 bits."
In 1979, the first digital pop album, Bop till You Drop, was recorded. It was recorded in 50 kHz, 16-bit linear PCM using a 3M digital tape recorder.
The compact disc (CD) brought PCM to consumer audio applications with its introduction in 1982. The CD uses a 44,100 Hz sampling frequency and 16-bit resolution and stores up to 80 minutes of stereo audio per disc.


=== Digital telephony ===

The rapid development and wide adoption of PCM digital telephony was enabled by metal–oxide–semiconductor (MOS) switched capacitor (SC) circuit technology, developed in the early 1970s. This led to the development of PCM codec-filter chips in the late 1970s. The silicon-gate CMOS (complementary MOS) PCM codec-filter chip, developed by David A. Hodges and W.C. Black in 1980, has since been the industry standard for digital telephony. By the 1990s, telecommunication networks such as the public switched telephone network (PSTN) had been largely digitized with very-large-scale integration (VLSI) CMOS PCM codec-filters, widely used in electronic switching systems for telephone exchanges, user-end modems and a wide range of digital transmission applications such as the integrated services digital network (ISDN), cordless telephones and cell phones.


== Implementations ==
PCM is the method of encoding typically used for uncompressed digital audio.

The 4ESS switch introduced time-division switching into the US telephone system in 1976, based on medium scale integrated circuit technology.
LPCM is used for the lossless encoding of audio data in the compact disc Red Book standard (informally also known as Audio CD), introduced in 1982.
AES3 (specified in 1985, upon which S/PDIF is based) is a particular format using LPCM.
LaserDiscs with digital sound have an LPCM track on the digital channel.
On PCs, PCM and LPCM often refer to the format used in WAV (defined in 1991) and AIFF audio container formats (defined in 1988). LPCM data may also be stored in other formats such as AU, raw audio format (header-less file) and various multimedia container formats.
LPCM has been defined as a part of the DVD (since 1995) and Blu-ray (since 2006) standards. It is also defined as a part of various digital video and audio storage formats (e.g. DV since 1995, AVCHD since 2006).
LPCM is used by HDMI (defined in 2002), a single-cable digital audio/video connector interface for transmitting uncompressed digital data.
RF64 container format (defined in 2007) uses LPCM and also allows non-PCM bitstream storage: various compression formats contained in the RF64 file as data bursts (Dolby E, Dolby AC3, DTS, MPEG-1/MPEG-2 Audio) can be "disguised" as PCM linear.


== Modulation ==

In the diagram, a sine wave (red curve) is sampled and quantized for PCM. The sine wave is sampled at regular intervals, shown as vertical lines. For each sample, one of the available values (on the y-axis) is chosen. The PCM process is commonly implemented on a single integrated circuit called an analog-to-digital converter (ADC). This produces a fully discrete representation of the input signal (blue points) that can be easily encoded as digital data for storage or manipulation. Several PCM streams could also be multiplexed into a larger aggregate data stream, generally for transmission of multiple streams over a single physical link. One technique is called time-division multiplexing (TDM) and is widely used, notably in the modern public telephone system.


== Demodulation ==
The electronics involved in producing an accurate analog signal from the discrete data are similar to those used for generating the digital signal. These devices are digital-to-analog converters (DACs). They produce a voltage or current (depending on type) that represents the value presented on their digital inputs. This output would then generally be filtered and amplified for use.
To recover the original signal from the sampled data, a demodulator can apply the procedure of modulation in reverse. After each sampling period, the demodulator reads the next value and transitions the output signal to the new value.  As a result of these transitions, the signal retains a significant amount of high-frequency energy due to imaging effects. To remove these undesirable frequencies, the demodulator passes the signal through a reconstruction filter that suppresses energy outside the expected frequency range (greater than the Nyquist frequency 
  
    
      
        
          f
          
            s
          
        
        
          /
        
        2
      
    
    {\displaystyle f_{s}/2}
  
).


== Standard sampling precision and rates ==
Common sample depths for LPCM are 8, 16, 20 or 24 bits per sample.
LPCM encodes a single sound channel. Support for multichannel audio depends on file format and relies on synchronization of multiple LPCM streams. While two channels (stereo) is the most common format, systems can support up to 8 audio channels (7.1 surround) or more.
Common sampling frequencies are 48 kHz as used with DVD format videos, or 44.1 kHz as used in CDs. Sampling frequencies of 96 kHz or 192 kHz can be used on some equipment, but the benefits have been debated.


== Limitations ==
The Nyquist–Shannon sampling theorem shows PCM devices can operate without introducing distortions within their designed frequency bands if they provide a sampling frequency at least twice that of the highest frequency contained in the input signal. For example, in telephony, the usable voice frequency band ranges from approximately 300 to 3400 Hz. For effective reconstruction of the voice signal, telephony applications therefore typically use an 8000 Hz sampling frequency, which is more than twice the highest usable voice frequency.
Regardless, there are potential sources of impairment implicit in any PCM system:

Choosing a discrete value that is near but not exactly at the analog signal level for each sample leads to quantization error. When dithering is used to compensate for this, it introduces additional noise.
Between samples, no measurement of the signal is made; the sampling theorem guarantees non-ambiguous representation and recovery of the signal only if it has no energy at frequency fs/2 or higher (one half the sampling frequency, known as the Nyquist frequency); higher frequencies will not be correctly represented or recovered and add aliasing distortion to the signal below the Nyquist frequency.
As samples are dependent on time, an accurate clock is required for accurate reproduction. If either the encoding or decoding clock is not stable, these imperfections will directly affect the output quality of the device.


== Processing and coding ==
Some forms of PCM combine signal processing with coding. Older versions of these systems applied the processing in the analog domain as part of the analog-to-digital process; newer implementations do so in the digital domain. These simple techniques have been largely rendered obsolete by modern transform-based audio compression techniques, such as modified discrete cosine transform (MDCT) coding.

Linear PCM (LPCM) is PCM with linear quantization.
Differential PCM (DPCM) encodes the PCM values as differences between the current and the predicted value. An algorithm predicts the next sample based on the previous samples, and the encoder stores only the difference between this prediction and the actual value. If the prediction is reasonable, fewer bits can be used to represent the same information. For audio, this type of encoding reduces the number of bits required per sample by about 25% compared to PCM.
Adaptive differential pulse-code modulation (ADPCM) is a variant of DPCM that varies the size of the quantization step to allow further reduction of the required bandwidth for a given signal-to-noise ratio.
Delta modulation is a form of DPCM that uses one bit per sample to indicate whether the signal is increasing or decreasing compared to the previous sample.
In telephony, a standard audio signal for a single phone call is encoded as 8,000 samples per second, of 8 bits each, giving a 64 kbit/s digital signal known as DS0. The default signal compression encoding on a DS0 is either μ-law (mu-law) PCM (North America and Japan) or A-law PCM (Europe and most of the rest of the world). These are logarithmic compression systems where a 12- or 13-bit linear PCM sample number is mapped into an 8-bit value. This system is described by international standard G.711.
Where circuit costs are high and loss of voice quality is acceptable, it sometimes makes sense to compress the voice signal even further. An ADPCM algorithm is used to map a series of 8-bit μ-law or A-law PCM samples into a series of 4-bit ADPCM samples. In this way, the capacity of the line is doubled. The technique is detailed in the G.726 standard.
Audio coding formats and audio codecs have been developed to achieve further compression. Some of these techniques have been standardized and patented. Advanced compression techniques, such as modified discrete cosine transform (MDCT) and linear predictive coding (LPC), are now widely used in mobile phones, voice over IP (VoIP) and streaming media.


== Encoding for serial transmission ==

PCM can be either return-to-zero (RZ) or non-return-to-zero (NRZ). For an NRZ system to be synchronized using in-band information, there must not be long sequences of identical symbols, such as ones or zeroes. For binary PCM systems, the density of 1-symbols is called ones-density.
Ones-density is often controlled using precoding techniques such as run-length limited encoding, where the PCM code is expanded into a slightly longer code with a guaranteed bound on ones-density before modulation into the channel. In other cases, extra framing bits are added into the stream, which guarantees at least occasional symbol transitions.
Another technique used to control ones-density is the use of a scrambler on the data, which will tend to turn the data stream into a stream that looks pseudo-random, but where the data can be recovered exactly by a complementary descrambler. In this case, long runs of zeroes or ones are still possible on the output but are considered unlikely enough to allow reliable synchronization.
In other cases, the long-term DC value of the modulated signal is important, as building up a DC bias will tend to move communications circuits out of their operating range. In this case, special measures are taken to keep a count of the cumulative DC bias and to modify the codes if necessary to make the DC bias always tend back to zero.
Many of these codes are bipolar codes, where the pulses can be positive, negative or absent. In the typical alternate mark inversion code, non-zero pulses alternate between being positive and negative. These rules may be violated to generate special symbols used for framing or other special purposes.


== Nomenclature ==
The word pulse in the term pulse-code modulation refers to the pulses to be found in the transmission line. This perhaps is a natural consequence of this technique having evolved alongside two analog methods, pulse-width modulation and pulse-position modulation, in which the information to be encoded is represented by discrete signal pulses of varying width or position, respectively. In this respect, PCM bears little resemblance to these other forms of signal encoding, except that all can be used in time-division multiplexing, and the numbers of the PCM codes are represented as electrical pulses.


== See also ==
Beta encoder
Equivalent pulse code modulation noise
Signal-to-quantization-noise ratio (SQNR), one method of measuring quantization error


== Explanatory notes ==


== References ==


== Further reading ==
Franklin S. Cooper; Ignatius Mattingly (1969). "Computer-controlled PCM system for investigation of dichotic speech perception". Journal of the Acoustical Society of America. 46 (1A): 115. Bibcode:1969ASAJ...46..115C. doi:10.1121/1.1972688.
Ken C. Pohlmann (1985). Principles of Digital Audio (2nd ed.). Carmel, Indiana: Sams/Prentice-Hall Computer Publishing. ISBN 978-0-672-22634-2.
D. H. Whalen, E. R. Wiley, Philip E. Rubin, and Franklin S. Cooper (1990). "The Haskins Laboratories pulse code modulation (PCM) system". Behavior Research Methods, Instruments, and Computers. 22 (6): 550–559. doi:10.3758/BF03204440.{{cite journal}}:  CS1 maint: multiple names: authors list (link)
Bill Waggener (1995). Pulse Code Modulation Techniques (1st ed.). New York, NY: Van Nostrand Reinhold. ISBN 978-0-442-01436-0.
Bill Waggener (1999). Pulse Code Modulation Systems Design (1st ed.). Boston, MA: Artech House. ISBN 978-0-89006-776-5.


== External links ==

PCM description on MultimediaWiki
Ralph Miller and Bob Badgley invented multi-level PCM independently in their work at Bell Labs on SIGSALY: U.S. patent 3,912,868 filed in 1943: N-ary Pulse Code Modulation.
Information about PCM: A description of PCM with links to information about subtypes of this format (for example linear pulse-code modulation), and references to their specifications.
Summary of LPCM – Contains links to information about implementations and their specifications.
How to control internal/external hardware using Microsoft's Media Control Interface – Contains information about, and specifications for the implementation of LPCM used in WAV files.
RFC 4856 – Media Type Registration of Payload Formats in the RTP Profile for Audio and Video Conferences – audio/L8 and audio/L16 (March 2007)
RFC 3190 – RTP Payload Format for 12-bit DAT Audio and 20- and 24-bit Linear Sampled Audio (January 2002)
RFC 3551 – RTP Profile for Audio and Video Conferences with Minimal Control – L8 and L16 (July 2003)
