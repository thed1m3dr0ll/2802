// components/WorksGallery.tsx
import Image from "next/image";

const TOTAL_IMAGES = 9;

// work-01.webp ... work-09.webp
const images = Array.from({ length: TOTAL_IMAGES }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");
  return `/gallery/works/work-${num}.webp`;
});

export default function WorksGallery() {
  return (
    <section id="works" className="section section-dark section-animate">
      <div className="container-custom">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="label-small mb-2 text-[11px] text-club-muted md:text-[12px]">
            галерея клуба
          </p>
          <h2 className="mb-3 text-3xl font-semibold md:text-4xl">
            Кадры из ритуалов и жизни «Джентльменов Культуры»
          </h2>
          <p className="text-[13px] text-club-soft md:text-[14px]">
           Здесь просто кадры из сеансов: мужские стрижки, fade, аккуратные бороды и детали
            ритуалов в клубной атмосфере. Постоянные гости знают: по запросу в кресло можем
            посадить и их девушек — чтобы всем из вашей компании было комфортно смотреть в
            зеркало после визита.
          </p>
        </div>

        {/* Спокойная highlight‑сетка: один крупный блок + плитки */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {/* Крупный герой слева: занимает 2x2 на десктопе */}
          <figure className="group relative col-span-2 row-span-2 overflow-hidden rounded-3xl bg-black/40 shadow-[0_18px_40px_rgba(0,0,0,0.85)] h-52 md:h-[360px]">
            <div className="relative h-full w-full">
              <Image
                src={images[0]}
                alt="Работа клуба «Джентльмены Культуры»"
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw"
                className="
                  object-cover
                  transition-transform duration-400
                  group-hover:scale-[1.03]
                  brightness-[1.06] contrast-[1.08] saturate-[1.03]
                "
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,210,150,0.14),transparent_60%)] mix-blend-soft-light" />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-white/80">
              club
            </div>
          </figure>

          {/* Остальные кадры — ровные плитки */}
          {images.slice(1).map((src) => (
            <figure
              key={src}
              className="group relative h-40 overflow-hidden rounded-3xl bg-black/40 shadow-[0_14px_32px_rgba(0,0,0,0.8)] md:h-44"
            >
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt="Работа клуба «Джентльмены Культуры»"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="
                    object-cover
                    transition-transform duration-400
                    group-hover:scale-[1.03]
                    brightness-[1.06] contrast-[1.08] saturate-[1.03]
                  "
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,210,150,0.14),transparent_60%)] mix-blend-soft-light" />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
