import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: '불편하면 자세를 고쳐앉아',
  description: '개발하다 불편하면 자세를 고쳐앉아',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allPosts = getAllPosts();

  return (
    <html lang="ko">
      <body className="antialiased min-h-screen relative">
        <Header allPosts={allPosts} />
        <main className="relative z-[1] min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
