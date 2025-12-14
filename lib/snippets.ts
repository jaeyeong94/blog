import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const snippetsDirectory = path.join(process.cwd(), 'snippets');

export interface SnippetMetadata {
  slug: string;
  title: string;
  description: string;
  language: string;
  tags: string[];
  date: string;
}

export interface Snippet extends SnippetMetadata {
  content: string;
}

export function getAllSnippets(): SnippetMetadata[] {
  if (!fs.existsSync(snippetsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(snippetsDirectory);
  const snippets = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(snippetsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        language: data.language,
        tags: data.tags || [],
        date: data.date,
      };
    });

  return snippets.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getSnippetBySlug(slug: string): Snippet | null {
  try {
    const fullPath = path.join(snippetsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      language: data.language,
      tags: data.tags || [],
      date: data.date,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllLanguages(): string[] {
  const snippets = getAllSnippets();
  const languages = new Set(snippets.map((snippet) => snippet.language));
  return Array.from(languages).sort();
}
