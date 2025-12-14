'use client';

import { useState } from 'react';

interface CodeCopyButtonProps {
  code: string;
}

export default function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
        copied
          ? 'bg-accent/20 text-accent'
          : 'bg-transparent text-textMuted hover:text-accent hover:bg-bgElevated'
      }`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
