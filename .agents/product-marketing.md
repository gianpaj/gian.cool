# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-11-02

## Product Overview

**One-liner:** Gianfranco Palumbo (`gian.cool`) — personal engineering blog, AI benchmark analysis, and build logs on AI, Voice AI, coding agents, and robotics experiments from a software developer in Málaga, Spain.
**What it does:** `gian.cool` is Gianfranco's digital home for short, straight-to-the-point write-ups on building software with coding agents (Claude Code, Codex, T3 Code), Voice AI, LLM coding benchmarks, hardware/robotics tinkering, and products/open-source tools he ships (including HolaBrisa, SexyVoice.ai, AgentCaller.io, WakeBridge, and 3dvibegame.com).
**Product category:** Personal developer brand / AI, Voice AI & builder blog
**Product type:** Personal website, technical microblog, and launchpad for open-source tools & indie SaaS products
**Business model:** Free, open technical content and open-source repos that connect Gianfranco with peers, help learners navigate fast-moving AI tools, and create organic awareness for his commercial projects (HolaBrisa, SexyVoice.ai, AgentCaller.io).

## Target Audience

**Target companies:** Builders, startups, indie hackers, students/learners, and engineering teams exploring AI agents, Voice AI, and robotics.
**Decision-makers:** Software developers, Voice AI builders, robotics tinkerers, indie founders, and curious learners trying to keep up with fast-moving AI tooling.
**Primary use case:** Learning practical, tested ways to build things with AI/Voice AI/hardware in plain English, without wading through long-winded fluff or vendor hype.
**Jobs to be done:**

- Learn how an experienced developer actually uses coding agents, Voice AI, and edge hardware (like a Jetson Nano) so they can try it themselves.
- Compare coding LLMs fairly across accuracy, harness differences, and GGUF disk/VRAM size before picking a model.
- Meet, discuss, and exchange ideas around AI, Voice AI, and learning robotics.
  **Use cases:**
- Turning a spare PC + Jetson Nano/Raspberry Pi into a scale-to-zero dev box for mobile coding agents.
- Choosing between frontier coding models (Opus, Codex, GPT, Gemini) or local open-weight models (Qwen, Gemma) on Terminal-Bench 2.0.
- Building and testing Voice AI products (SexyVoice.ai, AgentCaller.io) and playful AI experiments (3dvibegame.com, robotics tinkering).

## Problems & Pain Points

**Core problem:** AI, Voice AI, and hardware/robotics move so fast that learners feel overwhelmed, while experienced builders have to dig through vendor marketing or long-winded threads to find peers doing real work.
**Why alternatives fall short:**

- Vendor benchmark posts show only their own angle or omit harness differences (`Terminus-2` vs. Codex harness).
- Many technical posts are overly academic or long-winded instead of getting straight to the point with simple words and working code.
- Generic AI influencers post shallow hype without sharing real numbers, scripts, or lessons that actually teach someone how to build.
  **What it costs them:** Feeling behind in a fast-moving field, wasting money on oversized cloud VMs or overhyped tools, and missing genuine peer conversations.
  **Emotional tension:** Overwhelm at the pace of AI change mixed with excitement to build, learn, and find like-minded builders.

## Competitive Landscape

**Direct:** Other AI-focused developer blogs & builders on X/LinkedIn — many fall short when they write long-winded essays or optimize for engagement bait instead of simple, teachable build notes.
**Secondary:** Official model release posts from OpenAI, Anthropic, Google, and Alibaba — useful primary data, but published in isolation without cross-provider normalization or size-efficiency plots.
**Indirect:** High-volume AI news channels and newsletters — broad summaries without hands-on code or peer discussion.

## Differentiation

**Key differentiators:**

- Simple wording and straight-to-the-point posts: quick to read, easy to copy and learn from.
- Combines production software engineering background (React, React Native, Next.js, TypeScript, Python, Go, Kotlin) with hands-on exploration in Voice AI (SexyVoice.ai, AgentCaller.io), coding agents, and edge/robotics hardware.
- Puts competing vendor numbers on the same chart/table and calls out measurement caveats plainly.
- Ships working open-source repos and scripts alongside the post so readers and learners can build on top of them.
  **How we do it differently:** Short, visual, plain-English posts backed by interactive charts, ASCII diagrams, real hardware photos, euro costs, and direct GitHub links.
  **Why that's better:** Anyone—from a student learning to code in the Claude Code era to a senior Voice AI engineer—can grasp the idea in 2 minutes and try it.
  **Why people follow Gianfranco:** Approachable builder energy: plain words, real receipts, open curiosity (especially where he's learning himself, like 3D games or robotics), and genuine desire to help others keep up.

## Objections

| Objection                                                                            | Response                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Should I still learn to code or build things myself if AI agents do it in seconds?" | Yes — managing coding agents is like supervising self-driving vehicles: you still need to understand how the engine, sensors, and code mechanics work, and AI lets one curious developer explore domains (Go, Kotlin, 3D, robotics) faster than ever. |
| "Why build a custom tool when an existing utility already does part of it?"          | Sometimes existing tools miss a key UX detail (like polling SSH until online), and building it with a coding agent is one of the fastest ways to learn a new stack.                                                                                   |
| "Are these benchmark numbers or power estimates apples-to-apples?"                   | Call out measurement limits upfront in simple terms (e.g., harness differences on Terminal-Bench, estimated wall wattage vs. GPU-only `nvidia-smi`).                                                                                                  |

**Anti-persona:** Non-technical "get rich quick with AI prompts" audiences looking for hustle clichés rather than building, learning, and discussing real tech.

## Switching Dynamics

**Push:** Tired of bloated, jargon-heavy posts, AI slop, and vendor-cherry-picked benchmarks on X and LinkedIn.
**Pull:** Short, plain-English posts with exact numbers, visual diagrams, and open-source code that inspire you to build something this weekend.
**Habit:** Passively doomscrolling AI news instead of building small experiments and talking with peers.
**Anxiety:** Feeling like AI is moving too fast to catch up, or worrying you lack background in a new domain (mobile, Voice AI, 3D, robotics).

## Customer Language

**How readers/learners describe the problem:**

- "AI is moving so fast—should I even learn how to code if Claude Code exists?"
- "Every AI benchmark chart only shows the vendor's best angle."
- "I want to tinker with local models, Voice AI, or hardware at home without paying €150+/month for cloud servers."
  **How readers describe Gianfranco's content:**
- "Short, straight to the point, with actual numbers and the GitHub repo."
- "Makes building across new stacks feel doable."
  **Words to use:** simple, build, learn, coding agents, Claude Code, Codex, Voice AI, robotics, Jetson Nano, open-weight, scale-to-zero, Tailscale, open source.
  **Words to avoid:** revolutionary, game-changing, unlock the power of, seamless, 10x ninja, hustle, delve, overly academic jargon when a plain word works.
  **Glossary:**
  | Term | Meaning | |------|---------|
  | Coding agents | CLI/web/IDE AI agents (Claude Code, Codex, T3 Code) that read repos, run commands, and ship features or fixes |
  | Voice AI | Speech, TTS, and phone-call agent systems (e.g., SexyVoice.ai, AgentCaller.io) |
  | Vibe-coded | Built rapidly by steering coding agents while applying engineering judgment for architecture and debugging |
  | Personal voice profile | See `.agents/voice/gianfranco.md` for Gianfranco's sentence-level writing habits |

## Brand Voice

| Attribute                      | Means                                                                                                                          | Doesn't mean                                                    | Example line                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simple & straight to the point | Plain everyday words, short explanations, get to the idea fast; rarely a long-winded story                                     | Curt, cold, or skipping the numbers/diagrams that make it clear | "The pitch is simple: let a user's AI agent call businesses, handle the conversation, and return a structured result the agent can act on."        |
| Concrete receipts              | Exact numbers, euro prices, wattages, model names, and benchmark percentages over adjectives                                   | Walls of academic prose without a clear takeaway                | "Paid €970 second hand in May 2026 on Wallapop in Seville."                                                                                        |
| Helpful & inspiring builder    | Encourages learners ("students") and peers to try unfamiliar stacks (3D, Android, Go, robotics) and shares the scripts openly  | Preachy guru talk or fake motivational quotes                   | "I've never done a game and neither a 3d game or even a multi-player game... I thought I'd give it a go with the help of Codex and similar tools." |
| Methodologically honest        | Combines vendor charts side-by-side and flags caveats (benchmark harnesses, unmeasured PSU losses); admits what he didn't know | Cynical or dismissive of AI progress                            | "When companies benchmark in isolation, you only see their angle. Putting the numbers side by side tells a different story."                       |
| Light, friendly humor          | Occasional `:D` or `:)` and real-life details (walking the dog, Málaga heat)                                                   | Forced memes, emoji bullet lists, or long dramatic buildup      | "Except for when Codex on the RTX machine decided to install all the Android SDK tooling to build on Ubuntu :D"                                    |

**Tone by context:**

- Blog build logs (`gian.cool`): Short, direct first-person ("I"); 1–2 sentence setup, diagram/screenshot/code right away, honest footnotes.
- Teaching & career posts (`gian.cool` & social): Clear metaphors (e.g., supervising self-driving trucks), reassuring and practical for people learning in a fast-moving AI world.
- Benchmark posts (`gian.cool`): Crisp, neutral, data-first; lead with the chart and table, followed by a plain-English "word of caution."
- Social (X & LinkedIn): Straight to the point, simple words, happy to use proven hook/structure tactics when they help reach more learners and spark discussions with AI, Voice AI, and robotics peers. Zero em dashes or AI contrast reveals.
- Product launches (HolaBrisa, SexyVoice.ai, AgentCaller.io): Plain problem framing, concrete everyday examples, honest about current stage.
  **Terms we own:** `gian.cool`, WakeBridge, AgentCaller, SexyVoice.ai, HolaBrisa.
  **Never use (and why):**
- Long-winded backstory before getting to the point (breaks Gianfranco's natural concise style).
- Complex jargon where a simple word works (keeps posts welcoming for students/learners and fast to read for peers).
- Em dashes (`—`) in social posts (instant AI-generated tell on X and LinkedIn).
- Contrast reveals like "It's not X, it's Y" or "Instead of X, I did Y" (reads like LLM copywriting).
- Emoji-led bullet lists (`🚀`, `✅`, `💡`) and generic engagement bait ("Thoughts?", "Agree?", "Let that sink in").

## Proof Points

**Metrics & shipped artifacts:**

- Commercial startups & Voice AI / AI products: [HolaBrisa](https://holabrisa.com), [SexyVoice.ai](https://sexyvoice.ai) (realistic TTS & AI voice generator), [AgentCaller.io](https://agentcaller.io) (phone execution layer for AI agents).
- Open-source projects on [GitHub (`@gianpaj`)](https://github.com/gianpaj): WakeBridge, 3dvibegame, AudioSlim, Ubuntu `autosuspend` scripts, interactive Terminal-Bench comparison charts.
  **Value themes:**
  | Theme | Proof | |-------|-------|
  | You can build across unfamiliar stacks fast (and still need real engineering fundamentals) | Web/React Native engineer shipping Go servers, Kotlin Android widgets, Rust tools, Voice AI apps, and Three.js multiplayer worlds with coding agents |
  | Independent benchmark clarity | Combined OpenAI, Anthropic, Google, and open-weight Terminal-Bench 2.0 results with GGUF size efficiency plots and harness caveats |
  | Pragmatic hardware & edge tinkering | Turned a €970 second-hand Ryzen/RTX PC + Jetson Nano into a ~5s-wake dev server and GitHub runner |

## Goals

**Business goal:**

1. **Connect with peers:** Meet and talk with thoughtful people online building in **AI**, **Voice AI**, and **robotics** (where Gianfranco is actively playing and learning).
2. **Teach & inspire learners:** Reach and help more "students" and builders make sense of fast-moving AI tools through clear, practical examples.
3. **Portfolio halo:** Maintain organic developer awareness around `gian.cool`, open-source repos, and commercial projects (HolaBrisa, SexyVoice.ai, AgentCaller.io).
   **Conversion action:** Reply/DM to discuss AI, Voice AI, or robotics; follow `@gianpaj` on X / LinkedIn; read `gian.cool` or clone/star a GitHub repo to try it themselves.
   **Current metrics:** Quality of replies/DMs and new peer connections, saves/bookmarks/DM-shares from learners, follower growth, and referral traffic to `gian.cool`.

## Learnings

_Decisions and tested lessons. Newest first. Keep it to about 20 active entries._

| Date       | Learning                                                                                                                                                                                                                 | Evidence                                      | Applies to                        | Status |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | --------------------------------- | ------ |
| 2026-11-02 | Keep wording simple and straight to the point (rarely long-winded stories), while adapting proven hook/distribution tactics when they help reach more learners and spark peer discussions in AI, Voice AI, and robotics. | User voice & goal review (v2)                 | social, copywriting, copy-editing | active |
| 2026-11-02 | Post as Gianfranco (individual software developer sharing first-hand build notes and numbers), never as a faceless brand voice.                                                                                          | User direction during WakeBridge social setup | social, copywriting, launch       | active |

## Changelog

_Newest first. One line per revision: what changed and why._

- v2 (2026-11-02) — Updated Goals, Target Audience, and Brand Voice to emphasize connecting with AI/Voice AI/robotics peers, inspiring and helping learners, and keeping wording simple and straight to the point without long-winded stories.
- v1 (2026-11-02) — Initial context auto-drafted from `gian.cool` codebase, `README.md`, and published blog posts, plus `.agents/voice/gianfranco.md`.
