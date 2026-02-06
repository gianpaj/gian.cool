# Project

**gian.cool** — Gianfranco's personal blog, a statically generated site.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5 with MDX support
- **Styling**: Tailwind CSS v4 with `@tailwindcss/typography`
- **Components**: React 19 (used for interactive islands, e.g. `TerminalBenchChart.tsx`)
- **Testing**: Vitest
- **Runtime**: Node.js 24 (managed via `.tool-versions`)
- **Package Manager**: pnpm

## Structure

- `src/pages/index.astro` — Homepage listing blog posts with excerpts
- `src/pages/[...path].astro` — Dynamic blog post pages
- `src/data/blog/` — Blog content in Markdown/MDX
- `src/layouts/Layout.astro` — Base layout with dark/light theme toggle
- `src/components/` — Astro and React components
- `remark-excerpt.mjs` / `rehype-excerpt-wrapper.mjs` — Custom remark/rehype plugins for excerpt handling

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests (watch mode) |
| `pnpm test:run` | Run tests once |

## Git

- **Main branch**: `master`
- Blog posts use date-based URL paths (e.g. `/2025/01/hello-world`)

# Skills

They are in `.agents/skills/` folder .e.g `.agents/skills/agent-browser/`

- `/agent-browser` - Browser automation for navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, and testing web apps
- `/find-skills` - Discover and install agent skills
- `/frontend-design` - Create production-grade frontend interfaces with high design quality
- `/code-review` - Code review a pull request
