# China Stargate video research

Class: research. Lifecycle: implemented. The research collection and first local video cut are complete; the video is unpublished.

Deliverables live in `research/china-stargate/`. Scope covers research, original explanatory notes, image downloads and video production. The fax reference and unrelated blog edits remain untouched.

The narrative follows electricity from wind generation to AI racks, with a worked current calculation. This preserves the fax reference's emphasis on explaining a physical mechanism.

The canonical SemiAnalysis newsletter page exposes a substantial public preview. Paid implementation sections were not accessed. The collection keeps bibliographic metadata and original notes instead of a full article copy.

Capacity values retain their source, date, boundary and delivery status. The 800 MW plan and 120 MW delivered phase differ from Epoch AI modelling and Envision's 3 GW announcement. A single reconciled value would hide an unresolved source conflict.

Six licensed images cover geography, wind, racks, chips and cooling. Three copyrighted facility/article references are stored separately and require permission. Generic hardware photos cannot establish Galaxy's installed equipment.

All nine image files passed decoding and hash checks and were visually inspected. Commons originals were rate limited; 1920-pixel versions supplied usable assets. Cooling specifications, measured loads, chip inventory and actual renewable share remain reporting gaps.

The installed unslop skill was found in the Claude synced skill directory and read. Work uses the existing `docs/china-stargate-research` feature branch. Blog publication, outreach and delegation remain outside scope.

Lei Zhang is a research and interview subject for the energy-to-computing strategy. The profile separates his stated desert-AI ambitions from Galaxy operating evidence. The interview brief records Envision's published PR route and unsent request copy; no outreach has been sent.

The editorial plan is `plans/2026-11-07-china-stargate-video.md`, with a structured draft at `research/china-stargate/video/story_script.json`. Its six-second editing units follow the requested video-story-generator skill; production timings follow the measured narration. The user's three to four minute duration overrides the skill's shorter presets.

The story follows Envision's energy-to-computing strategy, with Lei Zhang introducing the human decision and an electrical example explaining the mechanism. A full founder biography would crowd the explanation; a cost-led comparison lacks accessible supporting detail. A real interview can replace twelve seconds of narration, while the baseline works without it. The user authorized video generation and logical commits on 2026-11-07. No interview is assumed to exist.

The locator map uses public-domain Natural Earth geometry and sourced city reference points. It shows about 300 km from Ulanqab to Beijing and about 125 km to Hohhot as calculated straight-line distances, with no Galaxy campus pin. Map provenance and the alternative Hohhot reference-point distance are recorded in `research/china-stargate/images/maps/CREDITS.md`. Segment 6 uses the original locator and a matching location line.

Final speech preparation is a separate production step after narration approval. The plan's `Separate TTS preparation` section is canonical for vocal bursts, non-speech human sounds and pause cues, with sustained delivery in `speech_metadata.style`. The structured story links to that guidance; its factual narration remains free of performance tags. Google's linked documentation was checked on 2026-11-07. Audio preparation and generation are tracked in the production files.

HyperFrames production lives in `research/china-stargate/video/film/`, pinned to CLI 0.9.20. Local Chrome, FFmpeg and FFprobe are available. The optional Kokoro and MusicGen checks do not gate this Gemini-narrated local render. Only licensed images and original explanatory graphics enter the composition.

The requested generated video is the output, so the CLI skill permits proceeding from inspected snapshots to a render without an extra preview approval. Publishing is a separate action. Generated media and disposable rendering state stay out of Git; source, speech prompts, credits and verification records are committed in logical chunks.

Gemini 3.8 Flash TTS with Charon generated one 186.44-second take. Performance follows the Gemini TTS skill and companion guide; a local adapter uses the current Interactions API because the installed helper uses preview-model request fields. Three breaths and seven short pauses are vocal cues, not captions. Local Whisper transcription matches the approved script apart from spelling, proper-name recognition and token splits; critical dates, quantities and qualifiers match. Measured timing produces a 206-second cut with 18 seconds of credits.

The seven HyperFrames chapters share local fonts and a pinned GSAP 3.13.0 build. A single caption composition contains 90 speech-aligned groups. The quiet music bed is Chris Zabriskie’s Cylinder Eight, with CC BY 4.0 confirmed on the composer’s site and the downloaded Commons file verified by hash. No fabricated site ambience is added.

Delivery is `research/china-stargate/video/film/exports/galaxy-explained.mp4`: 206 seconds, 1920 × 1080, 30 fps, H.264/AAC, 17,367,276 bytes. Generated audio and exports stay local outside Git. The film’s README, CREDITS, REVIEW and verification JSON are the production handoff.

Runtime, layout, motion, contrast, craft and audio checks pass. Six chapter-density warnings are retained because each chapter keeps its related shots together. Review covered beat, phone and seam sheets, full-size scene frames and decoded MP4 frames. Seven sampled decoded frames match authoring snapshots at SSIM 0.9921–0.9988. Sound measures -14.4 LUFS integrated, -1 dBTP and zero clipping. It was measured and transcribed, not heard; a human listening pass remains useful.

SVG blade rotation uses local transform attributes to preserve the turbine hub under seeking. Storage is a branch of the conceptual power path, avoiding an implication that all supply passes through the battery. The film’s map derivative removes non-renderable empty geometry paths and enlarges city labels. The CLI rendered through one software screenshot worker after its BeginFrame path fell back; the verified output is complete.
