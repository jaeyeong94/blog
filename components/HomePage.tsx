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

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Left Column */}
        <div>
          {/* Hero */}
          <section className="mb-12 animate-[fadeInUp_0.6s_ease]">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-accent/10 rounded-md mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[11px] text-accent font-medium">
                EXPLORING THE DEPTHS
              </span>
            </div>

            <h1
              className="text-[42px] font-semibold leading-tight tracking-tight mb-5 bg-clip-text text-transparent bg-gradient-to-br from-text to-accent"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradientShift 6s ease infinite',
              }}
            >
              기술의 깊은 곳을<br />탐험합니다
            </h1>

            <p className="text-base text-textMuted leading-relaxed max-w-[460px]">
              복잡한 시스템의 본질을 파헤치고, 실무에서 바로 적용할 수 있는 인사이트를 공유합니다.
            </p>
          </section>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Posts */}
          <div className="flex flex-col gap-4">
            {filteredPosts.map((post, idx) => (
              <div
                key={post.slug}
                style={{
                  animation: `fadeInUp 0.5s ease ${idx * 0.08}s both`,
                }}
              >
                <PostCard post={post} />
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-textMuted">
                <p>아직 글이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <aside className="flex flex-col gap-5">
          {/* Newsletter */}
          <div className="p-6 bg-bgCard rounded-xl border border-[rgba(126,184,255,0.08)]">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-xl">
              ✉
            </div>

            <h3 className="text-[15px] font-semibold mb-2">
              뉴스레터
            </h3>
            <p className="text-[13px] text-textMuted mb-4 leading-relaxed">
              매주 엄선된 기술 인사이트를 받아보세요
            </p>

            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-3.5 py-3 rounded-md border border-[rgba(126,184,255,0.08)] bg-bg text-text text-[13px] mb-2.5 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />

            <button
              className="w-full py-3 rounded-md border-none bg-gradient-to-r from-accent to-purple-400 text-white text-[13px] font-semibold cursor-pointer"
              style={{
                boxShadow: '0 4px 16px rgba(126, 184, 255, 0.3)',
              }}
            >
              구독하기
            </button>
          </div>

          {/* Popular Tags */}
          <div className="p-5 bg-bgCard rounded-xl border border-[rgba(126,184,255,0.08)]">
            <h4 className="font-mono text-[11px] font-medium text-textDim mb-3.5">
              POPULAR TAGS
            </h4>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Docker', 'AWS', 'PostgreSQL', 'React', 'Rust', 'Go', 'K8s'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-bgElevated rounded text-xs text-textMuted font-mono cursor-pointer hover:text-accent transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
