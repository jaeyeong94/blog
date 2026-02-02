import Link from 'next/link';
import type { PostMetadata } from '@/lib/posts';

const getCategoryColor = (category: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    RUST: { bg: 'rgba(247, 76, 0, 0.15)', text: '#f97316' },
    GO: { bg: 'rgba(0, 173, 216, 0.15)', text: '#06b6d4' },
    FRONTEND: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981' },
    DEVOPS: { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa' },
    DATABASE: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' },
    LIFE: { bg: 'rgba(236, 72, 153, 0.15)', text: '#ec4899' },
  };
  return colors[category] || { bg: 'rgba(201, 168, 124, 0.15)', text: '#c9a87c' };
};

export default function PostCard({ post }: { post: PostMetadata }) {
  const categoryStyle = getCategoryColor(post.category);

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="paper-card p-5 cursor-pointer group">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: categoryStyle.bg,
                color: categoryStyle.text,
              }}
            >
              {post.category}
            </span>

            {post.featured && (
              <span className="px-2 py-1 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] font-semibold text-white">
                Featured
              </span>
            )}
          </div>

          <span className="text-xs text-[#5c5450] whitespace-nowrap">
            {new Date(post.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-[#f0ebe4] leading-snug mb-2 group-hover:text-[#c9a87c] transition-colors">
          {post.title}
        </h2>

        <p className="text-sm text-[#7a7068] leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[#5c5450]">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
          </div>
          
          <span className="text-xs text-[#c9a87c] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read article →
          </span>
        </div>
      </article>
    </Link>
  );
}
