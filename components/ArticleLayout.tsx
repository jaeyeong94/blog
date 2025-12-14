'use client';

import { ReactNode } from 'react';
import { TocItem } from '@/lib/toc';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';

interface ArticleLayoutProps {
  children: ReactNode;
  tocItems: TocItem[];
  postTitle: string;
  postUrl: string;
}

export default function ArticleLayout({
  children,
  tocItems,
  postTitle,
  postUrl,
}: ArticleLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-14">
      <div>{children}</div>
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-5">
          <TableOfContents items={tocItems} />
          <ShareButtons title={postTitle} url={postUrl} />
        </div>
      </aside>
    </div>
  );
}
