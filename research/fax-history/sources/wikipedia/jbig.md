# JBIG

Source: https://en.wikipedia.org/wiki/JBIG
Revision: 1359725224 (2026-06-16T21:08:53Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

JBIG is an early lossless image compression standard from the Joint Bi-level Image Experts Group, standardized as ISO/IEC standard 11544 and as ITU-T recommendation T.82 in March 1993. It is widely implemented in fax machines. Now that the newer bi-level image compression standard JBIG2 has been released, JBIG is also known as JBIG1. JBIG was designed for compression of binary images, particularly for faxes, but can also be used on other images. In most situations JBIG offers between a 20% and 50% increase in compression efficiency over Fax Group 4 compression, and in some situations, it offers a 30-fold improvement.
JBIG is based on a form of arithmetic coding developed by IBM (known as the Q-coder) that also uses a relatively minor refinement developed by Mitsubishi, resulting in what became known as the QM-coder. It bases the probability estimates for each encoded bit on the values of the previous bits and the values in previous lines of the picture. JBIG also supports progressive transmission, which generally incurs a small overhead in bit rate (around 5%).


== Patents ==
Doubts about patent licence requirements for JBIG1 implementations by IBM, Mitsu­bishi and AT&T prevented the codec from being widely implemented in open-source software. For example, as of 2012, none of the commonly used web browsers supported it. Since 2012, there are now no more JBIG1 patents in force – the last ones to expire were Mitsubishi's patents in Canada and Australia (on 25 February 2011) and in the United States (on 4 April 2012).


== See also ==
ISO/IEC JTC 1/SC 29
JBIG2


== References ==


== External links ==
JBIG-KIT – a free C implementation of the JBIG encoder and decoder
ISO/IEC 11544
ITU-T Recommendations T.82, T.85
RFC 2879 – Content Feature Schema for Internet Fax (V2)
RFC 3949 – File Format for Internet Fax
