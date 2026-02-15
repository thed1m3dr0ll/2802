// components/home/HeroTopBar.tsx
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons/core-free-icons";

type Props = {
  onBookClick: () => void;
};

export function HeroTopBar({ onBookClick }: Props) {
  return (
    <section className="section-paper section-hero-top border-b border-[var(--card-border)]">
      <div className="container-custom flex flex-col gap-4 py-4 md:py-5 md:flex-row md:items-stretch md:justify-between">
        {/* Слева: адрес + оффер */}
        <div className="w-full md:max-w-xl">
          <p className="label-small text-[var(--text-muted)] flex items-center gap-2 mb-1">
            <HugeiconsIcon
              icon={Location01Icon}
              size={18}
              className="lux-icon"
            />
            <span className="text-[13px] md:text-[14px] text-[#1b1b1b] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              Нижний Новгород · Белозёрская, 4
            </span>
          </p>

          <h1 className="mt-1 text-[22px] leading-snug md:text-[30px] md:leading-snug font-semibold text-[var(--text-dark-strong)]">
            Барбершоп‑клуб «Джентльмены Культуры» в Нижнем Новгороде
          </h1>

          <div className="mt-3 inline-flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-[var(--accent-red)] bg-[var(--accent-red)] px-3 py-1 text-[12px] md:text-[13px] uppercase tracking-[0.16em] text-white">
              от 1 800 ₽
            </span>
            <span className="text-[13px] md:text-[14px] text-[var(--text-muted)]">
              мужские стрижки и борода в премиум‑формате
            </span>
          </div>
        </div>

        {/* Справа: CTA */}
        <div className="w-full md:w-auto flex flex-col md:items-end md:min-h-[120px]">
          <div className="flex flex-col gap-2 md:gap-1 mt-auto md:items-end">
            <button
              type="button"
              className="btn-primary w-full md:w-auto"
              onClick={onBookClick}
            >
              записаться онлайн
            </button>

            <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] md:text-right">
              Только по предварительной записи ·{" "}
              <a
                href="tel:+79877553000"
                className="text-[var(--accent-red)] hover:opacity-80 transition"
              >
                +7 987 755 30 00
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
