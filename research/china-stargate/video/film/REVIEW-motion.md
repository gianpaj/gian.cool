# Galaxy motion review

The [motion draft](exports/galaxy-motion-draft-2026-11-09.mp4) runs 3:43 at
960 × 540 and 30 fps. Its custom sequences replace the capacity, engineering
and energy chapters. The 203.32-second narration is reused. Captions follow
the hidden setting in the local Studio working copy, and the opening-photo
crop is preserved.

The capacity sequence builds the reported delivered phase, explains MW through
a power-to-rack diagram, then builds household, stadium and AI-centre comparisons.
The conversion sequence reveals AC input, transformer and DC bus in order.
Its 100 kW example computes current while voltage changes, then shows the
conductor-heating ratio at fixed resistance and further conversion in the rack.

The energy sequence adds storage and power equipment to a continuous network.
A cursor follows changing wind output. Battery state integrates the illustrative
surplus and shortfall until the example storage is exhausted. Inputs assume
lossless storage with no separate power limit. Normalized time, generation and
energy introduce no Galaxy operating measurements. Exact assumptions live in
[diagram inputs](../../data/diagram-inputs.json).

HyperFrames runtime, layout, motion, contrast and audio checks pass with zero
errors. All 45 sampled contrast checks pass. Retained warnings cover four dense
chapter timelines, one generic GSAP proxy baseline warning across separate model
objects, and five reading holds in the map, hardware inserts and reporting cards.

Staged frames and chapter boundaries were inspected. A direct seek to 140 seconds
matches a backward seek there from 165.8 seconds pixel for pixel. Eighteen frames
were decoded from the final MP4, including the changing current values, charging,
discharge, storage exhaustion and credits. Representative decoded frames were
visually inspected.

The H.264/AAC file contains 6,690 frames and exactly 223 seconds of audio and video.
It is 8,757,707 bytes. Audio measures −14.2 LUFS integrated and −1.0 dBTP. Signal
checks cover the exported audio. User listening and visual validation remain
pending. One software screenshot worker rendered the file in 275.3 seconds.
Hashes and measurements are in [verification-motion.json](verification-motion.json).

Source templates live in `sequences/`. The chapter builder inserts speech anchors
through `scripts/motion_sequences.py`. The retained 7 and 8 November exports have
their own verification records. This handoff is a low-resolution review draft.
