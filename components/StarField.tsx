'use client';

import { useMemo, useState, useEffect } from 'react';

export default function StarField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo(() => {
    if (!mounted) return [];
    return [...Array(60)].map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            // @ts-ignore
            '--base-opacity': star.opacity,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
