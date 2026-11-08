import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import MarkdownIt from 'markdown-it';

import { postPath } from '../../../../src/utils/post-path.ts';

const md = new MarkdownIt({ html: true });
export const hash = (value) =>
  createHash('sha256')
    .update(
      typeof value === 'string' || Buffer.isBuffer(value)
        ? value
        : JSON.stringify(value),
    )
    .digest('hex');
const text = (value) => ({ type: 'text', text: value });
const paragraph = (content) => ({
  type: 'paragraph',
  ...(content.length ? { content } : {}),
});
const image = (src, alt) => ({
  type: 'captionedImage',
  content: [{ type: 'image2', attrs: { src, alt: alt || null } }],
});
const link = (label, href) => ({
  ...text(label),
  marks: [{ type: 'link', attrs: { href } }],
});
const absolute = (url, original) => {
  const target = new URL(
    url,
    url.startsWith('#') ? original : 'https://gian.cool',
  );
  if (!['http:', 'https:', 'mailto:'].includes(target.protocol))
    throw new Error(`Unsupported link URL: ${url}`);
  return target.href;
};

function imageNodes(src, alt, original) {
  const url = absolute(src, original);
  if (!['http:', 'https:'].includes(new URL(url).protocol))
    throw new Error(`Unsupported image URL: ${src}`);
  return /\.svg(?:[?#]|$)/i.test(url)
    ? [paragraph([link(alt || 'View image', url)])]
    : [image(url, alt)];
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Token dispatch keeps formatting marks in input order.
function inline(tokens, original) {
  const marks = [];
  const nodes = [];
  for (const token of tokens || []) {
    if (token.type === 'text' && !token.content) continue;
    if (
      ['strong_open', 'em_open', 's_open', 'link_open'].includes(token.type)
    ) {
      marks.push(
        token.type === 'link_open'
          ? {
              type: 'link',
              attrs: { href: absolute(token.attrGet('href'), original) },
            }
          : {
              type: {
                strong_open: 'strong',
                em_open: 'em',
                s_open: 'strikethrough',
              }[token.type],
            },
      );
    } else if (
      ['strong_close', 'em_close', 's_close', 'link_close'].includes(token.type)
    )
      marks.pop();
    else if (token.type === 'softbreak') nodes.push(text(' '));
    else if (token.type === 'hardbreak') nodes.push({ type: 'hard_break' });
    else if (token.type === 'image')
      throw new Error(
        'Place images on their own line so they can be preserved',
      );
    else if (token.type === 'html_inline')
      throw new Error(`Unsupported inline HTML: ${token.content}`);
    else if (['text', 'code_inline'].includes(token.type) && token.content) {
      const active =
        token.type === 'code_inline'
          ? [...marks, { type: 'code' }]
          : [...marks];
      nodes.push({
        ...text(token.content),
        ...(active.length ? { marks: active } : {}),
      });
    } else throw new Error(`Unsupported Markdown token: ${token.type}`);
  }
  return nodes;
}

let wasmReady;
async function tablePng(rows, preferredFont) {
  let fontPath = preferredFont;
  const { Resvg, initWasm } = await import('@resvg/resvg-wasm');
  const require = createRequire(import.meta.url);
  wasmReady ||= initWasm(
    readFileSync(require.resolve('@resvg/resvg-wasm/index_bg.wasm')),
  );
  await wasmReady;
  if (!fontPath) {
    const mac = '/System/Library/Fonts/Supplemental/Arial.ttf';
    if (existsSync(mac)) fontPath = mac;
    else {
      try {
        fontPath = execFileSync('fc-match', ['-f', '%{file}', 'sans-serif'], {
          encoding: 'utf8',
        }).trim();
      } catch {
        /* The explicit --font check below covers systems without fontconfig. */
      }
    }
  }
  if (!(fontPath && existsSync(fontPath)))
    throw new Error(
      'Table images need a local TTF font; pass --font /path/font.ttf',
    );
  const escapeXml = (s) =>
    s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  const width = Math.max(720, rows[0].length * 260);
  const cellWidth = width / rows[0].length;
  const wrap = (s) => {
    const length = Math.floor((cellWidth - 32) / 12);
    const lines = [];
    for (let rest = s; rest.length; rest = rest.slice(length))
      lines.push(rest.slice(0, length));
    return lines.length ? lines : [''];
  };
  let y = 0;
  let shapes = '';
  for (const [index, row] of rows.entries()) {
    const cells = row.map(wrap);
    const height = 28 * Math.max(...cells.map((c) => c.length)) + 28;
    shapes += `<rect y="${y}" width="${width}" height="${height}" fill="${index === 0 ? '#e8edf2' : '#ffffff'}" stroke="#aab4bf"/>`;
    for (const [column, lines] of cells.entries()) {
      for (const [i, line] of lines.entries()) {
        shapes += `<text x="${column * cellWidth + 16}" y="${y + 32 + i * 28}" font-size="20" fill="#15202b">${escapeXml(line)}</text>`;
      }
    }
    y += height;
  }
  const renderer = new Resvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${y}">${shapes}</svg>`,
    { font: { fontBuffers: [readFileSync(fontPath)] } },
  );
  const rendered = renderer.render();
  try {
    return Buffer.from(rendered.asPng());
  } finally {
    rendered.free();
    renderer.free();
  }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This single-pass token parser shares its cursor and nesting stack across Markdown block types.
export async function prepare(source, options = {}) {
  const { frontmatter: meta, content } = parseFrontmatter(source);
  for (const field of ['title', 'description', 'slug'])
    if (typeof meta[field] !== 'string' || !meta[field])
      throw new Error(`Missing frontmatter ${field}`);
  if (meta.draft) throw new Error('Source is marked draft: true');
  const date = new Date(meta.pubDate);
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid pubDate');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug))
    throw new Error('Slug must use lowercase letters, digits, and hyphens');
  if (
    !Array.isArray(meta.tags) ||
    meta.tags.some((t) => typeof t !== 'string' || !t)
  )
    throw new Error('tags must be an array of nonempty strings');
  const original = `https://gian.cool${postPath(date, meta.slug)}`;
  const tokens = md.parse(content, {});
  const root = [];
  const stack = [root];
  const assets = [];
  const warnings = [];
  const add = (node) => stack.at(-1).push(node);
  let tableNumber = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'table_open') {
      const rows = [];
      let row;
      while (tokens[++i].type !== 'table_close') {
        const part = tokens[i];
        if (part.type === 'tr_open') {
          row = [];
          rows.push(row);
        }
        if (part.type === 'inline') row.push(part);
      }
      const summary = rows
        .slice(1)
        .map((cells) =>
          paragraph(
            cells.flatMap((cell, column) => [
              ...(column ? [text('; ')] : []),
              ...inline(rows[0][column].children, original),
              text(': '),
              ...inline(cell.children, original),
            ]),
          ),
        );
      tableNumber += 1;
      if (options.tables === 'images') {
        const printable = rows.map((cells) =>
          cells.map((cell) =>
            cell.children.map((token) => token.content).join(''),
          ),
        );
        const png = await tablePng(printable, options.font);
        const key = hash(png);
        assets.push({
          key,
          content: png.toString('base64'),
          mime: 'image/png',
        });
        add(
          image(`asset:${key}`, `Table ${tableNumber}. Text version follows.`),
        );
      }
      add({
        type: 'bulletList',
        content: summary.map((p) => ({ type: 'listItem', content: [p] })),
      });
      warnings.push(`Table ${tableNumber} includes a labeled text version`);
    } else if (
      [
        'bullet_list_open',
        'ordered_list_open',
        'list_item_open',
        'blockquote_open',
        'heading_open',
        'paragraph_open',
      ].includes(t.type)
    ) {
      const types = {
        bullet_list_open: 'bulletList',
        ordered_list_open: 'orderedList',
        list_item_open: 'listItem',
        blockquote_open: 'blockquote',
        heading_open: 'heading',
        paragraph_open: 'paragraph',
      };
      const node = { type: types[t.type], content: [] };
      if (t.type === 'heading_open')
        node.attrs = { level: Number(t.tag.slice(1)) };
      if (t.type === 'ordered_list_open')
        node.attrs = {
          start: Number(t.attrGet('start') || 1),
          order: Number(t.attrGet('start') || 1),
        };
      if (t.type === 'paragraph_open' && tokens[i + 1]?.type === 'inline') {
        const next = tokens[i + 1];
        if (next.content.trim() === '{/* more */}') {
          i += 2;
          continue;
        }
        if (/^\s*(?:import|export)\s|^\s*\{/.test(next.content))
          throw new Error(
            'Unsupported MDX expression or import; replace it with static content',
          );
        if (
          next.children?.length === 1 &&
          next.children[0].type === 'html_inline' &&
          /^<img\b[^>]*\/?>$/s.test(next.children[0].content.trim())
        ) {
          const html = next.children[0].content;
          const src = html.match(/\bsrc=["']([^"']+)["']/)?.[1];
          const alt = html.match(/\balt=["']([^"']*)["']/)?.[1] || '';
          if (!src) throw new Error('HTML image has no static src');
          for (const node of imageNodes(src, alt, original)) add(node);
          i += 2;
          continue;
        }
        if (next.children?.length === 1 && next.children[0].type === 'image') {
          const img = next.children[0];
          for (const node of imageNodes(
            img.attrGet('src'),
            img.content,
            original,
          ))
            add(node);
          i += 2;
          continue;
        }
      }
      add(node);
      stack.push(node.content);
    } else if (t.nesting === -1) stack.pop();
    else if (t.type === 'inline')
      stack.at(-1).push(...inline(t.children, original));
    else if (['fence', 'code_block'].includes(t.type))
      add({
        type: 'code_block',
        content: [text(t.content.replace(/\n$/, ''))],
      });
    else if (t.type === 'hr') add({ type: 'horizontal_rule' });
    else if (t.type === 'html_block') {
      const html = t.content.trim();
      if (/^<!--\s*more\s*-->$/.test(html)) continue;
      if (/^<img\b[^>]*\/?>$/s.test(html)) {
        const src = html.match(/\bsrc=["']([^"']+)["']/)?.[1];
        const alt = html.match(/\balt=["']([^"']*)["']/)?.[1] || '';
        if (!src) throw new Error('HTML image has no static src');
        for (const node of imageNodes(src, alt, original)) add(node);
      } else if (/^<iframe\b[\s\S]*<\/iframe>$/.test(html)) {
        const src = html.match(/\bsrc=["']([^"']+)["']/)?.[1];
        const label =
          html.match(/\btitle=["']([^"']+)["']/)?.[1] ||
          'Open interactive content';
        if (!src) throw new Error('iframe has no static src');
        const url = /youtube(?:-nocookie)?\.com\/embed\//.test(src)
          ? `https://www.youtube.com/watch?v=${new URL(src).pathname.split('/').pop()}`
          : absolute(src, original);
        if (!content.includes(`](${url})`)) add(paragraph([link(label, url)]));
        warnings.push(`Embedded content linked: ${label}`);
      } else
        throw new Error(`Unsupported HTML/MDX block: ${html.slice(0, 80)}`);
    } else throw new Error(`Unsupported block: ${t.type}`);
  }
  if (stack.length !== 1) throw new Error('Unbalanced article structure');
  root.unshift(
    paragraph([
      text('Originally published on '),
      link('gian.cool', original),
      text(` on ${date.toISOString().slice(0, 10)}.`),
    ]),
  );
  const result = {
    title: meta.title,
    subtitle: meta.description,
    slug: meta.slug,
    tags: [...new Set(meta.tags)],
    original,
    doc: { type: 'doc', content: root },
    assets,
    warnings,
    source_hash: hash(source),
    cover: options.cover || null,
    upload_images: !!options.uploadImages,
  };
  result.content_hash = hash({
    ...result,
    assets: assets.map(({ key, mime }) => ({ key, mime })),
    warnings: undefined,
  });
  return result;
}
