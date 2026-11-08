#!/usr/bin/env node
import { spawn } from 'node:child_process';
import {
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { prepare } from './prepare.mjs';
import { syncPost } from './workflow.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../../..');
const usage = `Usage: node .agents/skills/cross-post-substack/scripts/cross-post.mjs COMMAND [FILE ...] [OPTIONS]

Commands: preview, draft, metadata, publish
Options:
  --latest N          Select the N latest published MDX articles instead of FILE
  --confirm           Permit the requested live writes; required outside preview
  --state-dir PATH    Receipt directory; default: ~/.local/state/gian-cool/substack
  --tables images     Render tables as PNG images plus text summaries; default: lists
  --font PATH         TTF font for table rendering; autodetects on macOS/Linux
  --cover PATH_OR_URL Cover image as PNG/JPEG/WebP file or HTTPS URL
  --upload-images     Re-host article images on Substack
  --output PATH       Save the full prepared JSON for inspection

Preview never connects to Substack. Publish sends no email. Install transport:
  uv tool install substack-api-mcp==1.0.6
`;

export async function readLedger(dir) {
  try {
    const ledger = JSON.parse(
      await readFile(join(dir, 'receipts.json'), 'utf8'),
    );
    if (
      ledger.version !== 1 ||
      ledger.publication !== 'gianpaj' ||
      !ledger.entries ||
      typeof ledger.entries !== 'object' ||
      Array.isArray(ledger.entries)
    )
      throw new Error('Unsupported receipt file');
    return ledger;
  } catch (error) {
    if (error.code === 'ENOENT')
      return { version: 1, publication: 'gianpaj', entries: {} };
    throw error;
  }
}

export async function saveLedger(dir, ledger) {
  await mkdir(dir, { recursive: true, mode: 0o700 });
  const target = join(dir, 'receipts.json');
  const temp = `${target}.${process.pid}.tmp`;
  await writeFile(temp, `${JSON.stringify(ledger, null, 2)}\n`, {
    mode: 0o600,
  });
  await rename(temp, target);
}

export async function withLock(dir, action) {
  await mkdir(dir, { recursive: true, mode: 0o700 });
  const lock = join(dir, 'lock');
  try {
    await mkdir(lock);
  } catch (error) {
    if (error.code === 'EEXIST')
      throw new Error(
        `Another cross-post command holds ${lock}; inspect its owner.json before removing a stale lock`,
      );
    throw error;
  }
  try {
    await writeFile(
      join(lock, 'owner.json'),
      JSON.stringify({
        pid: process.pid,
        started_at: new Date().toISOString(),
      }),
    );
    return await action();
  } finally {
    await rm(lock, { recursive: true });
  }
}

function remote(operation, payload = {}) {
  return new Promise((success, failure) => {
    const child = spawn(
      'uv',
      [
        'tool',
        'run',
        '--offline',
        '--from',
        'substack-api-mcp',
        'python',
        join(here, 'remote.py'),
      ],
      { stdio: ['pipe', 'pipe', 'pipe'] },
    );
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => {
      child.kill();
      failure(
        new Error(
          'Substack request timed out; receipt retained. Inspect live state before retrying.',
        ),
      );
    }, 120_000);
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    child.stderr.on('data', (data) => {
      stderr += data;
    });
    child.on('error', (error) => {
      clearTimeout(timer);
      failure(error);
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      let answer;
      try {
        answer = JSON.parse(stdout);
      } catch {
        failure(
          new Error(
            `Substack adapter failed (${code}). Check uv and substack-api-mcp installation. ${stderr.slice(0, 300)}`,
          ),
        );
        return;
      }
      if (answer.ok) success(answer.result);
      else failure(new Error(answer.error));
    });
    child.stdin.on('error', () => {
      /* The process error/close handler reports failures. */
    });
    child.stdin.end(JSON.stringify({ operation, payload }));
  });
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      latest: { type: 'string' },
      confirm: { type: 'boolean' },
      'state-dir': { type: 'string' },
      tables: { type: 'string', default: 'lists' },
      font: { type: 'string' },
      cover: { type: 'string' },
      'upload-images': { type: 'boolean' },
      output: { type: 'string' },
      help: { type: 'boolean' },
    },
  });
  if (values.help || !positionals.length) {
    console.log(usage);
    return;
  }
  const [command, ...paths] = positionals;
  if (!['preview', 'draft', 'metadata', 'publish'].includes(command))
    throw new Error(usage);
  if (
    command === 'metadata' &&
    (values.cover || values['upload-images'] || values.tables !== 'lists')
  )
    throw new Error(
      'metadata changes tags and slug only; use draft for content, tables, and cover images',
    );
  if (!['lists', 'images'].includes(values.tables))
    throw new Error('--tables must be lists or images');
  if (command !== 'preview' && !values.confirm)
    throw new Error(
      'Pass --confirm to authorize this command; use preview to inspect content without writes',
    );
  const { files, cover } = await selectSources(values, paths);
  const prepared = [];
  for (const file of files) {
    const source = relative(root, file).replaceAll('\\', '/');
    if (
      !source.startsWith('src/data/blog/') ||
      source.split('/').includes('..')
    )
      throw new Error('Sources must be within this repository’s src/data/blog');
    prepared.push({
      source,
      prepared: await prepare(await readFile(file, 'utf8'), {
        tables: values.tables,
        font: values.font,
        cover,
        uploadImages: values['upload-images'],
      }),
    });
  }
  if (values.output)
    await writeFile(
      resolve(values.output),
      `${JSON.stringify(prepared, null, 2)}\n`,
    );
  if (command === 'preview') {
    console.log(
      JSON.stringify(
        prepared.map(({ source, prepared: p }) => ({
          source,
          title: p.title,
          subtitle: p.subtitle,
          slug: p.slug,
          tags: p.tags,
          original: p.original,
          source_hash: p.source_hash,
          content_hash: p.content_hash,
          doc: p.doc,
          assets: p.assets.map((a) => ({
            key: a.key,
            mime: a.mime,
            bytes: Buffer.from(a.content, 'base64').length,
          })),
          cover: p.cover?.startsWith('data:') ? 'local image' : p.cover,
          upload_images: p.upload_images,
          warnings: p.warnings,
          send_email: false,
        })),
        null,
        2,
      ),
    );
    return;
  }
  const stateDir = resolve(
    values['state-dir'] || join(homedir(), '.local/state/gian-cool/substack'),
  );
  await withLock(stateDir, async () => {
    const ledger = await readLedger(stateDir);
    for (const item of prepared) {
      const result = await syncPost({
        command,
        ...item,
        ledger,
        save: (value) => saveLedger(stateDir, value),
        remote,
      });
      console.log(JSON.stringify(result));
    }
  });
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });

async function selectSources(values, paths) {
  if (values.latest && paths.length)
    throw new Error('Choose FILE arguments or --latest, not both');
  let files = paths.map((p) => resolve(p));
  if (values.latest) {
    const count = Number(values.latest);
    if (!Number.isInteger(count) || count < 1)
      throw new Error('--latest must be a positive integer');
    const { parseFrontmatter } = await import('@astrojs/markdown-remark');
    const directory = join(root, 'src/data/blog');
    files = (
      await Promise.all(
        (
          await readdir(directory)
        )
          .filter((n) => /\.mdx?$/.test(n) && !n.startsWith('_'))
          .map(async (n) => {
            const path = join(directory, n);
            const { frontmatter } = parseFrontmatter(
              await readFile(path, 'utf8'),
            );
            return { path, meta: frontmatter };
          }),
      )
    )
      .filter((p) => !p.meta.draft)
      .sort(
        (a, b) =>
          new Date(b.meta.pubDate) - new Date(a.meta.pubDate) ||
          a.path.localeCompare(b.path),
      )
      .slice(0, count)
      .map((p) => p.path);
  }
  if (!files.length) throw new Error('Select at least one source file');
  let cover = values.cover;
  if (cover && !cover.startsWith('https://')) {
    const mime = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
    }[extname(cover).toLowerCase()];
    if (!mime) throw new Error('Local cover must be PNG, JPEG, or WebP');
    cover = `data:${mime};base64,${(await readFile(resolve(cover))).toString('base64')}`;
  }
  return { files, cover };
}
