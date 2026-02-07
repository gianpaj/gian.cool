// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
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
