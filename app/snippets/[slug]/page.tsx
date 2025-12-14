import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import { getAllSnippets, getSnippetBySlug } from '@/lib/snippets';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import MDXContent from '@/components/MDXContent';
import Link from 'next/link';

export async function generateStaticParams() {
  const snippets = getAllSnippets();
  return snippets.map((snippet) => ({
    slug: snippet.slug,
  }));
}

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snippet = getSnippetBySlug(slug);

  if (!snippet) {
    notFound();
  }

  const mdxSource = await serialize(snippet.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });

  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Rust: '#f74c00',
    Go: '#00add8',
    Python: '#3776ab',
    Shell: '#89e051',
  };

  const languageColor = languageColors[snippet.language] || '#7eb8ff';

  return (
    <div className="max-w-[800px] mx-auto px-8 py-10">
      <article className="animate-[fadeIn_0.5s_ease]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-5 text-[13px] text-textDim">
          <Link href="/snippets" className="hover:text-accent">
            Snippets
          </Link>
          <span>/</span>
          <span className="text-textMuted">{snippet.language}</span>
        </div>

        {/* Header */}
        <header className="mb-9">
          <div className="flex items-center gap-2.5 mb-4.5">
            <span
              className="px-3 py-1.5 rounded border font-mono text-[11px] font-medium"
              style={{
                backgroundColor: `${languageColor}15`,
                borderColor: `${languageColor}30`,
                color: languageColor,
              }}
            >
              {snippet.language}
            </span>
          </div>

          <h1 className="text-[32px] font-semibold leading-tight mb-4.5 tracking-tight">
            {snippet.title}
          </h1>

          <p className="text-base text-textMuted leading-relaxed mb-5">
            {snippet.description}
          </p>

          <div className="flex items-center gap-3 py-3.5 border-t border-b border-[rgba(126,184,255,0.08)]">
            <time className="text-[13px] text-textMuted font-mono">
              {new Date(snippet.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).replace(/\. /g, '.').replace(/\.$/, '')}
            </time>
          </div>
        </header>

        {/* Content */}
        <div className="text-base leading-relaxed text-text">
          <MDXContent source={mdxSource} />
        </div>

        {/* Tags */}
        {snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-5 border-t border-[rgba(126,184,255,0.08)]">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-bgCard rounded border border-[rgba(126,184,255,0.08)] text-xs text-textMuted font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10">
          <Link
            href="/snippets"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            ← Back to Snippets
          </Link>
        </div>
      </article>
    </div>
  );
}
