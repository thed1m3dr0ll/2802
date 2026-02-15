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
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="label-small text-[var(--text-muted)] mb-2">
            совет клуба джентльмены культуры
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-dark-strong)]">
            Мастера барбершопа «Джентльмены Культуры» в Нижнем Новгороде
          </h2>
          <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
            Не случайные мастера по графику, а команда с характером и вкусом. Вы
            выбираете не кресло — вы выбираете человека, которому готовы
            доверить голову и бороду.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MasterCard
            name="Елена"
            role="ТОП барбер"
            img="/images/masters/elena.jpg"
            description="Видит детали, которые другие пропускают. Любит чистые формы, аккуратные переходы и естественную укладку, которую легко повторить дома."
            onClick={() => onBookWithMaster("Елена")}
          />
          <MasterCard
            name="Максим"
            role="ТОП барбер"
            img="/images/masters/maksim.jpg"
            description="Спокойный характер и уверенная рука. Делает современные стрижки и фейды без лишнего шоу, когда важнее результат, а не разговоры."
            onClick={() => onBookWithMaster("Максим")}
          />
          <MasterCard
            name="Алексей"
            role="ТОП барбер"
            img="/images/masters/aleksei.jpg"
            description="Отвечает за образ целиком: стрижка, борода, линии — чтобы всё собиралось в одну картинку без крайностей и перегибов."
            onClick={() => onBookWithMaster("Алексей")}
          />
          <MasterCard
            name="Роман"
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
  role: string;
  img: string;
  description: string;
  onClick: () => void;
};

function MasterCard({ name, role, img, description, onClick }: MasterCardProps) {
  return (
    <article className="card-paper-lifted p-6 flex flex-col justify-between bg-[var(--paper-bg)] border border-[var(--card-border)]/80 rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--accent-gold-soft)]">
      <div className="border-b border-[var(--card-border)] pb-4 mb-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 ring-1 ring-transparent transition-all duration-300 group-hover:ring-[var(--accent-gold-soft)]">
          <div className="relative w-full h-full">
            <Image
              src={img}
              alt={`${role} ${name}`}
              fill
              sizes="80px"
              className="object-cover master-photo"
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
      <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--text-dark)] mb-5">
        {description}
      </p>
      <button
        type="button"
        className="inline-flex items-center justify-center self-start px-5 py-2.5 rounded-full border border-[var(--accent-red)] text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:text-white transition-colors duration-200"
        onClick={onClick}
      >
        записаться к {name.toLowerCase()}
      </button>
    </article>
  );
}
