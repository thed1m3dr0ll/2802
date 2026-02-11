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

  // Подсветка скролла для хедера
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header">
      <div
        className={`${
          isScrolled ? 'site-header--scrolled' : ''
        } flex items-center`}
      >
        <div className="container-custom flex items-center justify-between py-4">
          {/* Логотип */}
          <Link href="/" className="logo-link mr-auto">
            <div className="relative h-10 w-10 rounded-full border border-[rgba(245,239,230,0.28)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-[#ff3232] blur-xl opacity-70 scale-110" />
              <img
                src="/images/Logotip-bez-fona.svg"
                alt="Barbershop Club Gentlemen"
                className="relative h-10 w-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] tracking-[0.26em] uppercase text-club-soft">
                gentlemen
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-club-muted">
                barbershop club
              </span>
            </div>
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Поиск + переключатель языка */}
          <div className="hidden lg:flex items-center gap-4 ml-6">
            <div className="search-wrapper">
              <input
                type="search"
                id="site-search"
                placeholder="Поиск по сайту…"
                aria-label="Поиск по сайту"
              />
              <button type="button" aria-label="Найти">
                🔍
              </button>
            </div>

            <div className="language-switcher">
              <button className="lang-btn active" data-lang="ru">
                RU
              </button>
              <button className="lang-btn" data-lang="en">
                EN
              </button>
            </div>
          </div>

          {/* Кнопка и телефон */}
          <div className="flex items-center gap-4 ml-4">
            <a
              href="tel:+79877553000"
              className="hidden md:inline text-[11px] tracking-[0.16em] uppercase text-[var(--accent-gold-soft)] hover:opacity-80 transition-colors"
            >
              +7 987 755 30 00
            </a>
            <button
              type="button"
              onClick={handleClick}
              className="btn-primary-dark text-[10px] px-5 py-2.5 book-btn"
            >
              записаться
            </button>
          </div>
        </div>
      </div>

      {/* отступ, чтобы контент не залез под фиксированный хедер */}
      <div className="h-[76px]" />
    </header>
  );
}
