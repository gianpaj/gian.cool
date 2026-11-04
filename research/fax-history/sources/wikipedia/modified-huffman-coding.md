# Modified Huffman coding

Source: https://en.wikipedia.org/wiki/Modified_Huffman_coding
Revision: 1327460217 (2025-12-14T12:39:54Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

Modified Huffman coding is used in fax machines to encode black-on-white images (bitmaps). It combines the variable-length codes of Huffman coding with the coding of repetitive data in run-length encoding.
The basic Huffman coding provides a way to compress files with much repeating data, like a file containing text, where the alphabet letters are the repeating objects. However, a single scan line contains only two kinds of elements –  white pixels and black pixels –  which can be represented directly as 0 and 1. This "alphabet" of only two symbols is too small to apply the Huffman coding directly. But if we first use run-length encoding, we can have more objects to encode. Here is an example taken from the article on run-length encoding:
A hypothetical scan line, with B representing a black pixel and W representing white, might read as follows:

WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW

With a run-length encoding (RLE) data compression algorithm applied to the above hypothetical scan line, it can be rendered as follows:

12W1B12W3B24W1B14W

Here we see that we have several different numbers in addition to the two items "white" and "black." These numbers provide plenty of additional items to use, so the Huffman coding can be directly applied to the sequence above to reduce the size even more.


== See also ==
Fax compression


== External links ==
"Modified Huffman coding from UNESCO". Archived from the original on 2002-06-28.
