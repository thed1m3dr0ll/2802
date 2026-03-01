// components/home/StoriesTeaserSection.tsx
import Image from "next/image";

export function StoriesTeaserSection() {
  const openImage = (url: string) => {
    const img = new window.Image();
    img.src = url;
    const modal = window.open(url, "_blank", "noopener,noreferrer");
    if (!modal) {
      window.location.href = url;
    }
  };

  return (
    <section className="section section-paper section-y section-animate">
      <div className="container-custom">
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <p className="label-small text-[var(--text-muted)] mb-2">
            ДО и ПОСЛЕ · истории образов
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark-strong)] mb-3">
            Как меняется образ, когда есть свой клуб
          </h2>
          <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
            Реальные гости клуба «Джентльмены Культуры»: зачем приходили, какой
            ритуал выбрали и с чем ушли.
          </p>
        </div>

        <div className="flex justify-center overflow-x-auto gap-6 pb-2 -mx-4 md:mx-0 px-4 md:px-0">
          <StoryCard
            src="/images/stories/barbershop-story-first-visit.webp"
            alt="До и после: классическая мужская стрижка и борода"
            title="«Собрать образ» перед важной встречей"
            subtitle="Мастер: Елена · стрижка + борода, образ для переговоров."
            onClick={() =>
              openImage("/images/stories/barbershop-story-first-visit.webp")
            }
          />
          <StoryCard
            src="/images/stories/barbershop-story-night-ritual.webp"
            alt="Ночной клубный ритуал с баром и уходом"
            title="«Выключить голову» после сложной недели"
            subtitle="Мастер: Роман · ночной формат, расширенный уход и бар."
            onClick={() =>
              openImage("/images/stories/barbershop-story-night-ritual.webp")
            }
          />
          <StoryCard
            src="/images/stories/barbershop-story-clean-contour.webp"
            alt="Чистый контур бороды и висков"
            title="«Чистый контур» вместо полной стрижки"
            subtitle="Мастер: Максим · обновили линии, оставили длину."
            onClick={() =>
              openImage("/images/stories/barbershop-story-clean-contour.webp")
            }
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
            смотреть все истории
          </button>
        </div>
      </div>
    </section>
  );
}

type StoryCardProps = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  onClick: () => void;
};

function StoryCard({ src, alt, title, subtitle, onClick }: StoryCardProps) {
  return (
    <button
      type="button"
      className="gallery-item group flex-none w-64 md:w-72 h-80 md:h-80 rounded-2xl border border-[#e1d4c4]/60 bg-[#15110d] overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f3ee]"
      onClick={onClick}
      aria-label={`Открыть историю «${title}» крупнее`}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 18rem, 16rem"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="gallery-overlay absolute inset-0 flex flex-col items-center justify-end px-3 pb-4 md:pb-5 bg-gradient-to-t from-black/80 via-black/35 to-transparent text-white text-center transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-[13px] font-semibold mb-1 leading-snug tracking-[0.12em] uppercase text-white">
          {title}
        </h3>
        <p className="text-[12px] text-white/90 leading-snug">
          {subtitle}
        </p>
      </div>
    </button>
  );
}
