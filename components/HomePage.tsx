'use client';

import { useState } from 'react';
import type { PostMetadata } from '@/lib/posts';
import CategoryFilter from '@/components/CategoryFilter';
import PostCard from '@/components/PostCard';

interface HomePageProps {
  initialPosts: PostMetadata[];
  categories: string[];
}

export default function HomePage({ initialPosts, categories }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredPosts = activeCategory === 'ALL'
    ? initialPosts
    : initialPosts.filter(post => post.category === activeCategory);

  const featuredPost = initialPosts.find(post => post.featured);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-8">
        
        {/* Left Sidebar - Categories & Tags */}
        <aside className="hidden lg:block space-y-6">
          {/* Categories */}
          <div className="paper-card p-5">
            <h3 className="text-xs font-semibold text-[#7a7068] uppercase tracking-wider mb-4">
              Categories
            </h3>
            <nav className="space-y-1">
              {['ALL', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeCategory === cat
                      ? 'bg-[#b8956a] text-white font-medium'
                      : 'text-[#9c9080] hover:bg-[#252220] hover:text-[#f0ebe4]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Popular Tags */}
          <div className="paper-card p-5">
            <h3 className="text-xs font-semibold text-[#7a7068] uppercase tracking-wider mb-4">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Rust', 'Docker', 'AWS', 'React', 'Go'].map((tag) => (
                <a
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 bg-[#252220] rounded-md text-xs text-[#9c9080] font-medium cursor-pointer hover:bg-[#2a2725] hover:text-[#c9a87c] transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main>
          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-10">
              <div className="paper-card overflow-hidden">
                <div className="p-6 lg:p-8">
                  <span className="inline-block px-2 py-1 bg-[#d4a574]/20 text-[#d4a574] text-xs font-semibold rounded mb-4">
                    Featured
                  </span>
                  <h2 className="text-xl lg:text-2xl font-bold text-[#f0ebe4] mb-3 hover:text-[#c9a87c] transition-colors cursor-pointer">
                    <a href={`/posts/${featuredPost.slug}`}>{featuredPost.title}</a>
                  </h2>
                  <p className="text-[#9c9080] text-sm leading-relaxed mb-4 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#7a7068]">
                    <span>{featuredPost.date}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                    <span>·</span>
                    <span className="text-[#c9a87c]">{featuredPost.category}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Mobile Category Filter */}
          <div className="lg:hidden mb-6">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Posts Grid */}
          <section>
            <h2 className="text-lg font-semibold text-[#f0ebe4] mb-6">Latest Articles</h2>
            <div className="grid gap-5">
              {filteredPosts.map((post, idx) => (
                <div
                  key={post.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-16 text-[#7a7068]">
                  <p>아직 글이 없습니다.</p>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block space-y-6">
          {/* About */}
          <div className="paper-card p-5">
            <h3 className="text-xs font-semibold text-[#7a7068] uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-sm text-[#9c9080] leading-relaxed mb-3">
              안녕하세요, Ted입니다. 백엔드 개발자로 Rust, Go, 시스템 프로그래밍에 관심이 많습니다.
            </p>
            <p className="text-sm text-[#9c9080] leading-relaxed">
              이 블로그에서는 개발하면서 배운 것들, 기술적인 고민들, 그리고 가끔은 삶에 대한 생각도 나눕니다.
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://github.com/jaeyeong94" 
                target="_blank"
                className="text-xs text-[#c9a87c] hover:underline"
              >
                GitHub
              </a>
              <a 
                href="https://x.com/ted_ryu_o" 
                target="_blank"
                className="text-xs text-[#c9a87c] hover:underline"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Ad Placeholder */}
          <div className="paper-card p-5">
            <div className="aspect-[4/3] rounded-lg bg-[#252220] flex items-center justify-center border border-[#2a2725]">
              <span className="text-xs text-[#5c5450]">Ad Space</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
