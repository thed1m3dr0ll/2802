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
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original || "auto";
    };
  }, [mobileOpen]);

  const headerBase =
    "fixed inset-x-0 top-0 z-40 transition-all duration-200 ease-out";
  const headerScrolled =
    "bg-[rgba(10,6,4,0.96)]/95 backdrop-blur-md border-b border-[rgba(245,239,230,0.12)] shadow-[0_10px_40px_rgba(0,0,0,0.7)]";
  const headerTransparent =
    "bg-gradient-to-b from-[rgba(10,6,4,0.98)]/95 to-transparent";

  return (
    <header className="site-header">
      <div
        className={`${headerBase} ${
          isScrolled ? headerScrolled : headerTransparent
        }`}
      >
        <div className="container-custom flex h-[58px] items-center justify-between gap-3 md:h-[72px]">
          {/* Логотип + подпись */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[rgba(245,239,230,0.32)] bg-[#BF3730] shadow-[0_10px_25px_rgba(0,0,0,0.75)] transition-transform duration-200 hover:-translate-y-[1px] md:h-12 md:w-12"
            >
              <Image
                src="/images/Logotip-bez-fona.svg"
                alt="Барбершоп‑клуб «Джентльмены Культуры»"
                width={40}
                height={40}
                className="h-7 w-7 object-contain md:h-9 md:w-9"
                priority
              />
            </Link>

            <div className="hidden flex-col leading-tight md:flex">
              <span className="text-[10px] uppercase tracking-[0.22em] text-club-soft">
                gentlemen
              </span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-club-muted">
                barbershop club
              </span>
            </div>
          </div>

          {/* Навигация — md+ */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[12px] uppercase tracking-[0.2em] transition-colors lg:text-[13px] ${
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

          {/* Справа: телефон / CTA / бургер */}
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="tel:+79877553000"
              onClick={handlePhoneClick}
              className="hidden text-[12px] uppercase tracking-[0.2em] text-[var(--accent-gold-soft)] transition-opacity hover:opacity-80 md:inline lg:text-[13px]"
            >
              +7 987 755 30 00
            </a>

            <button
              type="button"
              onClick={handleClick}
              className="hidden rounded-full border border-[rgba(245,239,230,0.35)] bg-[rgba(255,96,72,0.14)] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--text-main)] shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all hover:-translate-y-[1px] hover:border-[rgba(245,239,230,0.6)] hover:bg-[rgba(255,96,72,0.2)] md:inline-flex md:px-5 md:py-2.5 md:text-[11px]"
            >
              записаться
            </button>

            {/* Бургер — только мобилка */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(245,239,230,0.3)] bg-[rgba(10,6,4,0.96)] md:hidden"
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
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Дроуэр под хедером */}
          <div className="fixed inset-x-0 top-[58px] z-40 border-t border-[rgba(245,239,230,0.1)] bg-[rgba(5,3,7,0.98)] backdrop-blur-md md:hidden">
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
                          : "text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-main)]"
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
                  className="w-full rounded-full border border-[rgba(245,239,230,0.32)] bg-[rgba(255,96,72,0.16)] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-main)]"
                >
                  записаться в клуб
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* отступ под фиксированный хедер */}
      <div className="h-[58px] md:h-[72px]" />
    </header>
  );
}
