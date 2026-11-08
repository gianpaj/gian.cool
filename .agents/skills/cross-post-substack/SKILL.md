---
name: cross-post-substack
description: Cross-post gian.cool blog articles to Substack, or update their Substack metadata, with matching tags and slugs. Use for preparing copies, resuming drafts, and publishing requested posts.
---

# Cross-post to Substack

Use the [local helper](scripts/cross-post.mjs) for copies from `src/data/blog/`
to `https://gianpaj.substack.com`, owned by `@gianpaj`. It uses the repository's
Markdown parser and the installed
[substack-api-mcp](https://github.com/cotletdev/substack-api-mcp-server) transport.
The official Substack MCP is read-only.

## Commands

Run from the repository root with Node 24 and installed project dependencies.
Use source filenames or `--latest N`; latest selects non-draft articles by
frontmatter `pubDate`, not filename order.

```sh
node .agents/skills/cross-post-substack/scripts/cross-post.mjs preview --latest 3
node .agents/skills/cross-post-substack/scripts/cross-post.mjs draft --latest 3 --confirm
node .agents/skills/cross-post-substack/scripts/cross-post.mjs metadata src/data/blog/agentcaller.mdx --confirm
node .agents/skills/cross-post-substack/scripts/cross-post.mjs publish src/data/blog/agentcaller.mdx --confirm
```

`preview` is offline and performs no Substack requests. It prints the prepared
document, source and content hashes, metadata, conversion warnings, and delivery
mode. `--output /tmp/substack-preview.json` saves the full payload for inspection.

`draft` creates or updates an unpublished task draft, synchronizes its metadata,
and verifies saved content. `metadata` changes tags and slug without replacing
the article. It preserves a published post's historical delivery setting.
`publish` requires a synchronized draft and unchanged source, verifies the live
post, and checks the public page. It always sends `send_email=false`; this helper
does not send newsletters.

Use `--confirm` only when the current task authorizes that operation. A request
to write or improve this helper does not authorize creating or publishing posts.
Honor publishing authorization already given; do not ask for it again.

## Content and images

The source frontmatter supplies the title, subtitle from `description`, exact
tag names, and slug. Substack URLs use `/p/{slug}`, without the blog's date
folders. The helper derives the original link using `src/utils/post-path.ts`.

The helper preserves nested lists, links, emphasis, code blocks, and images. It
removes excerpt separators outside code, resolves relative URLs, and links to
interactive embeds. Unsupported HTML or MDX fails with an error instead of
silently disappearing. Preserve source files; do not rewrite the article while
cross-posting.

Tables become labeled text summaries. To include rendered PNG tables, add
`--tables images`; the text summaries remain. The renderer uses a local TTF
font, detected on macOS/Linux or supplied with `--font /path/font.ttf`.

Use `--cover /path/image.png` or `--cover https://...` to upload and set a draft
cover. PNG, JPEG, and WebP files are supported. `--upload-images` re-hosts article
images on Substack; otherwise they retain their public source URLs. SVG images
become links. Uploaded URLs are cached in the receipt for reruns.

Use the same conversion and image options when previewing, drafting, and
publishing. Changing them changes the content hash and requires another draft
synchronization before publishing. Metadata-only changes do not upload images.

## Receipts and recovery

Receipts live at `~/.local/state/gian-cool/substack/receipts.json`; override the
directory with `--state-dir PATH`. Keep it outside the repository. Source paths
are relative to the repository so worktrees share the same post mapping.

The helper records source and content hashes, post IDs, slugs, upload URLs, and
operation states. It writes receipts atomically and locks mutations across
processes. For a stale lock, inspect its `owner.json` and confirm the process is
inactive before removing only that lock directory.

Before creating a post, the helper checks published posts, drafts, and scheduled
posts. It reuses receipted IDs or a unique post with the original-source link.
Title or slug collisions without a matching source link require inspection.
External edits, scheduled posts, and ambiguous matches stop synchronization.
It refuses draft-body updates to published articles.

On a timeout or failed write, rerun the same command with the same state
directory. The helper reads live state before continuing. It recovers draft IDs
after a lost create response, reconciles an applied update, and verifies an
already-published post without publishing it again. Preserve receipts when
resolving errors.

## Authentication

Install the transport once with `uv tool install substack-api-mcp==1.0.6`.
The adapter runs its Python environment through `uv tool run --offline`; it does
not install packages during posting. The version check binds the adapter to the
API it supports. Inspect and test the adapter before changing that check.

Use `substack-mcp status` to check the session. For a local signed-in Chrome,
enable remote debugging at `chrome://inspect/#remote-debugging`, run
`substack-mcp connect`, and approve Chrome's prompt.

For a session on another computer, request `substack.sid` through the host's
private secret input. In Chrome it is under Developer Tools → Application →
Cookies → `https://substack.com`. The `connect --token` prompt calls it
`auth_token`; the actual cookie is `substack.sid`. Read private input from its
secret file without printing it. The package's `session.from_token()` and
`session.save()` store it outside the repository with mode `0600`.

If Substack returns `reauthentication_required`, stop and request a fresh
session after a new sign-in on the user's working computer. Do not repeatedly
retry the same credentials. Resume from receipts; report draft links and the
remaining authentication step if publication stays blocked.

Report verified published URLs and web-only delivery. For metadata updates or
blocked publication, distinguish saved metadata and drafts from live delivery.
