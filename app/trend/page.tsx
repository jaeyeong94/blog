import { getAllPosts, getAllCategories } from '@/lib/posts';
import Link from 'next/link';

export default function TrendPage() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  // 카테고리별로 포스트 그룹화
  const postsByCategory = categories.map(category => ({
    category,
    posts: allPosts.filter(post => post.category === category),
  }));

  const categoryColors: Record<string, string> = {
    RUST: '#f97316',
    GO: '#06b6d4',
    FRONTEND: '#10b981',
    DEVOPS: '#a78bfa',
    DATABASE: '#60a5fa',
    LIFE: '#ec4899',
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#f0ebe4] mb-4">Trend</h1>
        <p className="text-[#9c9080]">
          트렌드 기술과 인사이트 ({allPosts.length}개)
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {postsByCategory.map(({ category, posts }) => {
          const categoryColor = categoryColors[category] || '#c9a87c';

          return (
            <section key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-1 h-7 rounded"
                  style={{ backgroundColor: categoryColor }}
                />
                <h2 className="text-xl font-semibold text-[#f0ebe4]">{category}</h2>
                <span className="text-sm text-[#7a7068]">({posts.length})</span>
              </div>

              {/* Posts List */}
              <div className="space-y-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block p-4 bg-[#201d1b] hover:bg-[#252220] border border-[#2a2725] rounded-lg transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-[#f0ebe4] mb-1.5 group-hover:text-[#c9a87c] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#7a7068] line-clamp-1 mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[#2a2725] rounded text-[11px] text-[#5c5450] font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <time className="text-xs text-[#7a7068] font-mono">
                          {new Date(post.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }).replace(/\. /g, '.').replace(/\.$/, '')}
                        </time>
                        <span className="text-xs text-[#5c5450]">{post.readTime}</span>
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
