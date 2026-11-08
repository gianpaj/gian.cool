import { hash } from './prepare.mjs';

function normalizeAttrs(value) {
  const allowed = {
    link: ['href'],
    image2: ['src', 'alt'],
    image: ['src', 'alt'],
  }[value.type];
  return Object.fromEntries(
    Object.entries(value.attrs || {})
      .filter(
        ([key, entry]) =>
          entry !== null &&
          entry !== undefined &&
          (!allowed || allowed.includes(key)),
      )
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

export function normalizeDoc(value) {
  if (Array.isArray(value)) return value.map(normalizeDoc);
  if (!value || typeof value !== 'object') return value;
  const out = {};
  for (const key of Object.keys(value).sort()) {
    if (key === 'attrs') {
      const attrs = normalizeAttrs(value);
      if (Object.keys(attrs).length) out.attrs = attrs;
    } else if (key === 'type')
      out.type =
        {
          bulletList: 'bullet_list',
          orderedList: 'ordered_list',
          listItem: 'list_item',
        }[value.type] || value.type;
    else out[key] = normalizeDoc(value[key]);
  }
  return out;
}
const fingerprint = (p) =>
  hash(
    normalizeDoc({
      title: p.draft_title,
      subtitle: p.draft_subtitle,
      doc: p.doc,
      audience: p.audience,
    }),
  );
const expected = (p, doc = p.doc) => ({
  draft_title: p.title,
  draft_subtitle: p.subtitle,
  doc,
  audience: 'everyone',
});
const same = (a, b) =>
  JSON.stringify(normalizeDoc(a)) === JSON.stringify(normalizeDoc(b));

export async function syncPost({
  command,
  prepared,
  source,
  ledger,
  save,
  remote,
}) {
  const identity = await remote('identity');
  if (identity.handle !== 'gianpaj' || identity.subdomain !== 'gianpaj')
    throw new Error(
      'Wrong Substack account or publication; expected @gianpaj / gianpaj',
    );
  const entries = ledger.entries;
  let receipt = entries[source];
  if (command === 'publish') assertPreparedUnchanged(receipt, prepared);
  let post = await findExisting(remote, prepared, receipt);
  if (!post && receipt?.stage === 'creating')
    throw new Error(
      'Previous draft creation has an unknown outcome; inspect Substack before clearing this source receipt',
    );
  if (receipt?.post_id && !post)
    throw new Error(
      'Receipted post is missing; inspect it before creating another',
    );
  if (!post && command !== 'draft')
    throw new Error('No matching draft; run draft first');
  receipt ||= {
    source,
    original: prepared.original,
    slug: prepared.slug,
    stage: 'creating',
    uploads: {},
  };
  entries[source] = receipt;
  if (!post) {
    receipt.stage = 'creating';
    await save(ledger);
    post = await remote('create', { prepared });
    receipt.post_id = String(post.id);
    receipt.edit_url = `https://gianpaj.substack.com/publish/post/${post.id}`;
    receipt.stage = 'created';
    await save(ledger);
  }
  receipt.post_id = String(post.id);
  receipt.edit_url ||= `https://gianpaj.substack.com/publish/post/${post.id}`;
  await save(ledger);
  if (post.scheduled)
    throw new Error(
      'Post is scheduled; inspect or unschedule it before changing it',
    );
  if (post.is_published && command === 'draft')
    throw new Error(
      'Post is already published; this command only changes drafts',
    );
  if (
    command === 'publish' &&
    !post.is_published &&
    (!receipt.content_hash || receipt.content_hash !== prepared.content_hash)
  )
    throw new Error('Synchronize this draft before publishing');

  const context = { prepared, receipt, ledger, save, remote };
  if (command === 'draft') post = await synchronizeDraft({ ...context, post });
  if (command === 'metadata' || command === 'draft')
    post = await synchronizeMetadata({ ...context, post });
  if (command === 'publish') post = await publishVerified({ ...context, post });

  return {
    operation: command,
    source,
    post_id: receipt.post_id,
    status: receipt.stage,
    edit_url: receipt.edit_url,
    url: receipt.url,
    slug: post.slug,
    tags: receipt.tags,
    send_email: post.should_send_email,
  };
}

async function synchronizeDraft({
  prepared,
  receipt,
  ledger,
  save,
  remote,
  post: initialPost,
}) {
  let post = initialPost;
  if (receipt.pending && fingerprint(post) === fingerprint(receipt.pending)) {
    receipt.remote_hash = fingerprint(post);
  }
  if (receipt.remote_hash && receipt.remote_hash !== fingerprint(post))
    throw new Error(
      'Draft was edited outside the helper; inspect it before overwriting',
    );
  const { doc, cover } = await uploadMedia({
    prepared,
    receipt,
    ledger,
    save,
    remote,
  });
  // Bind source state before the request, so a lost response can be reconciled.
  receipt.pending = { ...expected(prepared, doc), cover };
  receipt.stage = 'updating';
  await save(ledger);
  if (
    !same(post.doc, doc) ||
    post.draft_title !== prepared.title ||
    post.draft_subtitle !== prepared.subtitle ||
    post.audience !== 'everyone' ||
    cover
  ) {
    post = await remote('update', {
      id: receipt.post_id,
      ...receipt.pending,
      expected_updated_at: post.draft_updated_at,
    });
  }
  const verified = await remote('get', { id: receipt.post_id });
  if (
    !same(verified.doc, doc) ||
    verified.draft_title !== prepared.title ||
    verified.draft_subtitle !== prepared.subtitle ||
    verified.audience !== 'everyone' ||
    (cover && verified.cover_image !== cover)
  )
    throw new Error('Saved draft content differs from prepared content');
  post = verified;
  receipt.source_hash = prepared.source_hash;
  receipt.content_hash = prepared.content_hash;
  receipt.remote_hash = fingerprint(post);
  receipt.pending = undefined;
  receipt.stage = 'draft';
  await save(ledger);
  return post;
}

async function synchronizeMetadata({
  prepared,
  receipt,
  ledger,
  save,
  remote,
  post: initialPost,
}) {
  let post = initialPost;
  const before = fingerprint(post);
  const wasPublished = post.is_published;
  const beforeEmail = post.should_send_email;
  await remote('metadata', {
    id: receipt.post_id,
    slug: prepared.slug,
    tags: prepared.tags,
    remove_tags: (receipt.tags || []).filter(
      (name) => !prepared.tags.includes(name),
    ),
  });
  post = await remote('get', { id: receipt.post_id });
  if (
    post.slug !== prepared.slug ||
    (!wasPublished && post.should_send_email !== false) ||
    (wasPublished && post.should_send_email !== beforeEmail) ||
    fingerprint(post) !== before ||
    post.is_published !== wasPublished
  )
    throw new Error('Metadata update changed content or delivery state');
  receipt.slug = post.slug;
  receipt.tags = prepared.tags;
  receipt.stage = wasPublished ? 'published' : 'draft';
  await save(ledger);
  return post;
}

async function publishVerified({
  prepared,
  receipt,
  ledger,
  save,
  remote,
  post: initialPost,
}) {
  let post = initialPost;
  if (receipt.remote_hash !== fingerprint(post))
    throw new Error(
      'Draft content differs from the synchronized receipt; synchronize before publishing',
    );
  if (!post.is_published) {
    if (post.should_send_email !== false || post.slug !== prepared.slug)
      throw new Error(
        'Draft slug or email setting differs from the synchronized receipt',
      );
    receipt.stage = 'publishing';
    await save(ledger);
    await remote('publish', { id: receipt.post_id, send_email: false });
  }
  post = await remote('get', { id: receipt.post_id });
  if (
    !post.is_published ||
    post.should_send_email !== false ||
    post.email_sent_at ||
    post.slug !== prepared.slug ||
    receipt.remote_hash !== fingerprint(post)
  )
    throw new Error(
      'Published post does not match the synchronized web-only draft',
    );
  const url = `https://gianpaj.substack.com/p/${post.slug}`;
  await remote('public', { url, title: prepared.title });
  receipt.stage = 'published';
  receipt.url = url;
  await save(ledger);
  return post;
}

async function uploadMedia({ prepared, receipt, ledger, save, remote }) {
  const doc = structuredClone(prepared.doc);
  async function upload(src, data) {
    const key = hash(data || src);
    if (!receipt.uploads[key]) {
      receipt.uploads[key] = (await remote('upload', { src, data })).url;
      await save(ledger);
    }
    return receipt.uploads[key];
  }
  async function walk(node) {
    if (node.type === 'image2') {
      const src = node.attrs.src;
      if (src.startsWith('asset:')) {
        const asset = prepared.assets.find((a) => `asset:${a.key}` === src);
        if (!asset) throw new Error('Prepared image asset is missing');
        node.attrs.src = await upload(
          null,
          `data:${asset.mime};base64,${asset.content}`,
        );
      } else if (prepared.upload_images) node.attrs.src = await upload(src);
    }
    for (const child of node.content || []) await walk(child);
  }
  await walk(doc);
  const cover = prepared.cover
    ? await upload(
        prepared.cover.startsWith('data:') ? null : prepared.cover,
        prepared.cover.startsWith('data:') ? prepared.cover : undefined,
      )
    : null;
  return { doc, cover };
}

async function findExisting(remote, prepared, receipt) {
  const posts = await remote('list');
  const candidates = posts.filter(
    (p) =>
      String(p.id) === receipt?.post_id ||
      p.slug === prepared.slug ||
      p.title === prepared.title,
  );
  const matching = [];
  for (const candidate of receipt?.post_id ? candidates : posts) {
    const post = await remote('get', { id: String(candidate.id) });
    if (
      String(post.id) === receipt?.post_id ||
      JSON.stringify(post.doc).includes(prepared.original)
    )
      matching.push(post);
    else if (candidates.includes(candidate))
      throw new Error(
        `Post ${candidate.id} shares a title or slug but has no matching source link; inspect it manually`,
      );
  }
  if (matching.length > 1)
    throw new Error(
      'Multiple matching Substack posts; resolve the duplicates before continuing',
    );
  return matching[0];
}

function assertPreparedUnchanged(receipt, prepared) {
  if (receipt?.source_hash && receipt.source_hash !== prepared.source_hash)
    throw new Error('Source changed; synchronize the draft before publishing');
  if (receipt?.content_hash && receipt.content_hash !== prepared.content_hash)
    throw new Error(
      'Prepared content changed; synchronize the draft before publishing',
    );
}
