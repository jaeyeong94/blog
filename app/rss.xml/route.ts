import RSS from 'rss';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog-mu-peach-16.vercel.app';
  
  const feed = new RSS({
    title: '불편하면 자세를 고쳐앉아',
    description: '개발하다 불편하면 자세를 고쳐앉아',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'ko',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const posts = getAllPosts();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/posts/${encodeURIComponent(post.slug)}`,
      categories: [post.category, ...post.tags],
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
