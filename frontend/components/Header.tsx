// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEventHandler } from "react";
import { trackBookClick, trackPhoneClick } from "../lib/analytics";

const navItems = [
  { href: "/rituals", label: "Ритуалы" },
  { href: "/masters", label: "Мастера" },
  { href: "/stories", label: "Истории" },
  { href: "/cabinet", label: "Кабинет" },
];

type HeaderProps = {
  onBookClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ onBookClick }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    trackBookClick("header");
    if (onBookClick) onBookClick(event);
    setMobileOpen(false);
  };

  const handlePhoneClick = () => {
    trackPhoneClick("header");
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // закрывать мобильное меню при смене маршрута
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <div
        className={`flex items-center transition-colors duration-200 ${
          isScrolled
            ? "border-b border-[rgba(245,239,230,0.08)] bg-[rgba(10,6,4,0.96)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="relative flex w-full items-center justify-between px-3 py-1.5 md:px-6 md:py-3">
          <div className="pointer-events-none absolute inset-y-[-24px] left-[-120px] right-[55%] -z-10 bg-[radial-gradient(circle_at_5%_50%,rgba(247,78,40,0.55),transparent_70%)]" />

          {/* Логотип */}
          <Link
            href="/"
            className="logo-link flex items-center gap-2 md:gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full border border-[rgba(245,239,230,0.42)] bg-[#C13A32] md:h-[70px] md:w-[70px]">
              <div className="pointer-events-none absolute inset-[-45%] bg-[radial-gradient(circle_at_30%_0%,rgba(255,150,100,0.98),transparent_65%),radial-gradient(circle_at_80%_120%,rgba(255,80,60,0.85),transparent_60%)] opacity-95" />
              <Image
                src="/images/Logotip-bez-fona.svg"
                alt="Барбершоп‑клуб «Джентльмены Культуры»"
                width={64}
                height={64}
                className="relative h-[40px] w-[40px] object-contain drop-shadow-[0_0_18px_rgba(0,0,0,0.95)] md:h-[60px] md:w-[60px]"
                priority
              />
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-[10px] uppercase tracking-[0.22em] text-club-soft">
                gentlemen
              </span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-club-muted">
                barbershop club
              </span>
            </div>
          </Link>

          {/* Навигация — md+ */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] uppercase tracking-[0.22em] transition-colors lg:text-[14px] ${
                    isActive
                      ? "text-[var(--text-main)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-muted-strong)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Справа: язык, телефон и запись */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* переключатель языка — пока декоративный */}
            <div className="hidden items-center rounded-full border border-[rgba(245,239,230,0.12)] bg-[rgba(12,8,6,0.9)] px-2 py-1 lg:flex">
              <button
                type="button"
                className="px-2 text-[10px] uppercase tracking-[0.16em] text-[var(--text-main)]"
                data-lang="ru"
              >
                RU
              </button>
              <span className="mx-1 h-3 w-px bg-[rgba(245,239,230,0.14)]" />
              <button
                type="button"
                className="px-2 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]"
                data-lang="en"
              >
                EN
              </button>
            </div>

            <a
              href="tel:+79877553000"
              onClick={handlePhoneClick}
              className="hidden text-[12px] uppercase tracking-[0.2em] text-[var(--accent-gold-soft)] transition-colors hover:opacity-80 md:inline lg:text-[13px]"
            >
              +7 987 755 30 00
            </a>

            <button
              type="button"
              onClick={handleClick}
              className="hidden rounded-full border border-[rgba(245,239,230,0.32)] bg-[rgba(255,96,72,0.08)] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--text-main)] transition-colors hover:border-[rgba(245,239,230,0.5)] hover:bg-[rgba(255,96,72,0.16)] md:block md:px-5 md:py-2.5 md:text-[11px]"
            >
              записаться
            </button>

            {/* Бургер — только на мобилке */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(245,239,230,0.3)] bg-[rgba(10,6,4,0.9)] md:hidden"
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <span className="sr-only">Меню</span>
              <span
                className={`relative block h-[2px] w-4 bg-[var(--text-main)] transition-all before:absolute before:left-0 before:h-[2px] before:w-4 before:bg-[var(--text-main)] before:content-[''] after:absolute after:left-0 after:h-[2px] after:w-4 after:bg-[var(--text-main)] after:content-[''] ${
                  mobileOpen
                    ? "bg-transparent before:top-0 before:rotate-45 after:top-0 after:-rotate-45"
                    : "before:-top-[5px] after:top-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[56px] z-30 border-t border-[rgba(245,239,230,0.1)] bg-[rgba(5,3,7,0.98)] backdrop-blur-md md:hidden">
          <div className="container-custom py-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] ${
                      isActive
                        ? "bg-[rgba(255,255,255,0.06)] text-[var(--text-main)]"
                        : "text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 space-y-3 border-t border-[rgba(245,239,230,0.1)] pt-4">
              <a
                href="tel:+79877553000"
                onClick={handlePhoneClick}
                className="block text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold-soft)]"
              >
                +7 987 755 30 00
              </a>
              <button
                type="button"
                onClick={handleClick}
                className="w-full rounded-full border border-[rgba(245,239,230,0.32)] bg-[rgba(255,96,72,0.12)] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-main)]"
              >
                записаться в клуб
              </button>
            </div>
          </div>
        </div>
      )}

      {/* отступ под фиксированный хедер */}
      <div className="h-[56px] md:h-[76px]" />
    </header>
  );
}
