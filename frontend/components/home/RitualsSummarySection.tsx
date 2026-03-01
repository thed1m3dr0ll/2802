// components/home/RitualsSummarySection.tsx
type Props = {
  onBookWithRitual: (name: string) => void;
  onBookClick: () => void;
};

export function RitualsSummarySection({ onBookWithRitual, onBookClick }: Props) {
  return (
    <section
      id="club"
      className="section section-dark section-rug-photo section-y section-animate"
    >
      <div className="container-custom flex flex-col items-center">
        <div className="w-full max-w-3xl text-center mb-10 mx-auto">
          <p className="label-small text-club-muted mb-2">
            какие ритуалы живут в клубе
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-main-strong)]">
            Мужские стрижки и ритуалы для головы и бороды
          </h2>
          <p className="text-[15px] md:text-base max-w-2xl mx-auto text-[var(--text-main-soft)]">
            Первый визит, мужская стрижка, борода, аккуратный контур и ночной
            формат для своих — вместо длинного прайса только понятные форматы,
            которые действительно нужны гостям барбершопа «Джентльмены Культуры»
            на Белозёрской, 4.
          </p>
        </div>

        <div className="w-full max-w-lg space-y-6 mx-auto">
          <RitualCard
            label="первый визит · для первого визита действует скидка 10 %"
            title="«Собрать голову» — первая мужская стрижка в клубе"
            description="Ритуал для тех, кто приходит в клуб «Джентльмены Культуры» впервые или хочет собрать образ заново. Консультация, мужская стрижка, мытьё головы, укладка и понятные рекомендации, как носить новую форму без стилиста под боком."
            meta="от 1 500 ₽ · около 60 минут · мужская стрижка · для первого визита действует скидка 10 %"
            cta="выбрать этот ритуал"
            onClick={() => onBookWithRitual("Собрать голову")}
          />
          <RitualCard
            label="голова и борода"
            title="«Собрать образ» — стрижка и борода под один сценарий"
            description="Когда голова и борода живут разной жизнью. Мастер собирает всё в единый образ: мужская стрижка, моделирование бороды, форма, линии, длина и уход, чтобы зеркало радовало не только в день визита."
            meta="2 400 ₽ · около 90 минут · быстрый формат стрижка + борода"
            cta="выбрать этот ритуал"
            onClick={() => onBookWithRitual("Собрать образ")}
          />
          <RitualCard
            label="быстрый формат"
            title="«Чистый контур» — освежить линии без полной стрижки"
            description="Когда в целом всё устраивает, но поплыл край: виски, шея, борода. Небольшой ритуал, чтобы освежить контуры и вернуть ощущение собранности без радикальных изменений длины."
            meta="от 800 ₽ · 20 минут · коррекция контура"
            cta="выбрать этот ритуал"
            onClick={() => onBookWithRitual("Чистый контур")}
          />
          <RitualCard
            label="закрытый формат · для своих"
            title="«Выключить голову» — ночной клубный ритуал"
            description="Поздний ритуал для гостей, которые уже успели стать частью клуба. Больше времени, мягкий свет, бар и расширенный уход для головы и бороды, чтобы выйти не только с новой головой, но и с другим состоянием."
            meta="доступен гостям с историей 5+ визитов · детали и стоимость у администратора"
            cta="обсудить ночной ритуал"
            onClick={() => onBookWithRitual("Выключить голову")}
          />
        </div>

        <div className="mt-10 w-full max-w-lg text-center space-y-2 mx-auto">
          <p className="text-[14px] md:text-[15px] text-[var(--text-main-soft)]">
            Точные цены и свободные слоты можно уточнить у администратора или
            выбрать ритуал онлайн.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={onBookClick}
          >
            выбрать ритуал и записаться
          </button>
        </div>
      </div>
    </section>
  );
}

type RitualCardProps = {
  label: string;
  title: string;
  description: string;
  meta: string;
  cta: string;
  onClick: () => void;
};

function RitualCard({
  label,
  title,
  description,
  meta,
  cta,
  onClick,
}: RitualCardProps) {
  return (
    <article className="card-glass hover-lift px-6 py-6 ritual-card">
      <p className="label-small text-club-muted mb-2 text-left">{label}</p>
      <h3 className="text-lg font-semibold card-dark-title mb-2 text-left">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] card-dark-text mb-3 text-left">
        {description}
      </p>
      <p className="text-[13px] text-[var(--accent-gold-soft)] text-left">
        {meta}
      </p>
      <div className="mt-4">
        <button
          type="button"
          className="btn-primary-dark"
          onClick={onClick}
        >
          {cta}
        </button>
      </div>
    </article>
  );
}
