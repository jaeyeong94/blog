'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';
import type { PostMetadata } from '@/lib/posts';

interface HeaderProps {
  allPosts: PostMetadata[];
}

export default function Header({ allPosts }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <header className="sticky top-0 z-[100] bg-bg/[0.93] backdrop-blur-[20px] border-b border-[rgba(126,184,255,0.08)]">
      <div className="max-w-[1200px] mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5">
          <div
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-base"
            style={{
              background: 'linear-gradient(135deg, #7eb8ff 0%, #a78bfa 100%)',
              boxShadow: '0 0 24px rgba(126, 184, 255, 0.3)',
            }}
          >
            ◐
          </div>
          <div>
            <div className="text-[17px] font-semibold tracking-tight">
              Observatory
            </div>
            <div className="font-mono text-[10px] text-textMuted tracking-wide">
              TECH BLOG
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {['Articles', 'Snippets', 'About'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-textMuted hover:text-accent text-sm font-medium transition-colors"
            >
              {item}
            </Link>
          ))}

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-bgCard border border-[rgba(126,184,255,0.08)] hover:border-[rgba(126,184,255,0.2)] transition-colors cursor-pointer"
          >
            <span className="text-textDim text-sm">⌕</span>
            <span className="text-textDim text-[13px]">Search...</span>
            <span className="px-1.5 py-0.5 rounded bg-bgElevated text-[10px] text-textDim font-mono">
              ⌘K
            </span>
          </button>
        </nav>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} allPosts={allPosts} />
    </header>
  );
}
