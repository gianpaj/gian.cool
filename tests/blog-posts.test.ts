import { describe, expect, it } from 'vitest';

import type { CollectionEntry } from 'astro:content';
import { BLOG_PAGE_SIZE, getPublishedPosts } from '../src/utils/blog-posts';

function post(
  id: string,
  pubDate: string,
  draft = false,
): CollectionEntry<'blog'> {
  return {
    id,
    collection: 'blog',
    data: {
      title: id,
      description: id,
      slug: id,
      pubDate: new Date(pubDate),
      draft,
      tags: [],
    },
  };
}

describe('blog listing', () => {
  it('uses six posts per page', () => {
    expect(BLOG_PAGE_SIZE).toBe(6);
  });

  it('excludes drafts and sorts published posts newest first', () => {
    const posts = [
      post('oldest', '2026-01-01'),
      post('draft', '2026-04-01', true),
      post('newest', '2026-03-01'),
      post('middle', '2026-02-01'),
    ];

    expect(getPublishedPosts(posts).map(({ id }) => id)).toEqual([
      'newest',
      'middle',
      'oldest',
    ]);
    expect(posts.map(({ id }) => id)).toEqual([
      'oldest',
      'draft',
      'newest',
      'middle',
    ]);
  });

  it('keeps every published post across page boundaries', () => {
    const posts = Array.from({ length: 14 }, (_, index) =>
      post(`post-${index}`, `2026-01-${String(index + 1).padStart(2, '0')}`),
    );
    posts.splice(5, 0, post('draft', '2026-02-01', true));
    const published = getPublishedPosts(posts);
    const pages = Array.from(
      { length: Math.ceil(published.length / BLOG_PAGE_SIZE) },
      (_, index) =>
        published.slice(index * BLOG_PAGE_SIZE, (index + 1) * BLOG_PAGE_SIZE),
    );

    expect(pages.map((page) => page.length)).toEqual([6, 6, 2]);
    expect(pages.flat().map(({ id }) => id)).toEqual(
      posts
        .filter(({ data }) => !data.draft)
        .reverse()
        .map(({ id }) => id),
    );
  });

  it('handles empty and draft-only collections', () => {
    expect(getPublishedPosts([])).toEqual([]);
    expect(getPublishedPosts([post('draft', '2026-01-01', true)])).toEqual([]);
  });
});
