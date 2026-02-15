// components/home/FinalCtaSection.tsx
type Props = {
  onBookClick: () => void;
};

export function FinalCtaSection({ onBookClick }: Props) {
  return (
    <section
      id="contacts"
      className="section section-dark section-y-lg section-animate"
    >
      <div className="container-custom text-center max-w-2xl mx-auto">
        <p className="label-small text-club-muted mb-3">
          готовы зайти в клуб?
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Оставьте заявку — подберём время и ритуал под ваш вечер
        </h2>
        <p className="text-club-soft text-[14px] md:text-[15px] mb-6">
          Напишите или позвоните администратору, если сложно выбрать формат
          онлайн. Подскажем мастера, ритуал и время, чтобы первый визит сразу
          попал в точку.
        </p>

        <button
          type="button"
          className="btn-primary mb-3"
          onClick={onBookClick}
        >
          записаться онлайн
        </button>

        <p className="text-club-soft text-[14px]">
          или по телефону{" "}
          <a
            href="tel:+79877553000"
            className="text-[var(--accent-gold-soft)] hover:opacity-80 transition-colors"
          >
            +7 987 755 30 00
          </a>
        </p>
      </div>
    </section>
  );
}
