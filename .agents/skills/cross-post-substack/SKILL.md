---
name: cross-post-substack
description: Cross-post gian.cool blog articles to Substack, or update their Substack drafts, with matching tags and slugs. Use for preparing copies, syncing metadata, and publishing requested posts.
---

# Cross-post to Substack

Copy posts from `src/data/blog/` to `https://gianpaj.substack.com` using
[substack-api-mcp](https://github.com/cotletdev/substack-api-mcp-server).
The publication owner is `@gianpaj`. The official Substack MCP is read-only;
use the installed unofficial MCP or its `substack-mcp` CLI for writes.

## Select and check

- Follow the requested selection. For latest posts, sort frontmatter `pubDate`
  descending and exclude `draft: true`; filenames do not indicate recency.
- Use frontmatter `title`, `description`, `slug`, and `tags` as the source of
  truth. Use `description` as the Substack subtitle. Preserve tag names exactly,
  including underscores such as `coding_agent`.
- Default to public, web-only copies. Email subscribers only when explicitly
  requested. A request to prepare drafts or change metadata does not itself
  authorize publication. Honor publishing authorization already in the task.
- Verify the signed-in handle, publication subdomain, and publishing role before
  writes. The package selects the first administered publication automatically;
  stop if it selects a publication other than `gianpaj`.
- List published posts, drafts, and scheduled posts, following pagination.
  Match by slug, original-source link, and title to avoid duplicates. Reuse a
  matching task draft; do not overwrite unrelated drafts or live content.

## Connect

Check `substack-mcp --version`, `substack-mcp status`, and
`substack-mcp tools --json`. Inspect the installed schema and implementation
when needed; these unofficial endpoints can change.

If missing, install with `uv tool install substack-api-mcp`. Use the installed
executable for MCP configuration; registration alone does not verify a working
connection. Verify initialization and tool listing without making live writes.

A saved session works without browser automation. To connect a local signed-in
Chrome, enable remote debugging at `chrome://inspect/#remote-debugging`, run
`substack-mcp connect`, and approve Chrome's connection prompt.

For a session on another computer, ask for the `substack.sid` cookie through the
host's private secret input. In Chrome it is under Developer Tools → Application
→ Cookies → `https://substack.com`. The CLI's `connect --token` prompt calls it
`auth_token`, but the Substack cookie name is `substack.sid`.

Read private input from its secret file inside the command, without printing
it or putting it in command arguments. The package's `session.from_token()` and
`session.save()` save it to `~/.config/substack-api-mcp/session.json` with mode
`0600`. Keep credentials outside the repository and generated article files.

If Substack returns `reauthentication_required`, stop the failed operation and
read the post's state. A session accepted for drafting can still require fresh
verification to publish. Request a fresh session after a new sign-in on the
user's working computer, or let the user finish publication there. Resume from
saved IDs after authentication; do not recreate drafts or repeatedly retry the
same credentials. Report what remains unpublished.

## Prepare the article

- Copy the complete MDX body without frontmatter or `{/* more */}`. The marker
  limits the homepage excerpt, not the cross-post's content.
- Preserve wording, headings, lists, quotes, links, code blocks, and images.
  Do not editorially rewrite the article as part of cross-posting.
- Add a short original-publication link and date. Derive the URL using the live
  mechanism in `src/utils/post-path.ts`; do not guess the date-path format.
- Resolve root-relative image and link URLs against `https://gian.cool`.
  Resolve fragment links against the original article unless the corresponding
  Substack anchor is verified. Check referenced assets are publicly accessible.
- Convert HTML images to Markdown images. For unsupported image formats, use a
  supported asset if one exists, or retain a link to the original image.
- The package's Markdown converter supports basic formatting, images, and code
  blocks. It does not support tables or arbitrary MDX components. Convert tables
  to labeled lists while retaining every cell. Replace interactive demos and
  unsupported embeds with descriptive links; retain an existing YouTube watch
  link rather than duplicating it. Flag any content that cannot transfer.
- Save prepared payloads and non-secret receipts in a task temporary directory.
  Record source path, Substack post ID, edit URL, and intended slug so a partial
  run can resume without duplicating posts.

## Create or update the draft

Use `create_draft` with `title`, `subtitle`, `body_markdown`, and
`audience="everyone"`, or `update_draft` for an existing task draft. The latter
accepts `fields` as a JSON object encoded in a string, and replaces the whole
body when `body_markdown` is supplied.

Set `should_send_email=false` on each draft before publication. The package's
`substack.publishing.set_options` performs this save while retaining content,
bylines, audience, and the selected section. Select the main section unless the
user requests another. Read the draft back and verify the saved email setting.

Apply metadata before publishing:

1. Use `list_post_tags` to reuse existing tags, `create_post_tag` for missing
   names, then `tag_post` with the post and tag IDs. Metadata-only requests must
   preserve existing article content and publication state.
2. Set the frontmatter slug with the publication-scoped API request
   `PUT /api/v1/drafts/{post_id}` and JSON body `{"slug":"the-frontmatter-slug"}`.
   The MCP's `update_draft` tool does not accept a slug. Use the package's
   authenticated `ToolContext` and `substack.client.call` for this partial
   update, retaining its host restrictions. Read back the slug and check that
   title, subtitle, body, audience, publication state, and email setting survive.
3. Substack uses `/p/{slug}`. Match the slug, not gian.cool's date folders. If
   the slug is already assigned to another post, inspect that post instead of
   inventing a suffix or overwriting it.

Compare the saved body with the prepared document using the package's
`substack.markdown.to_doc` and `substack.client.body_doc`. Verify code blocks
and image sources survive conversion. Do not treat draft creation as publication.

## Publish and verify

When publication is authorized, call `publish_post` with `post_id` and explicit
`send_email=false`. Its default is **true**. For an explicit email request, use
the requested delivery setting. Run the platform's prepublish check; the package
includes it in `publish_post`.

After each write, save the returned post ID and URL before continuing. On a
failure or timeout, read the post's state before retrying. For web-only posts,
verify `is_published=true`, the requested slug and content, and
`should_send_email=false`; check the public page is accessible. A successful
request or a draft editor link alone does not establish publication.

Report published URLs and delivery mode. If publication is blocked, give the
saved draft links and the specific remaining authentication step. For metadata
updates, report the saved tags and slugs without implying the posts are live.
