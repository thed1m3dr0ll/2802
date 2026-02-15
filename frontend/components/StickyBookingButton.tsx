// components/StickyBookingButton.tsx
import { useEffect, useState } from 'react';

type StickyBookingButtonProps = {
  onClick: () => void;
};

export default function StickyBookingButton({ onClick }: StickyBookingButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку, когда пользователь проскроллил вниз на 400px+
      const show = window.scrollY > 400;
      setIsVisible(show);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-3 z-[90] flex justify-center px-4 md:hidden pointer-events-none">
      <button
        type="button"
        onClick={onClick}
        className="pointer-events-auto inline-flex items-center justify-center w-full max-w-sm rounded-full bg-[var(--accent-red)] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
      >
        записаться в клуб
      </button>
    </div>
  );
}
