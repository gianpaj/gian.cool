import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { remarkExcerpt } from "./remark-excerpt.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://gian.cool",
  integrations: [
    mdx({
      remarkPlugins: [remarkExcerpt],
    }),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkExcerpt],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
