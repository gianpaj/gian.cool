import { toString } from "mdast-util-to-string";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";

/**
 * A remark plugin that extracts an excerpt from MDX/Markdown content.
 *
 * It looks for a separator and extracts everything before it.
 * Supports both Markdown and MDX syntax:
 *   - Markdown: <!-- more -->
 *   - MDX: {/- more -/} (use * instead of -)
 *
 * If no separator is found, it takes the first N characters of text content.
 *
 * The excerpt is rendered to HTML and stored in remarkPluginFrontmatter.excerptHtml
 */
export function remarkExcerpt(options = {}) {
  const maxLength = options.maxLength || 300;

  return function (tree, file) {
    let separatorIndex = -1;
    const excerptNodes = [];

    const hrHTML = '<hr data-excerpt-separator="true" aria-hidden="true" style="display:none">';

    // Find the separator: <!-- more --> (Markdown) or {/* more */} (MDX)
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];

      // Check for HTML comment <!-- more --> (Markdown)
      if (node.type === "html" && /<!--\s*more\s*-->/.test(node.value)) {
        separatorIndex = i;
        // Replace the comment with an hr marker for ExcerptOnly component
        tree.children[i] = {
          type: "html",
          value: hrHTML,
        };
        break;
      }

      // Check for raw HTML or comment nodes
      if (node.type === "raw" && /<!--\s*more\s*-->/.test(node.value)) {
        separatorIndex = i;
        // Replace the comment with an hr marker for ExcerptOnly component
        tree.children[i] = {
          type: "raw",
          value: hrHTML,
        };
        break;
      }

      // Check for MDX expression comment {/* more */}
      if (node.type === "mdxFlowExpression" && /^\s*\/\*\s*more\s*\*\/\s*$/.test(node.value)) {
        separatorIndex = i;
        // Replace the MDX comment with an hr marker for ExcerptOnly component
        // Use raw HTML node which works in both test and Astro MDX contexts
        tree.children[i] = {
          type: "html",
          value: hrHTML,
        };
        break;
      }
    }

    if (separatorIndex !== -1) {
      // Found separator - collect all nodes before it (excluding MDX imports/exports)
      for (let i = 0; i < separatorIndex; i++) {
        const node = tree.children[i];
        // Skip MDX-specific nodes that can't be rendered to plain HTML
        if (node.type !== "mdxjsEsm" && node.type !== "mdxJsxFlowElement") {
          excerptNodes.push(node);
        }
      }
    } else {
      // No separator found - extract first N characters worth of content
      let charCount = 0;

      for (const node of tree.children) {
        // Skip MDX-specific nodes
        if (node.type === "mdxjsEsm" || node.type === "mdxJsxFlowElement") {
          continue;
        }

        const nodeText = toString(node);
        const nodeLength = nodeText.length;

        if (charCount + nodeLength <= maxLength) {
          excerptNodes.push(node);
          charCount += nodeLength;
        } else {
          // This node would exceed the limit
          // For paragraphs, try to truncate
          if (node.type === "paragraph" && charCount < maxLength) {
            const truncated = truncateParagraphNode(node, maxLength - charCount);
            if (truncated) {
              excerptNodes.push(truncated);
            }
          }
          break;
        }
      }
    }

    // Convert excerpt nodes to HTML
    let excerptHtml = "";
    if (excerptNodes.length > 0) {
      try {
        // Create a temporary root node with excerpt children
        const excerptTree = {
          type: "root",
          children: excerptNodes,
        };

        // Convert MDAST to HAST (HTML AST)
        const hast = toHast(excerptTree);

        // Convert HAST to HTML string
        excerptHtml = toHtml(hast);
      } catch (err) {
        // Fallback to plain text if conversion fails
        excerptHtml = `<p>${toString({ type: "root", children: excerptNodes })}</p>`;
      }
    }

    // Store in frontmatter for access via remarkPluginFrontmatter
    file.data.astro = file.data.astro || {};
    file.data.astro.frontmatter = file.data.astro.frontmatter || {};
    file.data.astro.frontmatter.excerptHtml = excerptHtml;
    file.data.astro.frontmatter.hasMoreSeparator = separatorIndex !== -1;
  };
}

/**
 * Truncate a paragraph node to fit within the character limit
 */
function truncateParagraphNode(node, maxChars) {
  // Deep clone the node
  const cloned = JSON.parse(JSON.stringify(node));

  let charCount = 0;
  const truncatedChildren = [];

  for (const child of cloned.children || []) {
    if (child.type === "text") {
      const text = child.value || "";
      if (charCount + text.length <= maxChars) {
        truncatedChildren.push(child);
        charCount += text.length;
      } else {
        // Truncate this text node
        const remaining = maxChars - charCount;
        let truncated = text.slice(0, remaining);

        // Try to end at a word boundary
        const lastSpace = truncated.lastIndexOf(" ");
        if (lastSpace > remaining * 0.5) {
          truncated = truncated.slice(0, lastSpace);
        }

        // Add ellipsis
        truncatedChildren.push({
          type: "text",
          value: truncated + "…",
        });
        break;
      }
    } else {
      // For other inline nodes (strong, emphasis, links, etc.)
      const childText = toString(child);
      if (charCount + childText.length <= maxChars) {
        truncatedChildren.push(child);
        charCount += childText.length;
      } else {
        // Add ellipsis and stop
        truncatedChildren.push({
          type: "text",
          value: "…",
        });
        break;
      }
    }
  }

  cloned.children = truncatedChildren;
  return cloned;
}

export default remarkExcerpt;
