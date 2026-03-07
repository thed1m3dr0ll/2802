// components/home/HeroTopBar.tsx
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons/core-free-icons";

type Props = {
  onBookClick: () => void;
};

export function HeroTopBar({ onBookClick }: Props) {
  return (
    <section className="section-paper section-hero-top border-b border-[var(--card-border)] bg-[var(--surface-elevated)]/96 backdrop-blur">
      <div className="container-custom py-4 md:py-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-2 md:gap-3 animate-[fadeInUp_0.9s_ease-out]">
          {/* Адрес как ссылка на Яндекс.Карты */}
          <a
            href="https://yandex.ru/maps/-/CPACVGjN"
            target="_blank"
            rel="noopener noreferrer"
            className="label-small inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(0,0,0,0.06)] bg-[rgba(255,255,255,0.6)] text-[var(--text-muted)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-400 hover:border-[rgba(191,37,37,0.45)] hover:bg-[rgba(255,255,255,0.96)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.16)]"
          >
            <HugeiconsIcon
              icon={Location01Icon}
              size={18}
              className="lux-icon text-[var(--accent-red)] transition-transform duration-400 group-hover:-translate-y-[1px]"
            />
            <span className="text-[13px] md:text-[14px] text-[#1b1b1b]">
              Нижний Новгород · ул. Белозёрская, 4
            </span>
          </a>

          {/* Заголовок */}
          <h1 className="mt-1 text-[20px] leading-snug md:text-[24px] md:leading-snug font-semibold text-[var(--text-dark-strong)]">
            Барбершоп‑клуб «Джентльмены Культуры» в Нижнем Новгороде
          </h1>

          {/* Краткий оффер */}
          <div className="mt-1 flex flex-col gap-1 text-[13px] md:text-[14px]">
            <p className="text-[var(--text-dark-strong)]">
              Мужские стрижки, борода и уход за образом.
            </p>
            <p className="text-[var(--text-dark)]">
              Стрижки от{" "}
              <span className="font-semibold text-[var(--accent-red)]">
                1 500 ₽
              </span>{" "}
              по записи, без очередей.
            </p>
          </div>

          {/* Телефон + компактный CTA */}
          <div className="mt-3 flex flex-col items-center gap-2 md:flex-row md:gap-3">
            <a
              href="tel:+79877553000"
              className="text-[14px] md:text-[15px] font-medium tracking-[0.06em] uppercase text-[var(--text-dark-strong)] whitespace-nowrap transition-colors duration-300 hover:text-[var(--accent-red)]"
            >
              +7 987 755 30 00
            </a>

            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(191,37,37,0.45)] bg-[rgba(191,37,37,0.08)] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-red)] shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-[rgba(191,37,37,0.9)] hover:bg-[rgba(191,37,37,0.2)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.32)] active:translate-y-0 active:shadow-[0_8px_24px_rgba(0,0,0,0.24)]"
            >
              выбрать время
            </button>
          </div>
        </div>
      </div>

      {/* Удлинённая анимация появления */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
          }
          40% {
            opacity: 0.6;
            transform: translate3d(0, 8px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
