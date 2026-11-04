# Harry Nyquist

Source: https://en.wikipedia.org/wiki/Harry_Nyquist
Revision: 1383337322 (2026-11-02T04:51:24Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

Harry Theodor Nyquist (, Swedish: [ˈnŷːkvɪst]; February 7, 1889 – April 4, 1976) was a Swedish-American physicist and electronic engineer who made important contributions to communication theory and  feedback control systems.


== Early life and education ==
Harry Theodor Nykvist was born on 7 February 1889 in the village of Nilsby, in the Stora Kil parish, Värmland, Sweden. He was the fourth of eight children born to Lars Jonsson Nyqvist (1847–1930) and Catarina (or Katrina) Eriksdotter (1857–1920). He immigrated to the United States in 1907. At Southern Minnesota Normal College he met Antonia Wachlin. They later married and had four children. Nyquist lived in Pharr, Texas after his retirement, and died in Harlingen, Texas on April 4, 1976.
He entered the University of North Dakota in 1912 and received B.S. and M.S. degrees in electrical engineering in 1914 and 1915, respectively. He received a Ph.D. in physics at Yale University in 1917.


== Career ==
After receiving his doctorate, Nyquist joined AT&T in 1917. He worked in its transmission research organization, studying telegraph, picture, and voice transmission. In 1934 he moved to Bell Telephone Laboratories, where his work broadened from transmission engineering to communications systems. He later served as Assistant Director of Systems Studies.
During his time at the Bell system he received 138 patents and published twelve technical papers.
Nyquist formally retired in 1954 but continued for several years as a part-time consultant on communications problems for the Bell System and federal agencies.


== Technical contributions ==
Nyquist's work at the Bell System addressed practical problems in telegraphy, long-distance telephony, carrier telephony, facsimile, and television. Growing demand for communications required more efficient use of wire circuits and the available bandwidth. Stable repeaters, accurate carrier generation, and control of noise and distortion were required. His work on those problems led to advances in communication theory, the understanding of thermal noise, feedback stability, and phase and frequency control.


=== Telegraph transmission and communication theory ===
Growth in telegraph traffic required the Bell System to carry more messages over existing lines, and those lines were also needed for telephone service. Increasing the signaling rate made pulses smear into adjacent time intervals, while sharp pulses occupied a wide frequency range and interfered with other circuits. The problem was therefore not simply how fast a telegraph key could operate, but how much information could be carried through a limited frequency band.
Wozencraft and Jacobs placed the beginnings of communication theory in Nyquist’s 1924 publication, where he showed that the number of independently resolvable pulses that could be transmitted through a band-limited channel was proportional to the product of that bandwidth and of transmission time. They described Ralph Hartley’s 1928 work as extending this result by considering the accuracy with which received signal levels could be distinguished.
In “Certain Factors Affecting Telegraph Speed” (1924), Nyquist examined both the shape of the transmitted signal and the choice of the code. He showed that rectangular pulses and half-cycle sine waves were (generally) not the most efficient waveforms, and that shaping pulses before transmission increased signaling speed and limited interference with other signals. He compared binary with multilevel codes, showing that the information conveyed increased logarithmically with the number of available signal values. Noise and distortion limited how many levels could be distinguished reliably.
Nyquist also worked on making telegraph performance measurable in working telegraph systems. With R. B. Shanck and S. I. Cory, he developed methods for separating distortion into bias, characteristic distortion caused by the transmission path, and random or “fortuitous” distortion. Their paper described instruments and test signals that could be used to measure the lengthening and shortening of marks and spaces and to identify likely faults in lines, repeaters, batteries, and relays.
Nyquist analyzed the underlying theory in the paper “Certain Topics in Telegraph Transmission Theory” (1928). He established that an ideal channel of bandwidth B could transmit up to 2 B independent signal elements per second. Pulses were not constrained to remain separate or to retain their original shape: they could overlap, provided that the contributions from neighboring pulses were zero at the instants when each signal was sampled. This became the basis of the Nyquist ISI criterion and of later pulse-shaping methods. Nyquist further analyzed transmit shaping and equalization, multilevel signaling in the presence of interference, coherent transmission using in-phase and quadrature carriers, and the bandwidth advantages and limitations of single-sideband and vestigial-sideband transmission.
The 2 B result concerned the rate at which independent elements could be transmitted through the channel. In his 1948 introduction to information theory, Claude Shannon cited Nyquist’s 1924 and 1928 papers, together with work by Ralph Hartley, as important foundations for a general theory of communication.


=== Long-distance transmission and frequency control ===
As communication traffic grew, the Bell System needed to carry more circuits over each individual line. Demand also increased for longer distances without loss of quality. Carrier telephony and carrier telegraphy did this by shifting each conversation or telegraph channel to a different frequency band, and then sending the bands together over the same wires. That solved the capacity problem, but created others. The signal loss on the line varied with frequency and temperature. Repeaters were needed to amplify traffic in both directions, and do so without oscillating. As the distortion accumulated on the line, the contribution of each section of line needed to be small.
Nyquist worked on several parts of this problem. His patents from the 1920s covered an automatic gain regulator in which a motor and relays changed an artificial-line attenuator as line loss varied, a bidirectional repeater intended to cope with unequal lines and reflections, and lattice networks for correcting phase-delay distortion. These were practical parts of keeping signal level, timing, and waveform under control over a long route.
Carrier systems also had to reproduce their carrier frequencies accurately at distant terminals. In a single-sideband system, the carrier was suppressed at the transmitting end and generated again at the receiver. Any error in the locally generated carrier shifted the recovered speech or telegraph signal. As more channels were packed into the system, the allowable frequency error became smaller.


==== Phase-locked loop frequency control ====
In a patent application filed in 1923, Nyquist compared a standard controlling frequency with the output of a motor-driven generator. A balanced vacuum-tube modulator produced a control current determined by the phase difference between them. That current changed the magnetic drag on the generator shaft, adjusting its speed. A separate coarse-frequency mechanism first brought the generator close enough for the phase-control loop to take over. In modern block-diagram terms, the patent shows a reference, phase detector, control path, controlled generator, and feedback- all the elements of a phase-locked loop.
Histories of the phase-locked loop usually begin instead with Henri de Bellescize’s 1932 paper on synchronous radio reception. His circuit, like Nyquist’s, combined electronic and electromechanical control. Nyquist returned to the same problem in a 1931 patent application for synchronizing radio transmitters, using a phase-sensitive system to lock a higher-frequency oscillator to a lower-frequency reference.
A related phase-locking arrangement was used in the Bell System Type L coaxial carrier system. A reference received from the transmitting terminal and a quadrature signal derived from the local oscillator drove the two windings of a synchronous motor. Through a reduction gearbox, the motor adjusted a variable capacitor in the tuned circuit of a crystal oscillator. The gearbox integrated the phase error and retained its position if the reference was interrupted, providing frequency holdover.


=== Thermal noise ===
John Bertrand Johnson and Nyquist had known each other since their student days at the University of North Dakota and later became colleagues in the Bell System. In 1928, Johnson measured random voltage fluctuations in resistances and showed that they increased with temperature and resistance. Johnson later recalled that, after discussions with Nyquist, Nyquist developed the formula explaining the effect within “a month or so”.
Nyquist's theoretical explanation appeared immediately after Johnson's paper in the same issue of Physical Review. Using the thermodynamics of a transmission line, he derived the relationship between noise, absolute temperature, resistance, and bandwidth. The effect, now known as Johnson–Nyquist noise, established a fundamental noise floor for amplifiers, receivers, and electrical measuring systems rather than a defect that could be removed through better components or construction.


=== Feedback and stability ===
Carrier telephony depended on chains of repeater amplifiers. As more channels were placed on a circuit and routes became longer, small amounts of distortion and gain variation in each vacuum-tube amplifier accumulated from one repeater to the next. Harold Stephen Black, another Bell Laboratories engineer, spent much of the 1920s looking for a way to make amplifiers sufficiently linear. In 1927, he conceived the negative-feedback amplifier. The attendant reduction in gain produced a much larger reduction in distortion and made the amplifier less sensitive to changes in its components and operating conditions, such as temperature and voltage.
Negative feedback introduced a different problem. The gain and phase shift of an amplifier and its feedback path changed with frequency. At some frequency, a signal intended to oppose the input could instead reinforce it, causing the amplifier to oscillate. Black built and field-tested working amplifiers, but wider use of large amounts of feedback required a mathematical analysis to determine whether a proposed circuit would remain stable.
Nyquist addressed this problem in his 1932 paper “Regeneration Theory”. He represented the gain and phase around the feedback loop as a curve in the complex plane and showed how the curve indicated whether the closed-loop system would be stable. The result became known as the Nyquist stability criterion. Black used Nyquist's analysis in his 1934 presentation of the theory and measured performance of stabilized feedback amplifiers. Black supplied the amplifier principle; Nyquist supplied a general test that allowed engineers to apply it reliably.


=== Facsimile and television transmission ===
AT&T also wanted to use telephone lines to carry pictures. Herbert E. Ives led its early work on telephotography, which was publicly demonstrated in 1924 and offered commercially the following year. Picture transmission was less tolerant of faults than ordinary speech. A change in line loss that was heard only as a modest change in volume could appear as bands of incorrect shading in a photograph, while unequal delay at different frequencies blurred edges and fine detail. Nyquist worked on both problems. A picture-transmission patent filed with Alva B. Clark and Danforth K. Gannett described nonlinear conversion of picture brightness into line current, reducing the visible effect of variations in line attenuation. It also included phase equalization to prevent blurring caused by different frequency components arriving at different times.
In 1930, Nyquist and S. Brand described methods for measuring group delay, using the derivative of phase shift with frequency, which they called envelope delay. They applied the measurements to actual telephone circuits and noted that lines adequate for speech could require phase correction for telephotography, broadcast programs, and especially television. Nyquist later patented a television receiver that used feedback to correct the nonlinear response of its light source and amplifier as the required image bandwidth increased.
Nyquist later returned to a problem he had first studied in telegraphy: how much of a modulated signal could be removed without losing useful information. In 1940, he and K. W. Pfleger compared picture transmission using one and two sidebands. With the same overall bandwidth, the single-sideband system carried finer picture detail. Its quadrature component made the detected electrical waveform appear badly distorted, but the photographs were affected much less than the waveform suggested. They also found that maintaining a small transmitted current for the darkest parts of the picture reduced the visible error.


== Awards and legacy ==
Nyquist received the IRE Medal of Honor in 1960 for his contributions to the understanding of thermal noise, data transmission, and negative feedback. The same year, the Franklin Institute awarded him the Stuart Ballantine Medal for his theoretical and practical work in communications. He received the National Academy of Engineering Founders Award in 1969 and shared the 1975 Rufus Oldenburger Medal with Hendrik Wade Bode.
Nyquist was also remembered for encouraging the work of other Bell Laboratories researchers. In ''The Idea Factory'', Jon Gertner reported that Bell patent lawyers found that many of the laboratory's most productive inventors regularly ate with Nyquist. One colleague recalled that “he drew people out, got them thinking”. In Sweden, his contributions to telecommunications have been highlighted alongside those of inventor Lars Magnus Ericsson. Nyquist was profiled on a Sveriges Radio P1 program called "Ett bortglömt geni" (transl. A forgotten genius).


=== Terms named for Harry Nyquist ===
Nyquist rate: sampling rate twice the bandwidth of the signal's waveform being sampled; sampling at a rate that is equal to, or faster, than this rate ensures that the waveform can be reconstructed accurately.
Nyquist frequency: half the sample rate of a system; signal frequencies below this value are unambiguously represented.
Nyquist filter
Nyquist plot
Nyquist ISI criterion
Nyquist (programming language)
Nyquist stability criterion


== References ==


== External links ==
 Media related to Harry Nyquist at Wikimedia Commons
IEEE Global History Network page about Nyquist
Nyquist criterion page with photo of Nyquist with John R. Pierce and Rudy Kompfner
K.J.Astrom: Nyquist and his seminal papers, 2005 presentation
Nyquist biography, p. 2 Archived 2013-12-28 at the Wayback Machine
