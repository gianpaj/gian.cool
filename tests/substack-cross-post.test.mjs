import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  readLedger,
  saveLedger,
  withLock,
} from '../.agents/skills/cross-post-substack/scripts/cross-post.mjs';
import { prepare } from '../.agents/skills/cross-post-substack/scripts/prepare.mjs';
import {
  normalizeDoc,
  syncPost,
} from '../.agents/skills/cross-post-substack/scripts/workflow.mjs';

const article = (body) => `---
title: A useful article
description: A useful description
slug: useful-article
pubDate: 2026-11-02
tags: [audio, coding_agent]
---
${body}`;
const source = 'src/data/blog/useful-article.mdx';
const copy = (value) => structuredClone(value);
const plainText = (node) =>
  node.text || (node.content || []).map(plainText).join('');

async function fixture() {
  const prepared = await prepare(
    article(
      'Introduction.\n\n{/* more */}\n\n## Details\n\nThe complete article.',
    ),
  );
  const ledger = { version: 1, publication: 'gianpaj', entries: {} };
  const posts = [];
  const calls = [];
  let fail;
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: The fake service implements each transport operation in one test fixture.
  const remote = (operation, payload = {}) => {
    calls.push({ operation, payload: copy(payload) });
    const post = posts.find((p) => String(p.id) === payload.id);
    let result;
    if (operation === 'identity')
      result = { handle: 'gianpaj', subdomain: 'gianpaj' };
    else if (operation === 'list')
      result = posts.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.draft_title,
      }));
    else if (operation === 'get') {
      if (!post) throw new Error('missing');
      result = post;
    } else if (operation === 'create') {
      result = {
        id: 100 + posts.length,
        draft_title: payload.prepared.title,
        draft_subtitle: payload.prepared.subtitle,
        doc: { type: 'doc', content: payload.prepared.doc.content.slice(0, 1) },
        slug: null,
        audience: 'everyone',
        is_published: false,
        should_send_email: false,
        email_sent_at: null,
      };
      posts.push(result);
    } else if (operation === 'update') {
      Object.assign(post, {
        draft_title: payload.draft_title,
        draft_subtitle: payload.draft_subtitle,
        doc: copy(payload.doc),
        audience: 'everyone',
        should_send_email: false,
      });
      if (payload.cover) post.cover_image = payload.cover;
      result = post;
    } else if (operation === 'metadata') {
      post.slug = payload.slug;
      post.tags = payload.tags;
      post.should_send_email = false;
      result = post;
    } else if (operation === 'upload')
      result = {
        url: 'https://substack-post-media.s3.amazonaws.com/image.png',
      };
    else if (operation === 'publish') {
      post.is_published = true;
      result = { emailed: false };
    } else if (operation === 'public') result = { accessible: true };
    else throw new Error(`Unexpected operation: ${operation}`);
    if (fail === operation) {
      fail = undefined;
      throw new Error('Lost response');
    }
    return copy(result);
  };
  const run = (command) =>
    syncPost({
      command,
      prepared,
      source,
      ledger,
      save: () => Promise.resolve(),
      remote,
    });
  return {
    prepared,
    ledger,
    posts,
    calls,
    remote,
    run,
    fail: (operation) => {
      fail = operation;
    },
  };
}

describe('Substack article preparation', () => {
  it('preserves nested lists, links, code and content after the excerpt marker', async () => {
    const p = await prepare(
      article(
        `Intro.\n\n{/* more */}\n\n- Parent\n  - Child with [link](/target)\n\n\`\`\`js\nconst marker = "{/* more */}";\n\`\`\`\n\n![Photo](/photo.webp)\n\n[Details](#details)`,
      ),
    );
    const doc = JSON.stringify(p.doc);
    expect(p.original).toBe('https://gian.cool/2026/nov/02/useful-article');
    expect(doc).toContain('Child with');
    expect(doc).toContain('https://gian.cool/target');
    expect(doc).toContain('const marker');
    expect(doc).toContain('{/* more */}');
    expect(doc).toContain('https://gian.cool/photo.webp');
    expect(doc).toContain(`${p.original}#details`);
    expect(
      p.doc.content
        .find((n) => n.type === 'bulletList')
        .content[0].content.some((n) => n.type === 'bulletList'),
    ).toBe(true);
  });
  it('retains every table cell in a readable text summary', async () => {
    const p = await prepare(
      article(
        '| State | Cost |\n|---|---|\n| Sleeping | €0.30 |\n| Idle | €6.90 |',
      ),
    );
    expect(plainText(p.doc)).toContain('State: Sleeping; Cost: €0.30');
    expect(plainText(p.doc)).toContain('State: Idle; Cost: €6.90');
  });
  it('preserves links inside table summaries', async () => {
    const p = await prepare(
      article(
        '| Tool | URL |\n|---|---|\n| WakeBridge | [Source](https://github.com/gianpaj/wakebridge) |',
      ),
    );
    expect(JSON.stringify(p.doc)).toContain(
      'https://github.com/gianpaj/wakebridge',
    );
  });
  it('renders table images as PNGs and retains the text version', async () => {
    const p = await prepare(
      article('| State | Cost |\n|---|---|\n| Sleeping | €0.30 |'),
      { tables: 'images' },
    );
    expect(
      Buffer.from(p.assets[0].content, 'base64').subarray(1, 4).toString(),
    ).toBe('PNG');
    expect(plainText(p.doc)).toContain('State: Sleeping; Cost: €0.30');
  });
  it('handles the actual latest three articles without dropping code or prose', async () => {
    for (const name of [
      'fax-history-video-hyperframes',
      'mini-home-lab-on-demand-cloud-server-wakebridge',
      'streaming-waveform-wavesurfer',
    ]) {
      const input = await readFile(
        new URL(`../src/data/blog/${name}.mdx`, import.meta.url),
        'utf8',
      );
      const p = await prepare(input);
      expect(p.slug).toBe(name);
      expect(p.doc.content.length).toBeGreaterThan(25);
      const sourceCode = [...input.matchAll(/```[^\n]*\n([\s\S]*?)\n```/g)].map(
        (m) => m[1],
      );
      const docCode = p.doc.content
        .filter((n) => n.type === 'code_block')
        .map((n) => n.content[0].text);
      expect(docCode).toEqual(sourceCode);
    }
  });
  it('rejects unsupported MDX instead of silently losing interactive content', async () => {
    await expect(prepare(article('<MyChart data={values} />'))).rejects.toThrow(
      /Unsupported/,
    );
    await expect(prepare(article('{someExpression}'))).rejects.toThrow(
      /Unsupported/,
    );
    await expect(
      prepare(
        article('Text').replace(
          'slug: useful-article',
          'draft: true\nslug: useful-article',
        ),
      ),
    ).rejects.toThrow('draft: true');
  });
});

describe('Substack receipt and retry behavior', () => {
  it('reuses a draft across repeated runs and publishes web-only exactly once', async () => {
    const f = await fixture();
    await f.run('draft');
    await f.run('draft');
    await f.run('publish');
    await f.run('publish');
    expect(f.calls.filter((c) => c.operation === 'create')).toHaveLength(1);
    expect(f.calls.filter((c) => c.operation === 'publish')).toHaveLength(1);
    expect(
      f.calls.find((c) => c.operation === 'publish').payload.send_email,
    ).toBe(false);
    expect(f.ledger.entries[source].stage).toBe('published');
  });
  it('recovers a created draft after losing its response', async () => {
    const f = await fixture();
    f.fail('create');
    await expect(f.run('draft')).rejects.toThrow('Lost response');
    await f.run('draft');
    expect(f.posts).toHaveLength(1);
    expect(f.ledger.entries[source].post_id).toBe('100');
  });
  it('finds an existing source link even after its title and slug change', async () => {
    const f = await fixture();
    await f.run('draft');
    f.ledger.entries = {};
    f.posts[0].draft_title = 'Edited title';
    f.posts[0].slug = 'edited-slug';
    await f.run('metadata');
    expect(f.posts).toHaveLength(1);
    expect(f.posts[0].draft_title).toBe('Edited title');
    expect(f.calls.filter((c) => c.operation === 'create')).toHaveLength(1);
  });
  it('refuses to create again when an earlier creation cannot be reconciled', async () => {
    const f = await fixture();
    f.ledger.entries[source] = { stage: 'creating', source, uploads: {} };
    await expect(f.run('draft')).rejects.toThrow('unknown outcome');
    expect(f.calls.some((c) => c.operation === 'create')).toBe(false);
  });
  it('reconciles an applied update after its response is lost', async () => {
    const f = await fixture();
    await f.run('draft');
    Object.assign(f.prepared, await prepare(article('Updated content.')));
    f.fail('update');
    await expect(f.run('draft')).rejects.toThrow('Lost response');
    await f.run('draft');
    expect(f.posts).toHaveLength(1);
    expect(f.ledger.entries[source].content_hash).toBe(f.prepared.content_hash);
  });
  it('does not republish after losing the publish response', async () => {
    const f = await fixture();
    await f.run('draft');
    f.fail('publish');
    await expect(f.run('publish')).rejects.toThrow('Lost response');
    await f.run('publish');
    expect(f.calls.filter((c) => c.operation === 'publish')).toHaveLength(1);
  });
  it('accepts Substack default attributes but detects meaningful content changes', async () => {
    const f = await fixture();
    await f.run('draft');
    f.posts[0].doc.content[0].attrs = { textAlign: null };
    for (const node of f.posts[0].doc.content[0].content)
      for (const mark of node.marks || [])
        if (mark.type === 'link')
          Object.assign(mark.attrs, {
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
            class: null,
          });
    await f.run('draft');
    expect(normalizeDoc({ type: 'bulletList', content: [] })).toEqual(
      normalizeDoc({ type: 'bullet_list', content: [] }),
    );
    f.posts[0].doc.content[0].content[0].text = 'Changed';
    await expect(f.run('draft')).rejects.toThrow('edited outside');
  });
  it('preserves historical email sends during published metadata updates', async () => {
    const f = await fixture();
    await f.run('draft');
    f.posts[0].is_published = true;
    f.posts[0].should_send_email = true;
    f.posts[0].email_sent_at = '2026-11-07T00:00:00Z';
    const remote = async (op, payload) => {
      const result = await f.remote(op, payload);
      if (op === 'metadata') f.posts[0].should_send_email = true;
      return result;
    };
    await syncPost({
      command: 'metadata',
      prepared: f.prepared,
      source,
      ledger: f.ledger,
      save: () => Promise.resolve(),
      remote,
    });
    expect(f.posts[0].should_send_email).toBe(true);
    expect(f.calls.some((c) => c.operation === 'publish')).toBe(false);
  });
  it('removes obsolete managed tags while preserving unrelated tags', async () => {
    const f = await fixture();
    await f.run('draft');
    f.prepared.tags = ['audio'];
    await f.run('metadata');
    expect(
      f.calls.filter((c) => c.operation === 'metadata').at(-1).payload
        .remove_tags,
    ).toEqual(['coding_agent']);
  });
  it('refuses stale source publication and external draft edits', async () => {
    const f = await fixture();
    await f.run('draft');
    f.prepared.source_hash = 'changed';
    await expect(f.run('publish')).rejects.toThrow('Source changed');
    f.posts[0].draft_title = 'Edited in browser';
    await expect(f.run('draft')).rejects.toThrow('edited outside');
  });
  it('updates metadata without replacing the article body', async () => {
    const f = await fixture();
    await f.run('draft');
    const before = copy(f.posts[0].doc);
    f.calls.length = 0;
    await f.run('metadata');
    expect(f.posts[0].doc).toEqual(before);
    expect(
      f.calls.some((c) =>
        ['create', 'update', 'publish'].includes(c.operation),
      ),
    ).toBe(false);
  });
  it('rejects collisions and ambiguous matches without mutations', async () => {
    const f = await fixture();
    await f.run('draft');
    f.posts.push({ ...copy(f.posts[0]), id: 101 });
    f.calls.length = 0;
    await expect(f.run('draft')).rejects.toThrow('Multiple matching');
    expect(
      f.calls.every((c) => ['identity', 'list', 'get'].includes(c.operation)),
    ).toBe(true);
  });
  it('refuses a different publication before any writes', async () => {
    const f = await fixture();
    await expect(
      syncPost({
        command: 'draft',
        prepared: f.prepared,
        source,
        ledger: f.ledger,
        save: () => Promise.resolve(),
        remote: async () => ({ handle: 'other', subdomain: 'other' }),
      }),
    ).rejects.toThrow('Wrong Substack');
  });
  it('stops after failed public verification and can verify again without another publish', async () => {
    const f = await fixture();
    await f.run('draft');
    f.fail('public');
    await expect(f.run('publish')).rejects.toThrow('Lost response');
    await f.run('publish');
    expect(f.calls.filter((c) => c.operation === 'publish')).toHaveLength(1);
  });
  it('caches uploads in receipts for stable reruns', async () => {
    const f = await fixture();
    f.prepared.upload_images = true;
    f.prepared.doc.content.push({
      type: 'captionedImage',
      content: [
        {
          type: 'image2',
          attrs: { src: 'https://gian.cool/photo.webp', alt: 'Photo' },
        },
      ],
    });
    await f.run('draft');
    await f.run('draft');
    expect(f.calls.filter((c) => c.operation === 'upload')).toHaveLength(1);
  });
});

describe('receipt persistence', () => {
  it('round-trips receipts and rejects concurrent writers without deleting their lock', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'substack-test-'));
    try {
      const ledger = await readLedger(dir);
      ledger.entries[source] = { post_id: '100' };
      await saveLedger(dir, ledger);
      expect(await readLedger(dir)).toEqual(ledger);
      await withLock(dir, async () => {
        await expect(withLock(dir, () => Promise.resolve())).rejects.toThrow(
          'Another cross-post',
        );
      });
      await withLock(dir, () => Promise.resolve());
      await writeFile(join(dir, 'receipts.json'), 'broken');
      await expect(readLedger(dir)).rejects.toThrow();
    } finally {
      await rm(dir, { recursive: true });
    }
  });
});
