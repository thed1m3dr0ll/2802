// components/home/ShowcaseSection.tsx
import Image from "next/image";

export function ShowcaseSection() {
  return (
    <section
      id="cards"
      className="section section-paper section-y section-animate"
    >
      <div className="container-custom">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <p className="label-small text-[var(--text-muted)] mb-2">
            клубные подборки
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark-strong)] mb-3">
            Истории, ритуалы и рекомендации в одном месте
          </h2>
          <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
            Вместо длинного меню — три витрины, с которых проще всего начать
            знакомство с клубом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ShowcaseCard
            img="/images/club/detail-rituals.jpg"
            alt="Рабочее место барбера и инструменты"
            title="Ритуальная карта"
            text="Все форматы клубных ритуалов — от первого визита до ночного «Выключить голову»."
            cta="перейти к ритуалам"
            onClick={() => {
              window.location.href = "/rituals";
            }}
          />
          <ShowcaseCard
            img="/images/club/detail-stories.jpg"
            alt="Процесс стрижки в кресле"
            title="Истории гостей"
            text="Короткие сюжеты о том, зачем мужчины приходят в клуб и с чем уходят после ритуала."
            cta="читать истории"
            onClick={() => {
              window.location.href = "/stories";
            }}
          />
          <ShowcaseCard
            img="/images/club/detail-cabinet.jpg"
            alt="Уютный уголок клуба и полка с уходом"
            title="Клубный кабинет"
            text="История визитов, мастера и персональные рекомендации по уходу в одном личном кабинете."
            cta="войти в кабинет"
            onClick={() => {
              window.location.href = "/cabinet";
            }}
          />
        </div>
      </div>
    </section>
  );
}

type ShowcaseCardProps = {
  img: string;
  alt: string;
  title: string;
  text: string;
  cta: string;
  onClick: () => void;
};

function ShowcaseCard({
  img,
  alt,
  title,
  text,
  cta,
  onClick,
}: ShowcaseCardProps) {
  return (
    <article className="card-showcase hover-lift">
      <div className="card-showcase-media">
        <div className="relative w-full h-52 md:h-56">
          <Image
            src={img}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="image-hover object-cover"
          />
        </div>
      </div>
      <div className="card-showcase-body">
        <div>
          <h3 className="text-[14px] font-semibold tracking-[0.12em] uppercase">
            {title}
          </h3>
          <p className="card-showcase-text">{text}</p>
        </div>
        <button
          type="button"
          className="mt-4 text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
          onClick={onClick}
        >
          {cta}
        </button>
      </div>
    </article>
  );
}
