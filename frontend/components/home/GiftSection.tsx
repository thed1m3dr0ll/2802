// components/home/GiftSection.tsx
import Image from "next/image";

type Props = {
  onBookClick: () => void;
};

export function GiftSection({ onBookClick }: Props) {
  return (
    <section className="section section-dark section-y section-animate">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="max-w-xl">
          <p className="label-small text-club-muted mb-2">
            подарок, который точно используют
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Подарочные сертификаты клуба «Джентльмены Культуры»
          </h2>
          <p className="text-club-soft text-[14px] md:text-[15px] mb-4">
            Сертификат на ритуал или сумму — спокойный способ подарить человеку
            время на себя: стрижка, борода, уход и клубная атмосфера вместо
            очередного сувенира.
          </p>
          <ul className="text-club-soft text-[14px] space-y-1 mb-5">
            <li>— Фиксированные номиналы или под конкретный ритуал.</li>
            <li>— Электронный вариант и плотная открытка в конверте.</li>
            <li>— Срок действия — 3 месяца с даты покупки.</li>
          </ul>
          <button
            type="button"
            className="btn-primary-dark"
            onClick={onBookClick}
          >
            оформить сертификат
          </button>
        </div>

        <div className="card-paper-lifted p-6">
          <div className="border border-[var(--card-border)] rounded-xl overflow-hidden bg-[var(--paper-bg)]">
            <div className="relative w-full h-64 md:h-72">
              <Image
                src="/images/club/gift-certificate-preview.jpg"
                alt="Подарочный сертификат клуба «Джентльмены Культуры»"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
