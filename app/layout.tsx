import type { Metadata } from 'next';
import './globals.css';
import StarField from '@/components/StarField';
import AmbientGlow from '@/components/AmbientGlow';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Observatory - Tech Blog',
  description: '기술의 깊은 곳을 탐험합니다',
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
        <StarField />
        <AmbientGlow />
        <Header allPosts={allPosts} />
        <main className="relative z-[1]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
