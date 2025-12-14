import { getAllPosts, getAllCategories } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const allPosts = getAllPosts();
  const posts = allPosts.filter(post => post.category === category);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-[32px] font-semibold mb-3">
          {category}
        </h1>
        <p className="text-textMuted">
          {posts.length}개의 글
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post, idx) => (
          <div
            key={post.slug}
            style={{
              animation: `fadeInUp 0.5s ease ${idx * 0.08}s both`,
            }}
          >
            <PostCard post={post} />
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20 text-textMuted">
            <p>이 카테고리에 글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}
