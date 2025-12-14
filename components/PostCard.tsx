import Link from 'next/link';
import type { PostMetadata } from '@/lib/posts';

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    RUST: '#f74c00',
    GO: '#00add8',
    FRONTEND: '#61dafb',
    DEVOPS: '#4caf50',
    DATABASE: '#336791',
  };
  return colors[category] || '#7eb8ff';
};

export default function PostCard({ post }: { post: PostMetadata }) {
  const categoryColor = getCategoryColor(post.category);

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="p-6 bg-bgCard rounded-xl border border-[rgba(126,184,255,0.08)] cursor-pointer transition-all hover:bg-bgCardHover hover:border-[rgba(126,184,255,0.2)] hover:-translate-y-0.5 group">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-md border flex items-center justify-center"
              style={{
                borderColor: `${categoryColor}40`,
                backgroundColor: `${categoryColor}15`,
              }}
            >
              <span
                className="font-mono text-[9px] font-semibold"
                style={{ color: categoryColor }}
              >
                {post.category.slice(0, 2)}
              </span>
            </div>

            {post.featured && (
              <div className="px-2.5 py-1 rounded bg-gradient-to-r from-amber-500 to-red-500 text-[10px] font-semibold text-white">
                FEATURED
              </div>
            )}
          </div>

          <span className="font-mono text-[11px] text-textDim">
            {new Date(post.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\. /g, '.').replace(/\.$/, '')}
          </span>
        </div>

        <h2 className="text-lg font-semibold leading-snug mb-2.5 text-text transition-colors group-hover:text-accent">
          {post.title}
        </h2>

        <p className="text-sm text-textMuted leading-relaxed mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-textDim font-mono">
            ◔ {post.readTime}
          </span>
          <span className="text-xs text-accent font-medium">
            Read →
          </span>
        </div>
      </article>
    </Link>
  );
}
