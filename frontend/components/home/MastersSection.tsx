// components/home/MastersSection.tsx
import Image from "next/image";

type Props = {
  onBookWithMaster: (name: string) => void;
};

export function MastersSection({ onBookWithMaster }: Props) {
  return (
    <section
      id="masters"
      className="section section-paper section-y section-animate"
    >
      <div className="container-custom">
        <div className="mb-10 mx-auto max-w-3xl text-center">
          <p className="label-small mb-2 text-[var(--text-muted)]">
            совет клуба джентльмены культуры
          </p>
          <h2 className="mb-3 text-3xl font-semibold text-[var(--text-dark-strong)] md:text-4xl">
            Мастера барбершопа «Джентльмены Культуры» в Нижнем Новгороде
          </h2>
          <p className="text-[14px] text-[var(--text-muted)] md:text-[15px]">
            Не случайные мастера по графику, а команда с характером и вкусом. Вы
            выбираете не кресло — вы выбираете человека, которому готовы
            доверить голову и бороду.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MasterCard
            name="Елена"
            nameDative="Елене"
            role="ТОП барбер"
            img="/images/masters/elena.jpg"
            description="Видит детали, которые другие пропускают. Любит чистые формы, аккуратные переходы и естественную укладку, которую легко повторить дома."
            onClick={() => onBookWithMaster("Елена")}
          />
          <MasterCard
            name="Максим"
            nameDative="Максиму"
            role="ТОП барбер"
            img="/images/masters/maksim.jpg"
            description="Спокойный характер и уверенная рука. Делает современные стрижки и фейды без лишнего шоу, когда важнее результат, а не разговоры."
            onClick={() => onBookWithMaster("Максим")}
          />
          <MasterCard
            name="Алексей"
            nameDative="Алексею"
            role="ТОП барбер"
            img="/images/masters/aleksei.jpg"
            description="Отвечает за образ целиком: стрижка, борода, линии — чтобы всё собиралось в одну картинку без крайностей и перегибов."
            onClick={() => onBookWithMaster("Алексей")}
          />
          <MasterCard
            name="Роман"
            nameDative="Роману"
            role="арт‑директор клуба"
            img="/images/masters/roman.jpg"
            description="Отвечает за почерк клуба и сложные запросы. Настраивает форму под характер и образ жизни, курирует ночные форматы и обучает команду."
            onClick={() => onBookWithMaster("Роман")}
          />
        </div>
      </div>
    </section>
  );
}

type MasterCardProps = {
  name: string;
  nameDative: string;
  role: string;
  img: string;
  description: string;
  onClick: () => void;
};

function MasterCard({
  name,
  nameDative,
  role,
  img,
  description,
  onClick,
}: MasterCardProps) {
  const label = `ЗАПИСАТЬСЯ К ${nameDative.toUpperCase()}`;

  return (
    <article className="card-paper-lifted flex flex-col justify-between rounded-2xl border border-[var(--card-border)]/80 bg-[var(--paper-bg)] p-6 transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--accent-gold-soft)] hover:shadow-xl">
      <div className="mb-4 flex items-center gap-4 border-b border-[var(--card-border)] pb-4">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200 ring-1 ring-transparent transition-all duration-300 group-hover:ring-[var(--accent-gold-soft)]">
          <div className="relative h-full w-full">
            <Image
              src={img}
              alt={`${role} ${name}`}
              fill
              sizes="80px"
              className="master-photo object-cover"
            />
          </div>
        </div>
        <div>
          <p className="label-small text-[var(--text-muted-strong)]">{role}</p>
          <h3 className="text-lg font-semibold text-[var(--text-dark-strong)]">
            {name}
          </h3>
        </div>
      </div>
      <p className="mb-5 text-[14px] leading-relaxed text-[var(--text-dark)] md:text-[15px]">
        {description}
      </p>
      <button
        type="button"
        className="inline-flex items-center justify-center self-start whitespace-nowrap rounded-full border border-[var(--accent-red)] px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] transition-colors duration-200 hover:bg-[var(--accent-red)] hover:text-white"
        onClick={onClick}
      >
        {label}
      </button>
    </article>
  );
}
