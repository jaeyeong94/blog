'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="border-t border-[rgba(126,184,255,0.08)] pt-5">
      <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-3">
        SHARE THIS POST
      </h3>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleTwitterShare}
          className="w-full px-3 py-2 bg-bgCard hover:bg-bgCardHover border border-[rgba(126,184,255,0.08)] rounded text-sm text-textMuted hover:text-accent transition-colors text-left"
        >
          Twitter
        </button>
        <button
          onClick={handleLinkedInShare}
          className="w-full px-3 py-2 bg-bgCard hover:bg-bgCardHover border border-[rgba(126,184,255,0.08)] rounded text-sm text-textMuted hover:text-accent transition-colors text-left"
        >
          LinkedIn
        </button>
        <button
          onClick={handleCopyUrl}
          className={`w-full px-3 py-2 border rounded text-sm transition-colors text-left ${
            copied
              ? 'bg-accent/20 border-accent/30 text-accent'
              : 'bg-bgCard hover:bg-bgCardHover border-[rgba(126,184,255,0.08)] text-textMuted hover:text-accent'
          }`}
        >
          {copied ? '✓ URL Copied' : 'Copy URL'}
        </button>
      </div>
    </div>
  );
}
