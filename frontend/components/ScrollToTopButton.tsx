// components/ScrollToTopButton.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="
        fixed bottom-20 right-4 z-40
        flex items-center justify-center
        h-10 w-10 rounded-full
        border border-white/20
        bg-black/40 text-white
        backdrop-blur
        shadow-[0_10px_30px_rgba(0,0,0,0.6)]
        hover:bg-black/70 hover:border-white/40
        transition
      "
      aria-label="Прокрутить страницу вверх"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path
          d="M12 5L6 11M12 5l6 6M12 5v14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
