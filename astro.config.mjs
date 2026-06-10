import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from "astro/config";

import { remarkExcerpt } from "./remark-excerpt.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://gian.cool",
  integrations: [
    mdx({
      processor: unified({ remarkPlugins: [remarkExcerpt] }),
    }),
    react(),
  ],
  markdown: {
    processor: unified({
     remarkPlugins: [remarkExcerpt],
    })
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
