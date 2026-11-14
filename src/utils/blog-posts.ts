import type { CollectionEntry } from 'astro:content';

export const BLOG_PAGE_SIZE = 6;

export function getPublishedPosts(
  posts: CollectionEntry<'blog'>[],
): CollectionEntry<'blog'>[] {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
