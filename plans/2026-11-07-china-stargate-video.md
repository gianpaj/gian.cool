# Why a wind-turbine maker is building an AI campus

Status: approved for video production on 2026-11-07. Research date: 2026-11-07.

## Story and audience

Target a 3:36 educational news video for a curious general audience. This assumes viewers know AI runs on computers but do not know data-centre power engineering.

The question is why Envision, a company founded around wind turbines, is developing Galaxy in Ulanqab. Lei Zhang supplies the human thread. Following electricity into the rack supplies the explanation.

The news comes from SemiAnalysis's site visit, its report of a delivered first phase, and the live 800 V DC pilot also described by Envision. Keep these claims attributed and dated. The broader inference is that energy equipment and computing infrastructure are becoming connected business decisions.

Viewers should leave understanding how power reaches an AI rack, why wind needs balancing, and why planned capacity does not establish operating computing output.

## Opening and ending

Opening: "Why is a wind-turbine maker building an AI data centre? In Inner Mongolia, Envision is connecting those businesses through an AI campus called Galaxy. Follow the electricity to understand why an energy company wants to build it."

Ending: "The next test is how much useful computing this energy system can deliver."

## Timed story

| Time | Purpose | Picture and information |
|---|---|---|
| 0:00 to 0:18 | Ask the question | Regional wind photo becomes a simple turbine-to-rack diagram. Name Galaxy and Envision. Label the photo's region and 2012 date. |
| 0:18 to 0:48 | Introduce the builder and place | Introduce Zhang briefly, then locate Ulanqab about 300 km northwest of Beijing in Inner Mongolia. Attribute the September visit to SemiAnalysis. Explain that OpenAI's US Stargate is the comparison and Galaxy is Envision's separate project. |
| 0:48 to 1:18 | Establish what the scale means | Reported 120 MW first phase, delivered in August 2026, versus an 800 MW IT campus plan. Define IT capacity in plain language. Keep delivered and planned portions visually distinct. |
| 1:18 to 2:00 | Explain the engineering | Show an illustrative accelerator and rack, then the reported 5 MW pilot. Trace AC through the solid-state transformer to the 800 V DC bus and rack converters. Use one equal-power DC example to explain current and conductor heating. |
| 2:00 to 2:42 | Explain the energy business | Return to Envision's turbines, batteries and power equipment. Show wind varying against a steady example load and a battery shifting energy. Distinguish annual renewable share from reliable hourly supply. |
| 2:42 to 3:12 | Identify the testable questions | Delivered capacity does not measure actual load or confirm chip inventory. The larger capacity announcements need their scope clarified. Ask what Zhang and the site engineers can substantiate. |
| 3:12 to 3:36 | Close and credit | Return to the opening power path and deliver the ending line. Hold three credit/source cards for six seconds each, from 3:18 to 3:36. |

## Narration and rhythm

The [structured draft](../research/china-stargate/video/story_script.json) contains 419 narration words across 33 narrated shots, followed by three credit shots. At 140 words per minute, speech occupies about 180 seconds within the 198-second story section. The remainder gives numbers and diagrams time to land. This is a calculated allowance, not a measured voice recording.

The full timeline has 36 six-second units. Narration should flow naturally across cuts; the units are editing cues, not a requirement to restart every sentence or introduce a new image every six seconds. A diagram can persist across several units.

Use one electrical example. At equal 100 kW DC power, 400 V requires 250 A and 800 V requires 125 A. Hold the example across the explanation. These are illustrative values, not Galaxy measurements. Keep conductor resistance fixed when discussing heating; do not imply that total system losses fall by the same ratio.

## Separate TTS preparation

Prepare the final speech for TTS after the narration is approved, before generating audio. Keep the editorial narration in `story_script.json` as the factual source; prepare a separate performance transcript during this step.

Use the [Gemini TTS skill](/home/gianpaj/.agents/skills/gemini-tts/SKILL.md) at `~/.agents/skills/gemini-tts` together with its companion [Prompting Guide](/home/gianpaj/.agents/skills/gemini-tts/references/prompting-guide.md), "Advanced prompt engineering for style, emotion, and accent." Read both before preparing the performance transcript and generating narration.

1. Assemble the approved narration into connected passages. Retain shot references outside the spoken text. Check pronunciation of names and spoken forms of numbers and units.
2. Add vocal bursts, breaths and pause cues where they improve delivery. Choose their placement by reading the speech aloud, rather than adding a cue at every six-second shot boundary.
3. Put sustained delivery instructions in `speech_metadata.style`. Suggested direction: "Calm, curious documentary narration; clear articulation and measured pace." Select and record the voice and model during the audio step.
4. Review the performance transcript against the approved narration, then generate and listen to the audio in that separate step. Check that cues sound natural, are not spoken literally, and do not change the meaning or attribution of claims.
5. Measure the generated duration, including vocal sounds and pauses, and adjust visual holds or cue placement to fit the 3 to 4 minute target. Cue names do not promise an exact duration. Keep control tags out of narration word counts and display captions.

### Vocal bursts and non-speech sounds

Follow [Google's speech-generation guide](https://aistudio.google.com/docs/speech-generation.md), especially its "Vocal bursts and non-speech sounds" and "Style field versus inline tags" sections. The documentation was checked on 2026-11-07 for Gemini 3.8 TTS; recheck syntax if the model changes.

Use the companion Prompting Guide for performance design. Its examples target preview-model conventions; confirm request fields and tag syntax against Google's documentation for the selected model before running the skill's generator.

Use English angle-bracket tags at the point of the sound. The guide documents `<breath>`, `<exhales>`, `<sigh>`, `<chuckle>` and other human vocalizations, plus `<short pause>` and `<long pause>`. For this educational news narration, favour light breaths and short pauses at thought transitions or before dense figures. Stronger reactions are deliberate editorial choices, not automatic additions.

Illustrative performance copy, to review during the TTS step:

```text
Why is a wind-turbine maker building an AI data centre? <short pause>
<breath> In Inner Mongolia, Envision is connecting those businesses through an AI campus called Galaxy.
```

The guide separates inline human vocal events from non-vocal effects. Wind, machinery, music and diagram sounds belong in the effects or music tracks. Keep factual captions free of performance tags and preserve the qualifiers around reported, planned and unverified quantities.

## Lei Zhang and an optional interview

Zhang is the strategy source. The baseline draft works with a name card and narration. A cleared real portrait can replace the name card's empty image area without changing timing.

Reserve 2:00 to 2:12 for a possible recorded answer replacing segments 21 and 22. Ask: "What made you decide to build the computing facilities that consume your energy?" Choose an excerpt after recording and checking its meaning. No answer or interview is assumed to exist.

Use the [interview brief](../research/china-stargate/notes/interview-lei-zhang.md) for the factual follow-ups. The site engineers are needed for technical measurements. Zhang's account of the strategy does not independently verify capacity, efficiency or renewable share.

## Visual continuity and sound

Use documentary photos and original explanatory graphics in 16:9. Keep photo colours natural. Graphics use a light background, dark labels and one amber electrical-flow line. This is the production visual direction.

The recurring schematic has a three-bladed turbine, the same left-to-right power line and a rectangular rack with five horizontal slots. Retain their positions as storage and conversion blocks appear. Keep this a conceptual diagram, not an invented Galaxy floor plan.

The baseline uses four collected assets: `ulanqab-wind-2012`, `ulanqab-locator-png`, `server-racks` and `h100-board`. Generic hardware must remain labelled illustrative. Source watermarks stay visible. The photograph of the H100 does not establish that Galaxy uses that chip.

The existing permission-needed facility images are optional replacements after clearance. A portrait and external speech footage also need their reuse status checked. Do not fabricate a site visit, interview, personal likeness or documentary interior.

Use a steady narrator, with any instrumental music quiet enough to leave the technical explanation clear. Sound effects on original diagrams can mark changes in flow. Do not present invented equipment sounds as on-site recordings.

## Evidence and production readiness

The narration uses the [source register](../research/china-stargate/sources/README.md), [founder sources](../research/china-stargate/sources/lei-zhang.md) and [claim checks](../research/china-stargate/notes/evidence.md). Full attribution belongs in the video's accompanying credits as well as the short on-screen cards.

Keep the detailed cost comparison and disputed site cooling design in the companion research unless further reporting resolves them. The video covers heat removal as a general requirement. It makes no claim that Galaxy is fully renewable, entirely off-grid, fully built out or hosting a confirmed number of chips.

Before recording, recheck dated site claims, read the script aloud and review the original electrical graphics. Obtain rights for any substituted campus or founder material. The public-preview access boundary remains explicit in the accompanying sources.

## Use of the requested skill

Apply the script-generation and visual-continuity steps from `~/github/gianpaj/skills/video-story-generator/SKILL.md`. The requested 3 to 4 minute length takes precedence over its 24/48/72-second presets. Its six-second unit gives a 216-second draft.

The structured file preserves `analysis`, `story_script`, subject consistency and shot descriptions, and adds narration, timings, asset IDs and source IDs for documentary review. Existing imagery is the mixed-mode input; factual descriptions and research guide its use.

Production uses `hyperframes-cli` for the editable composition, checks and MP4 rendering. Gemini speech preparation remains a separate production step. The user authorized video generation and logical commits on 2026-11-07; publishing and interview outreach remain outside scope.
