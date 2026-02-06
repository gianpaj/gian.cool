import { describe, it, expect } from "vitest";
import { remarkExcerpt } from "../remark-excerpt.mjs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";

/**
 * Helper function to process plain Markdown content (supports <!-- more --> comments)
 */
async function processMarkdown(content, options = {}) {
  const file = await unified().use(remarkParse).use(remarkExcerpt, options).use(remarkStringify).process(content);

  return {
    excerptHtml: file.data.astro?.frontmatter?.excerptHtml || "",
    hasMoreSeparator: file.data.astro?.frontmatter?.hasMoreSeparator || false,
  };
}

/**
 * Helper function to process MDX content (uses {/* more *\/} comments)
 */
async function processMdx(content, options = {}) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkExcerpt, options)
    .use(remarkStringify)
    .process(content);

  return {
    excerptHtml: file.data.astro?.frontmatter?.excerptHtml || "",
    hasMoreSeparator: file.data.astro?.frontmatter?.hasMoreSeparator || false,
  };
}

describe("remark-excerpt plugin", () => {
  describe("with <!-- more --> separator (Markdown)", () => {
    it("should extract content before the separator", async () => {
      const content = `
This is the excerpt content.

It has **bold** and *italic* text.

<!-- more -->

This should not be in the excerpt.
`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toContain("This is the excerpt content");
      expect(result.excerptHtml).toContain("<strong>bold</strong>");
      expect(result.excerptHtml).toContain("<em>italic</em>");
      expect(result.excerptHtml).not.toContain("This should not be in the excerpt");
    });

    it("should handle multiple paragraphs before separator", async () => {
      const content = `
First paragraph.

Second paragraph.

Third paragraph.

<!-- more -->

Fourth paragraph (not in excerpt).
`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toContain("First paragraph");
      expect(result.excerptHtml).toContain("Second paragraph");
      expect(result.excerptHtml).toContain("Third paragraph");
      expect(result.excerptHtml).not.toContain("Fourth paragraph");
    });

    it("should preserve links in excerpt", async () => {
      const content = `
Check out [this link](https://example.com) for more info.

<!-- more -->

More content here.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain('<a href="https://example.com">this link</a>');
    });

    it("should handle headings before separator", async () => {
      const content = `
## Introduction

This is the intro paragraph.

<!-- more -->

## Main Content

Details here.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain("<h2>Introduction</h2>");
      expect(result.excerptHtml).toContain("This is the intro paragraph");
      expect(result.excerptHtml).not.toContain("Main Content");
    });

    it("should handle code blocks before separator", async () => {
      const content = `
Here's some code:

\`\`\`javascript
const x = 1;
\`\`\`

<!-- more -->

More code after separator.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain("const x = 1");
      expect(result.excerptHtml).not.toContain("More code after separator");
    });

    it("should handle inline code in excerpt", async () => {
      const content = `
Use the \`console.log()\` function for debugging.

<!-- more -->

Advanced content here.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain("<code>console.log()</code>");
    });

    it("should handle lists before separator", async () => {
      const content = `
Things to know:

- Item one
- Item two
- Item three

<!-- more -->

More details below.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain("<li>Item one</li>");
      expect(result.excerptHtml).toContain("<li>Item two</li>");
      expect(result.excerptHtml).toContain("<li>Item three</li>");
      expect(result.excerptHtml).not.toContain("More details below");
    });

    it("should handle separator with extra whitespace", async () => {
      const content = `
Excerpt content here.

<!--   more   -->

After separator.
`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toContain("Excerpt content here");
      expect(result.excerptHtml).not.toContain("After separator");
    });

    it("should handle blockquotes before separator", async () => {
      const content = `
> This is a quote.
> It spans multiple lines.

<!-- more -->

After the separator.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain("<blockquote>");
      expect(result.excerptHtml).toContain("This is a quote");
    });

    it("should handle images before separator", async () => {
      const content = `
Here's an image:

![Alt text](https://example.com/image.png)

<!-- more -->

More content.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain('<img src="https://example.com/image.png"');
      expect(result.excerptHtml).toContain('alt="Alt text"');
    });

    it("should handle multiple separators (only first one counts)", async () => {
      const content = `
First excerpt part.

<!-- more -->

Middle content.

<!-- more -->

End content.
`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toContain("First excerpt part");
      expect(result.excerptHtml).not.toContain("Middle content");
      expect(result.excerptHtml).not.toContain("End content");
    });
  });

  describe("without separator (auto-truncation)", () => {
    it("should truncate long content to maxLength characters", async () => {
      const content = `
This is a paragraph with some text that will be counted. We need to make this long enough to exceed the default limit of 300 characters to test truncation properly.

Here is another paragraph with more text. It contains information that extends the total character count beyond what should be shown in the excerpt.

And a third paragraph that definitely should not appear in the truncated excerpt because we've exceeded the character limit by now.
`;

      const result = await processMarkdown(content, { maxLength: 100 });

      expect(result.hasMoreSeparator).toBe(false);
      // Should have some content
      expect(result.excerptHtml.length).toBeGreaterThan(0);
      // Should not contain content from later paragraphs
      expect(result.excerptHtml).not.toContain("third paragraph");
    });

    it("should include all content if under maxLength", async () => {
      const content = `
Short post.

That's all!
`;

      const result = await processMarkdown(content, { maxLength: 300 });

      expect(result.hasMoreSeparator).toBe(false);
      expect(result.excerptHtml).toContain("Short post");
      expect(result.excerptHtml).toContain("That's all!");
    });

    it("should add ellipsis when truncating mid-paragraph", async () => {
      const content = `
This is a very long paragraph that contains a lot of text and will definitely need to be truncated somewhere in the middle because it exceeds our character limit significantly.
`;

      const result = await processMarkdown(content, { maxLength: 50 });

      expect(result.excerptHtml).toContain("…");
    });

    it("should respect default maxLength of 300", async () => {
      // Create content that's about 500 characters
      const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10);
      const content = longText;

      const result = await processMarkdown(content);

      // The excerpt should be truncated, so not all content should be present
      expect(result.excerptHtml.length).toBeLessThan(longText.length);
    });
  });

  describe("MDX-specific handling", () => {
    it("should detect {/* more */} separator in MDX", async () => {
      const content = `
import SomeComponent from "./SomeComponent.tsx";

This is the excerpt content in MDX.

{/* more */}

This should not be in the excerpt.
`;

      const result = await processMdx(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toContain("This is the excerpt content in MDX");
      expect(result.excerptHtml).not.toContain("This should not be in the excerpt");
      expect(result.excerptHtml).not.toContain("import");
    });

    it("should skip MDX import statements in excerpt", async () => {
      // MDX without HTML comments (they're not valid in MDX)
      const content = `
import SomeComponent from "./SomeComponent.tsx";

This is the visible content.

More content after this.
`;

      const result = await processMdx(content, { maxLength: 100 });

      expect(result.excerptHtml).not.toContain("import");
      expect(result.excerptHtml).toContain("This is the visible content");
    });

    it("should skip JSX components in excerpt HTML", async () => {
      const content = `
Intro paragraph.

<MyChart client:load />

More content here.
`;

      const result = await processMdx(content, { maxLength: 200 });

      expect(result.excerptHtml).toContain("Intro paragraph");
      // JSX components should be skipped since they can't be rendered to static HTML
      expect(result.excerptHtml).not.toContain("<MyChart");
    });

    it("should handle mixed content with MDX and markdown", async () => {
      const content = `
import Chart from "./Chart.tsx";

# Welcome

This is the **intro** with a [link](https://example.com).

<Chart data={[1,2,3]} />

## Full Content

More details here.
`;

      const result = await processMdx(content, { maxLength: 150 });

      expect(result.excerptHtml).toContain("<h1>Welcome</h1>");
      expect(result.excerptHtml).toContain("<strong>intro</strong>");
      expect(result.excerptHtml).toContain('<a href="https://example.com">link</a>');
    });
  });

  describe("edge cases", () => {
    it("should handle empty content", async () => {
      const content = "";

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toBe("");
      expect(result.hasMoreSeparator).toBe(false);
    });

    it("should handle content with only separator", async () => {
      const content = `<!-- more -->`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toBe("");
    });

    it("should handle separator at the beginning", async () => {
      const content = `
<!-- more -->

All content is after the separator.
`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toBe("");
    });

    it("should handle whitespace-only content", async () => {
      const content = `


`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(false);
    });

    it("should handle content with only formatting", async () => {
      const content = `
**Bold text only**

<!-- more -->

Rest of the post.
`;

      const result = await processMarkdown(content);

      expect(result.hasMoreSeparator).toBe(true);
      expect(result.excerptHtml).toContain("<strong>Bold text only</strong>");
      expect(result.excerptHtml).not.toContain("Rest of the post");
    });

    it("should handle numbered lists", async () => {
      const content = `
Steps to follow:

1. First step
2. Second step
3. Third step

<!-- more -->

Details about each step.
`;

      const result = await processMarkdown(content);

      expect(result.excerptHtml).toContain("<ol>");
      expect(result.excerptHtml).toContain("<li>First step</li>");
      expect(result.excerptHtml).toContain("<li>Second step</li>");
      expect(result.excerptHtml).toContain("<li>Third step</li>");
      expect(result.excerptHtml).not.toContain("Details about each step");
    });
  });
});
