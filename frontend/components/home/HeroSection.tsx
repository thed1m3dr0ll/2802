// components/home/HeroSection.tsx
import { RefObject } from "react";

type Props = {
  onBookClick: () => void;
  firstButtonRef: RefObject<HTMLButtonElement>;
};

export function HeroSection({ onBookClick, firstButtonRef }: Props) {
  const handleScrollToRituals = () => {
    // мягкий скролл к секции ритуалов, если она на главной
    const target = document.querySelector("#rituals");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/rituals";
    }
  };

  return (
    <section
      id="hero"
      className="section section-dark section-y-lg relative overflow-hidden section-animate"
    >
      <div className="pointer-events-none hero-glow-layer absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-[#180405] via-[#050307] to-[#050307]" />
      </div>

      <div className="container-custom relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Левая колонка */}
        <div className="max-w-xl space-y-6">
          <p className="label-small text-club-muted">
            мужской барбершоп‑клуб · нижний новгород
          </p>

          <h1 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
            Закрытый мужской клуб стрижек и ритуалов для тех, кто ценит себя
          </h1>

          <p className="text-[15px] text-club-soft md:text-base">
            Атмосферный барбершоп‑клуб на Белозёрской, 4: тёмный зал, тёплый
            свет, мягкие кресла и мастера, которым можно доверить голову и
            бороду без оговорок.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              ref={firstButtonRef}
              type="button"
              className="btn-primary-dark w-full sm:w-auto"
              onClick={onBookClick}
            >
              ЗАПИСАТЬСЯ В КЛУБ
            </button>

            <button
              type="button"
              className="btn-secondary-dark w-full border border-[rgba(245,239,230,0.35)] text-[11px] uppercase tracking-[0.2em] text-[var(--text-main)] opacity-90 transition-colors hover:border-[rgba(245,239,230,0.6)] hover:bg-[rgba(245,239,230,0.06)] sm:w-auto"
              onClick={handleScrollToRituals}
            >
              смотреть ритуалы
            </button>
          </div>

          <p className="max-w-md text-[13px] text-club-muted">
            Ул. Белозёрская, 4 · пространство 18+ с уважением к личному времени
            и ритуалам гостей.
          </p>
        </div>

        {/* Правая колонка */}
        <div className="space-y-4">
          <figure className="card-dark overflow-hidden">
            <picture>
              <source
                srcSet="/images/club/club-main.webp"
                type="image/webp"
              />
              <img
                src="/images/club/club-main.jpg"
                alt="Интерьер барбершоп‑клуба Джентльмены Культуры на Белозёрской"
                className="hero-image"
                loading="lazy"
              />
            </picture>
            <figcaption className="sr-only">
              Интерьер барбершоп‑клуба Джентльмены Культуры на Белозёрской
            </figcaption>
          </figure>

          <div className="card-glass px-6 py-5">
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-x-6 text-[12px] uppercase tracking-[0.16em] text-club-muted">
                <div>клубный формат</div>
                <div className="text-right text-[var(--accent-gold)]">
                  only by
                </div>
                <div>только по записи</div>
                <div className="text-right text-[var(--accent-gold)]">
                  invitation
                </div>
              </div>
            </div>

            <div className="card-dark-text max-w-md space-y-2 text-[14px]">
              <p>
                — Камерное пространство с мягким светом, где можно спрятаться от
                города хотя бы на час.
              </p>
              <p>
                — Мастера с характером и вкусом, а не просто «свободная смена по
                графику».
              </p>
              <p>
                — Авторские ритуалы, в которых стрижка и борода — только часть
                общего сценария вечера.
              </p>
              <p>
                — Атмосфера клуба: помним по имени, истории и любимые детали
                вашего образа.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
