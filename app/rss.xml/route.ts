import RSS from 'rss';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const feed = new RSS({
    title: 'Observatory - Tech Blog',
    description: '기술의 깊은 곳을 탐험합니다',
    feed_url: 'https://yourdomain.com/rss.xml',
    site_url: 'https://yourdomain.com',
    language: 'ko',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const posts = getAllPosts();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://yourdomain.com/posts/${post.slug}`,
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
