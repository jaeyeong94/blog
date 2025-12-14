import { getAllPosts, getAllCategories } from '@/lib/posts';
import Link from 'next/link';

export default function ArticlesPage() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  // 카테고리별로 포스트 그룹화
  const postsByCategory = categories.map(category => ({
    category,
    posts: allPosts.filter(post => post.category === category),
  }));

  const categoryColors: Record<string, string> = {
    RUST: '#f74c00',
    GO: '#00add8',
    FRONTEND: '#61dafb',
    DEVOPS: '#4caf50',
    DATABASE: '#336791',
  };

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-[36px] font-semibold mb-4">Articles</h1>
        <p className="text-textMuted text-base">
          카테고리별로 정리된 모든 글 ({allPosts.length}개)
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {postsByCategory.map(({ category, posts }) => {
          const categoryColor = categoryColors[category] || '#7eb8ff';

          return (
            <section key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-7 rounded"
                  style={{ backgroundColor: categoryColor }}
                />
                <h2 className="text-[24px] font-semibold">{category}</h2>
                <span className="text-sm text-textMuted">({posts.length})</span>
              </div>

              {/* Posts List */}
              <div className="space-y-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block p-4 bg-bgCard hover:bg-bgCardHover border border-[rgba(126,184,255,0.08)] rounded-lg transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium mb-1.5 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-textMuted line-clamp-1 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-bgElevated rounded text-[11px] text-textDim font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <time className="text-xs text-textMuted font-mono">
                          {new Date(post.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }).replace(/\. /g, '.').replace(/\.$/, '')}
                        </time>
                        <span className="text-xs text-textDim">{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
