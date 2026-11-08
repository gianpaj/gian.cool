# Substack cross-post helper

The project skill uses a local helper for repeatable article conversion and
publication. The accepted scope covers preview, draft creation or updates,
metadata synchronization, explicit publishing, persistent receipts, cover images,
image uploads, and optional table images. Distribution and weekly growth review
belong in separate GitHub issues.

Use the repository's Markdown and frontmatter parsers for content preparation,
and the installed Python Substack package for authenticated requests. Keep
credentials in that package's session store. No second authentication system,
database, or background worker is needed.

Receipts live outside the repository, keyed by publication and source path.
Record intent before creating or publishing, save returned IDs immediately, and
read live state before retries. A content hash binds publication to the prepared
source. Refuse duplicate matches, concurrent mutations, staged live-content
updates, and publication after source changes until a draft is synchronized.

Preview is offline. Tests use a fake remote to cover interrupted operations and
content preservation. Live checks during implementation are read-only; adding
this helper does not authorize publishing the existing drafts.

Rejected: replacing the existing MCP, browser-driven default publishing, and a
local scheduling service. The installed transport covers this workflow, while
Substack owns scheduling and authentication requirements.

Verification: all 54 Vitest tests pass, including 22 helper tests. Biome checks
pass for the helper and its tests. The skill validator and production build
pass. Offline previews cover the latest three articles, including PNG tables.
Account identity and an existing post were read through the adapter. No live
Substack writes were performed while implementing the helper. Image upload and
publication use the pinned package/API contract and still need confirmation
through the first authorized live use.

Metadata updates preserve published content and historical email state. Tags
managed by receipts can be removed when omitted from source; unrelated existing
tags remain. Public-page verification uses an anonymous session.

Follow-up work: distribution and X integration in GitHub issue #30; weekly
growth review in issue #31.
