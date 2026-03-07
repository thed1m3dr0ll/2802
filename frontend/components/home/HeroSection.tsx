// components/home/HeroSection.tsx
import { RefObject, useEffect, useState } from "react";

type Props = {
  onBookClick: () => void;
  firstButtonRef: RefObject<HTMLButtonElement>;
};

export function HeroSection({ onBookClick, firstButtonRef }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleScrollToManifest = () => {
    const target = document.querySelector("#manifest");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/#manifest";
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Фон: фото на всю секцию */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <img
          src="/images/club/hero.webp"
          alt="Интерьер барбершоп‑клуба Джентльмены Культуры"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Градиент справа под текст */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_left,rgba(5,3,7,0.9)_0%,rgba(5,3,7,0.7)_32%,rgba(5,3,7,0.22)_70%,rgba(5,3,7,0)_100%)]" />

      {/* Контент: текстовый столбец справа с анимацией появления */}
      <div className="container-custom relative z-10 flex min-h-[70vh] items-center py-16 md:py-20">
        <div
          className={`ml-auto max-w-xl space-y-6 text-right transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="inline-flex items-center justify-end gap-2 rounded-full border border-[rgba(191,37,37,0.55)] bg-[rgba(191,37,37,0.2)] px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
            <div className="flex flex-col text-right leading-tight">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-soft)] md:text-[11px]">
                Джентльмены Культуры
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-soft)] md:text-[11px]">
                Нижний Новгород
              </span>
            </div>
            <span className="h-2 w-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffe6c4_0,#f0b15b_40%,#7a3b18_100%)] shadow-[0_0_0_4px_rgba(240,177,91,0.32)] animate-pulse" />
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-[var(--text-main-strong)] md:text-4xl lg:text-[40px]">
            Частный{" "}
            <span className="text-[var(--accent-gold)]">барбер‑клуб</span>, где
            о тебе помнят —
            <br />
            а не просто <span className="text-[var(--accent-gold)]">стригут</span>
          </h1>

          <p className="ml-auto max-w-xl text-[15px] leading-relaxed text-[var(--text-soft)] md:text-base">
            Здесь не спрашивают «как обычно?» — здесь знают твой образ, подбирают
            решения под жизнь и график и собирают тебя в форму, когда город
            вокруг спешит.
          </p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end sm:gap-4">
            <button
              ref={firstButtonRef}
              type="button"
              className="group relative w-full overflow-hidden rounded-full border border-[rgba(245,239,230,0.3)] bg-[var(--accent-red)] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_rgba(0,0,0,0.85)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_26px_70px_rgba(0,0,0,0.95)] sm:w-auto"
              onClick={onBookClick}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.42),transparent)] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-full group-hover:opacity-100" />
              <span className="relative">записаться в клуб</span>
            </button>

            <button
              type="button"
              className="group w-full rounded-full border border-[rgba(245,239,230,0.3)] bg-[rgba(5,3,7,0.6)] px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--text-main-soft)] opacity-95 shadow-[0_14px_40px_rgba(0,0,0,0.85)] transition-all duration-250 ease-out hover:-translate-y-[2px] hover:border-[rgba(245,239,230,0.7)] hover:bg-[rgba(5,3,7,0.9)] sm:w-auto"
              onClick={handleScrollToManifest}
            >
              <span className="relative flex items-center justify-center gap-2">
                <span>манифест клуба</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(245,239,230,0.4)] text-[10px] transition-transform duration-200 group-hover:translate-x-[2px]">
                  →
                </span>
              </span>
            </button>
          </div>

          <p className="ml-auto max-w-md text-[13px] text-club-muted">
            Нижний Новгород, ул. Белозёрская, 4 · клуб 18+ для тех, кто ценит
            тишину, свои ритуалы и достойный сервис без показухи.
          </p>
        </div>
      </div>
    </section>
  );
}
