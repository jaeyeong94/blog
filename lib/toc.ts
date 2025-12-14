export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Slugifies a heading text to create an ID that matches rehype-slug behavior
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0080-\uFFFF-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Extracts Table of Contents items from MDX content
 * Matches h2 and h3 headings and generates IDs consistent with rehype-slug
 */
export function extractTocFromMdx(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const tocItems: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugify(text);

    tocItems.push({
      id,
      text,
      level,
    });
  }

  return tocItems;
}
