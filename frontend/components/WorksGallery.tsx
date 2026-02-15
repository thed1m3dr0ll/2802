// components/WorksGallery.tsx
import Image from "next/image";

type WorkItem = {
  id: number;
  src: string;
  alt: string;
  label: string;
};

const WORKS: WorkItem[] = [
  {
    id: 1,
    src: "/images/works/work-01.jpg",
    alt: "Стрижка и укладка в клубе Gentlemen",
    label: "Классический fade и аккуратная борода",
  },
  {
    id: 2,
    src: "/images/works/work-02.jpg",
    alt: "Мужская стрижка с бородой",
    label: "Голова + борода, собранный образ",
  },
  {
    id: 3,
    src: "/images/works/work-03.jpg",
    alt: "Чистый контур и виски",
    label: "Чистый контур, виски и шея",
  },
  {
    id: 4,
    src: "/images/works/work-04.jpg",
    alt: "Ночной формат ритуала",
    label: "Ночной формат для своих",
  },
  {
    id: 5,
    src: "/images/works/work-05.jpg",
    alt: "Стрижка для гостьи клуба",
    label:
      "Только для своих: если вы гость клуба, можем посадить в кресло и вашу девушку — аккуратная стрижка в клубной атмосфере.",
  },
  {
    id: 6,
    src: "/images/works/work-06.jpg",
    alt: "Современная мужская стрижка",
    label: "Современная стрижка без крайностей",
  },
];

export default function WorksGallery() {
  return (
    <section id="works" className="section section-dark section-animate">
      <div className="container-custom">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="label-small text-club-muted mb-2">галерея работ</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            Как выглядят гости клуба после ритуалов
          </h2>
          <p className="text-club-soft text-sm md:text-base">
            Несколько живых примеров стрижек и бород без фильтров и чужих
            референсов — только реальные гости и их образы.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {WORKS.map((work) => (
            <figure
              key={work.id}
              className="card-dark hover-lift overflow-hidden"
            >
              <div className="relative w-full h-56">
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-xs text-club-soft">
                {work.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
