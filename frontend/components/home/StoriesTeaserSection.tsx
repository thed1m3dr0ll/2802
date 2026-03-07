// components/home/StoriesTeaserSection.tsx
import Image from "next/image";

export function StoriesTeaserSection() {
  return (
    <section className="section section-paper section-y section-animate">
      <div className="container-custom">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="label-small mb-2 text-[11px] text-[var(--text-muted)] md:text-[12px]">
            истории ритуалов и образов
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--text-dark-strong)] md:text-3xl">
            Ситуации, с которыми гости приходят в клуб
          </h2>
          <p className="text-[14px] text-[var(--text-muted)] md:text-[15px]">
            Первый визит, важная встреча или желание просто «выключить голову» —
            здесь несколько коротких историй, как ритуалы помогают собрать образ
            под конкретный день.
          </p>
        </div>

        <div className="flex justify-start md:justify-center gap-5 overflow-x-auto px-4 pb-2 -mx-4 md:mx-0 md:px-0">
          <StoryCard
            src="/images/stories/barbershop-story-first-visit.webp"
            alt="Мужская стрижка и борода в клубе"
            label="первый визит"
            title="«Собрать образ» перед важным днём"
            text="Обновили форму головы и бороды так, чтобы на следующий день было спокойно смотреть людям в глаза без стилиста рядом."
          />
          <StoryCard
            src="/images/stories/barbershop-story-night-ritual.webp"
            alt="Ночной клубный ритуал"
            label="ночной формат"
            title="«Выключить голову» после недели"
            text="Поздний слот в клубе: мягкий свет, больше времени на детали и общение, акцент не только на стрижке, но и на состоянии."
          />
          <StoryCard
            src="/images/stories/barbershop-story-clean-contour.webp"
            alt="Чистый контур"
            label="быстрый ритуал"
            title="«Чистый контур» вместо полной стрижки"
            text="Не трогали длину, только вернули аккуратные линии на висках и шее, чтобы снова чувствовать собранность в зеркале."
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
            onClick={() => {
              window.location.href = "/stories";
            }}
          >
            читать больше историй
          </button>
        </div>
      </div>
    </section>
  );
}

type StoryCardProps = {
  src: string;
  alt: string;
  label: string;
  title: string;
  text: string;
};

function StoryCard({ src, alt, label, title, text }: StoryCardProps) {
  return (
    <article className="group relative flex w-72 flex-none flex-col overflow-hidden rounded-2xl border border-[#e1d4c4]/70 bg-[#1b1410] shadow-[0_18px_40px_rgba(0,0,0,0.75)] transition-transform duration-200 hover:-translate-y-[2px]">
      <div className="relative h-44 w-full md:h-48">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 18rem, 16rem"
          className="
            h-full w-full object-cover
            transition-transform duration-300 group-hover:scale-[1.03]
            brightness-[1.05] contrast-[1.06] saturate-[1.03]
          "
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col items-center px-4 pb-4 pt-3 text-center bg-[#f5f1ea]/95">
        <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {label}
        </p>
        <h3 className="mb-1 text-[14px] font-semibold text-[var(--text-dark-strong)]">
          {title}
        </h3>
        <p className="text-[12px] text-[var(--text-muted)]">{text}</p>
      </div>
    </article>
  );
}
