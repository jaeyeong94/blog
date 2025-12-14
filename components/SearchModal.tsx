'use client';

import { useState, useEffect } from 'react';
import type { PostMetadata } from '@/lib/posts';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPosts: PostMetadata[];
}

export default function SearchModal({ isOpen, onClose, allPosts }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostMetadata[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, allPosts]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="bg-bgCard border border-[rgba(126,184,255,0.2)] rounded-xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(126,184,255,0.08)]">
          <span className="text-textDim text-lg">⌕</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent text-text text-base outline-none placeholder:text-textDim"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-bgElevated rounded text-xs text-textDim font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-5 py-8 text-center text-textMuted">
              No results found for "{query}"
            </div>
          )}

          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              onClick={onClose}
              className="block px-5 py-4 hover:bg-bgCardHover border-b border-[rgba(126,184,255,0.05)] transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-textDim bg-bgElevated px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-textDim">·</span>
                <span className="text-xs text-textDim">
                  {new Date(post.date).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <h3 className="text-base font-medium text-text mb-1 hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-textMuted line-clamp-1">
                {post.excerpt}
              </p>
            </Link>
          ))}

          {!query.trim() && (
            <div className="px-5 py-8 text-center text-textDim text-sm">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
