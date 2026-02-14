// components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type MouseEventHandler } from 'react';

const navItems = [
  { href: '/rituals', label: 'Ритуалы' },
  { href: '/masters', label: 'Мастера' },
  { href: '/stories', label: 'Истории' },
  { href: '/cabinet', label: 'Кабинет' },
];

type HeaderProps = {
  onBookClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ onBookClick }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onBookClick) onBookClick(event);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <div
        className={`flex items-center transition-colors duration-200 ${
          isScrolled
            ? 'bg-[rgba(10,6,4,0.96)] backdrop-blur-md border-b border-[rgba(245,239,230,0.08)]'
            : 'bg-transparent'
        }`}
      >
        {/* full-width контейнер: логотип слева, навигация по центру (на десктопе), кнопки справа */}
        <div className="relative flex w-full items-center justify-between px-4 md:px-6 py-2.5 md:py-3.5">
          {/* широкая подсветка слева под логотипом */}
          <div className="pointer-events-none absolute inset-y-[-28px] left-[-120px] right-[55%] -z-10 bg-[radial-gradient(circle_at_5%_50%,rgba(247,78,40,0.55),transparent_70%)]" />

          {/* Логотип */}
          <Link href="/" className="logo-link flex items-center gap-3">
            <div className="relative h-[60px] w-[60px] md:h-[80px] md:w-[80px] rounded-full border border-[rgba(245,239,230,0.42)] flex items-center justify-center overflow-hidden bg-[#C13A32]">
              <div className="pointer-events-none absolute inset-[-45%] bg-[radial-gradient(circle_at_30%_0%,rgba(255,150,100,0.98),transparent_65%),radial-gradient(circle_at_80%_120%,rgba(255,80,60,0.85),transparent_60%)] opacity-95" />
              <img
                src="/images/Logotip-bez-fona.svg"
                alt="Barbershop Club Gentlemen"
                className="relative h-[52px] w-[52px] md:h-[70px] md:w-[70px] object-contain drop-shadow-[0_0_18px_rgba(0,0,0,0.95)]"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[11px] tracking-[0.26em] uppercase text-club-soft">
                gentlemen
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-club-muted">
                barbershop club
              </span>
            </div>
          </Link>

          {/* Навигация — md+ */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] lg:text-[14px] tracking-[0.22em] uppercase transition-colors ${
                    isActive
                      ? 'text-[var(--text-main)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-muted-strong)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Справа: язык, телефон и запись */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden lg:flex items-center rounded-full border border-[rgba(245,239,230,0.12)] bg-[rgba(12,8,6,0.9)] px-2 py-1">
              <button
                className="px-2 text-[10px] tracking-[0.16em] uppercase text-[var(--text-main)]"
                data-lang="ru"
              >
                RU
              </button>
              <span className="mx-1 h-3 w-px bg-[rgba(245,239,230,0.14)]" />
              <button
                className="px-2 text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]"
                data-lang="en"
              >
                EN
              </button>
            </div>

            <a
              href="tel:+79877553000"
              className="hidden md:inline text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[var(--accent-gold-soft)] hover:opacity-80 transition-colors"
            >
              +7 987 755 30 00
            </a>

            <button
              type="button"
              onClick={handleClick}
              className="rounded-full border border-[rgba(245,239,230,0.32)] bg-[rgba(255,96,72,0.08)] px-4 md:px-5 py-2.5 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[var(--text-main)] hover:bg-[rgba(255,96,72,0.16)] hover:border-[rgba(245,239,230,0.5)] transition-colors"
            >
              записаться
            </button>
          </div>
        </div>
      </div>

      {/* отступ под фиксированный хедер */}
      <div className="h-[64px] md:h-[72px]" />
    </header>
  );
}
