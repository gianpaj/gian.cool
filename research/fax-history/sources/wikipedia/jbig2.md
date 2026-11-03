# JBIG2

Source: https://en.wikipedia.org/wiki/JBIG2
Revision: 1349647123 (2026-04-18T08:10:42Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

JBIG2 is an image compression standard for bi-level images, developed by the Joint Bi-level Image Experts Group. It is suitable for both lossless and lossy compression.  According to a press release from the Group, in its lossless mode JBIG2 typically generates files 3–5 times smaller than Fax Group 4 and 2–4 times smaller than JBIG, the previous bi-level compression standard released by the Group. JBIG2 was published in 2000 as the international standard ITU T.88, and in 2001 as ISO/IEC 14492.


== Functionality ==
Ideally, a JBIG2 encoder will segment the input page into regions of text, regions of halftone images, and regions of other data. Regions that are neither text nor halftones are typically compressed using a context-dependent arithmetic coding algorithm called the MQ coder. Textual regions are compressed as follows: the foreground pixels in the regions are grouped into symbols. A dictionary of symbols is then created and encoded, typically also using context-dependent arithmetic coding, and the regions are encoded by describing which symbols appear where.  Typically, a symbol will correspond to a character of text, but this is not required by the compression method. For lossy compression the difference between similar symbols (e.g., slightly different impressions of the same letter) can be neglected; for lossless compression, this difference is taken into account by compressing one similar symbol using another as a template. Halftone images may be compressed by reconstructing the grayscale image used to generate the halftone and then sending this image together with a dictionary of halftone patterns.  Overall, the algorithm used by JBIG2 to compress text is very similar to the JB2 compression scheme used in the DjVu file format for coding binary images.
PDF files versions 1.4 and above may contain JBIG2-compressed data. Open-source decoders for JBIG2 are jbig2dec (AGPL), the java-based Apache PDFBox jbig2-imageio (Apache-2), the JavaScript-based jbig2.js (Apache-2), and the decoder by Glyph & Cog LLC found in Xpdf and Poppler (both GPL). An open-source encoder is jbig2enc (Apache-2).


== Technical details ==
Typically, a bi-level image consists mainly of a large amount of textual and halftone data, in which the same shapes appear repeatedly. The bi-level image is segmented into three regions: text, halftone, and generic regions. Each region is coded differently and the coding methodologies are described in the following passage.


=== Text image data ===
Text coding is based on the nature of human visual interpretation. A human observer cannot tell the difference between two instances of the same characters in a bi-level image even though they may not exactly match pixel by pixel. Therefore, only the bitmap of one representative character instance needs to be coded instead of coding the bitmaps of each occurrence of the same character individually. For each character instance, the coded instance of the character is then stored into a "symbol dictionary". There are two encoding methods for text image data: pattern matching and substitution (PM&S) and soft pattern matching (SPM).

Pattern matching and substitution (PM&S) is the more classic coding method. The encoder performs image segmentation to isolate character-sized chunks. For each individual chunk, the encoder looks for a match in the bitmap dictionary. If a match exists, we code an index of the corresponding representative bitmap in the dictionary and the position of the character on the page. The position is usually relative to another previously coded character. If a match is not found, the segmented pixel block is coded directly and added into the dictionary. Typical procedures of pattern matching and substitution algorithm are displayed in the left block diagram of the figure above. Although the method of PM&S can achieve outstanding compression, substitution errors could be made during the process if the image resolution is low.
JBIG2 improves on PM&S with optional soft pattern matching (SPM). The same segmentation and searching is performed, but for each found match, the encoder saves not only the corresponding dictionary entry, but also refinement data describing the difference between the actual chunk and the dictionary chunk. Doing so greatly reduces substitution errors. Since the dictionary match requires that the actual character and the dictionary character are highly similar, SPM only adds a tiny amount of data.


=== Halftones ===
Halftone images can be compressed using two methods. One of the methods is similar to the context-based arithmetic coding algorithm, which adaptively positions the template pixels in order to obtain correlations between the adjacent pixels. In the second method, descreening is performed on the halftone image so that the image is converted back to grayscale. The converted grayscale values are then used as indexes of fixed-sized tiny bitmap patterns contained in a halftone bitmap dictionary. This allows decoder to successfully render a halftone image by presenting indexed dictionary bitmap patterns neighboring with each other.


=== Entropy coding ===
All three region types including text, halftone, and generic regions may all use arithmetic coding or huffman coding. JBIG2 specifically uses the MQ coder, the same entropy encoder employed by JPEG 2000.


== Patents ==
Patents for JBIG2 are owned by IBM and Mitsubishi. Free licenses should be available after a request. JBIG and JBIG2 patents are not the same.


== Character substitution errors in scanned documents ==
Some implementations of JBIG2 using lossy compression can potentially alter the characters in documents that are scanned to PDF. Unlike some other algorithms where compression artifacts are obvious, such as blurring or mosquito noise, JBIG2's "pattern matching" matches up similar-looking symbols. If the matching is implemented poorly, especially in low-resolution scans where characters are less clearly defined, similar characters may get erroneously swapped. 
In 2013, various substitutions (e.g., replacing "6" with "8") were reported to happen on many Xerox Workcentre photocopier and printer machines. Numbers printed on scanned (but not OCR-ed) documents had potentially been altered. This has been demonstrated on construction blueprints and some tables of numbers; the potential impact of such substitution errors in documents such as medical prescriptions was briefly mentioned. German computer scientist David Kriesel and Xerox were investigating this.
Xerox subsequently acknowledged that this was a long-standing software defect, and their initial statements in suggesting that only non-factory settings could introduce the substitution were incorrect. No attempt was made to recall or mandate updates to the affected devices – which was acknowledged to affect more than a dozen product families. However, in August 2013 a software patch was made available, that when installed, automatically disabled pattern matching. Documents previously scanned continue to potentially contain errors making their veracity difficult to substantiate.
David Kriesel thought that "the error cause is not JBIG2 itself". However authorities in some countries made statements to prevent the use of JBIG2. In Germany the Federal Office for Information Security has issued a technical guideline that says the JBIG2 encoding "MUST NOT be used" for "replacement scanning".  In Switzerland the Coordination Office for the Permanent Archiving of Electronic Documents (Koordinationsstelle für die dauerhafte Archivierung elektronischer Unterlagen) has recommended against the use of JBIG2 when creating PDF documents. In its transfer guidance tables, US NARA states it “will not accept digitized records in PDF that have been saved with lossy compression (e.g., JPEG, JBIG2)”, and even lists “JBIG1 or JBIG2” among terms indicating prohibited outputs. Their “acceptable codecs” lists for PDF/A omit JBIG2 entirely (they permit ZIP and lossless JPEG2000).


== Exploit ==
A vulnerability in the Xpdf implementation of JBIG2, re-used in Apple's iOS phone operating software, was used by the Pegasus spyware to implement a zero-click attack on iPhones by constructing an emulated computer architecture inside a JBIG2 stream. Apple fixed this "FORCEDENTRY" vulnerability in iOS 14.8 in September 2021.


== See also ==
JBIG


== References ==


== External links ==
T.88: Lossy/lossless coding of bi-level images
