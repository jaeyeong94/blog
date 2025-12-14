'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'jaeyeong94/blog');
    script.setAttribute('data-repo-id', 'R_kgDOQoVCqQ');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOQoVCqc4CzwoU');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold mb-6">댓글</h3>
      <div ref={commentsRef} className="giscus" />
    </div>
  );
}
