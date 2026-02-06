import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    draft: z.boolean().default(false),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
