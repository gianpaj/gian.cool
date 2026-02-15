import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Gianfranco Palumbo (@gianpaj)

Software developer obsessed with AI—LLMs, TTS, agents, bots, and the intersection of creativity and automation. Building tools and exploring the frontier where code meets intelligence.

## Navigation

- [Blog](/blog)
- [Projects](/projects)
- [About](/about)

## Links

- GitHub: [@gianpaj](https://github.com/gianpaj)
- Twitter: [@gianpaj](https://twitter.com/gianpaj)
- Email: gianpa.spain@gmail.com

---

*This is the markdown-only version of gian.cool. Visit [gian.cool](https://gian.cool) for the full experience.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
