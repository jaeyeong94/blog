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
    <header className="sticky top-0 z-[100] bg-[#1a1816]/95 backdrop-blur-md border-b border-[#2a2725]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo - Text Only */}
        <Link href="/" className="group">
          <span className="text-lg font-bold text-[#f0ebe4] tracking-tight group-hover:text-[#c9a87c] transition-colors">
            불편하면 자세를 고쳐앉아
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/articles"
            className="px-4 py-2 text-[#9c9080] hover:text-[#f0ebe4] hover:bg-[#252220] rounded-lg text-sm font-medium transition-all"
          >
            Articles
          </Link>
          <Link
            href="/trend"
            className="px-4 py-2 text-[#9c9080] hover:text-[#f0ebe4] hover:bg-[#252220] rounded-lg text-sm font-medium transition-all"
          >
            Trend
          </Link>

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#201d1b] border border-[#2a2725] hover:border-[#3d3835] hover:bg-[#252220] transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#7a7068]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[#7a7068] text-sm">Search...</span>
            <kbd className="hidden lg:inline-flex px-1.5 py-0.5 rounded bg-[#2a2725] text-[10px] text-[#5c5450] font-mono border border-[#3d3835]">
              ⌘K
            </kbd>
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-[#9c9080] hover:bg-[#252220] rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} allPosts={allPosts} />
    </header>
  );
}
