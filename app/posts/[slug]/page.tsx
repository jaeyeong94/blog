import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import MDXContent from '@/components/MDXContent';
import Comments from '@/components/Comments';
import { extractTocFromMdx } from '@/lib/toc';
import ArticleLayout from '@/components/ArticleLayout';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });

  const tocItems = extractTocFromMdx(post.content);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/posts/${slug}`;

  const categoryColor = getCategoryColor(post.category);

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-10">
      <article className="animate-[fadeIn_0.5s_ease]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-5 text-[13px] text-textDim">
          <span className="cursor-pointer hover:text-accent">Articles</span>
          <span>/</span>
          <span className="text-textMuted">{post.category}</span>
        </div>

        {/* Header */}
        <header className="mb-9">
          <div className="flex items-center gap-2.5 mb-4.5">
            <span
              className="px-3 py-1.5 rounded border font-mono text-[11px] font-medium"
              style={{
                backgroundColor: `${categoryColor}15`,
                borderColor: `${categoryColor}30`,
                color: categoryColor,
              }}
            >
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1.5 bg-accent/10 rounded text-[11px] text-accent font-medium">
                Deep Dive
              </span>
            )}
          </div>

          <h1 className="text-[32px] font-semibold leading-tight mb-4.5 tracking-tight">
            {post.title}
          </h1>

          <p className="text-base text-textMuted leading-relaxed mb-5">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 py-3.5 border-t border-b border-[rgba(126,184,255,0.08)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-bgElevated flex items-center justify-center text-sm">
                👨‍💻
              </div>
              <span className="text-sm font-medium">Ted</span>
            </div>

            <div className="w-px h-6 bg-[rgba(126,184,255,0.08)]" />

            <div className="flex gap-3 text-[13px] text-textMuted font-mono">
              <span>
                {new Date(post.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).replace(/\. /g, '.').replace(/\.$/, '')}
              </span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <ArticleLayout
          tocItems={tocItems}
          postTitle={post.title}
          postUrl={postUrl}
        >
          {/* Content */}
          <div className="text-base leading-relaxed text-text">
            <MDXContent source={mdxSource} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-5 border-t border-[rgba(126,184,255,0.08)]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-bgCard rounded border border-[rgba(126,184,255,0.08)] text-xs text-textMuted font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="mt-10 p-6 bg-bgCard rounded-xl border border-[rgba(126,184,255,0.08)] flex gap-4">
            <div className="w-14 h-14 rounded-full bg-bgElevated flex items-center justify-center text-2xl flex-shrink-0">
              👨‍💻
            </div>
            <div>
              <div className="text-[15px] font-semibold mb-1">Ted</div>
              <p className="text-[13px] text-textMuted leading-relaxed mb-2.5">
                Backend Engineer. Rust, Go, 시스템 프로그래밍에 관심이 많습니다.
              </p>
              <div className="flex gap-3 text-[13px] text-accent">
                <span className="cursor-pointer hover:underline">GitHub</span>
                <span className="cursor-pointer hover:underline">Twitter</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <Comments />
        </ArticleLayout>
      </article>
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    RUST: '#f74c00',
    GO: '#00add8',
    FRONTEND: '#61dafb',
    DEVOPS: '#4caf50',
    DATABASE: '#336791',
  };
  return colors[category] || '#7eb8ff';
}
