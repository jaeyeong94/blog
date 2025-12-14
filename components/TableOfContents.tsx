'use client';

import { TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="sticky top-20">
      <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-3">
        ON THIS PAGE
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm text-textMuted hover:text-accent transition-colors ${
                item.level === 3 ? 'pl-3.5 border-l border-[rgba(126,184,255,0.08)]' : ''
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
