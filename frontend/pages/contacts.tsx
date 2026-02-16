// pages/contacts.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { useState } from "react";
import { trackPhoneClick } from "../lib/analytics";

// Иконки
function IconPhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      className={`lux-icon ${props.className ?? ""}`}
    >
      <path
        d="M6 3h3l2 5-2 1c.5 1.5 1.5 2.5 3 3l1-2 5 2v3c0 .552-.448 1-1 1-8.284 0-15-6.716-15-15 0-.552.448-1 1-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTelegram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      className={`lux-icon ${props.className ?? ""}`}
    >
      <path
        d="M20.5 4.5L3.5 11.5l5 1.5 1.5 4.5 3-2.5 4 3.5 3.5-14.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconVk(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      className={`lux-icon ${props.className ?? ""}`}
    >
      <path
        d="M4 5c-.7 0-1 .5-1 1.2C3 13.4 7.1 19 13 19h2.2c.6 0 .9-.4.9-1v-1.6c0-.7.3-.8.7-.8.4 0 1.6.8 1.9 1.2.3.4.6.5 1 .5h1.5c.7 0 1-.4.9-1.1-.2-1-.9-1.9-1.9-2.7-.5-.5-1.3-.9-1.5-1.1-.3-.2-.2-.3 0-.6 0 0 2.6-3.6 2.8-4.8.1-.4 0-.7-.6-.7h-2.1c-.5 0-.7.2-.8.5-.5 1.4-1.8 3.3-2.3 3.7-.3.3-.5.2-.5-.2V6.3c0-.6-.2-1.1-.9-1.1H9.9c-.5 0-.8.3-.8.6 0 .6.9.7 1 2.3v2.6c0 .6-.3.7-.6.4C8.7 10 7.3 7.9 6.7 6.3 6.5 5.8 6.3 5.5 5.7 5.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function IconAddress(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      className={`lux-icon ${props.className ?? ""}`}
    >
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-5.5H10V21H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const pageTitle =
    "Контакты барбершоп‑клуба в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Барбершоп‑клуб «Джентльмены Культуры» в Нижнем Новгороде: адрес Белозёрская, 4, телефон для записи, часы работы и способы добраться до клуба.";
  const canonicalUrl = "https://gentlemenbarber.ru/contacts";
  const ogImage = "https://gentlemenbarber.ru/og-main.jpg";

  const handleBookClick = () => setIsBookingOpen(true);
  const handleCloseModal = () => setIsBookingOpen(false);

  const handleFooterPhoneClick = () => {
    trackPhoneClick("contacts_page");
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
      </Head>

      <Header onBookClick={handleBookClick} />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,#5b1412_0,#050307_60%)] opacity-80" />
        </div>

        <div className="container-custom relative z-10 grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="label-small text-club-muted">контакты клуба</p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              Как нас найти и записаться.
            </h1>
            <p className="text-sm text-club-soft md:text-base">
              Клуб «Джентльмены Культуры» находится в Нижнем Новгороде на
              Белозёрской, 4. Мы работаем по записи, чтобы у каждого гостя
              было своё время без очередей и суеты.
            </p>
            <div className="space-y-2 text-sm text-club-soft">
              <p>
                <span className="font-medium text-[var(--accent-gold-soft)]">
                  Адрес:
                </span>{" "}
                Нижний Новгород, ул. Белозёрская, 4, 1 этаж.
              </p>
              <p>
                <span className="font-medium text-[var(--accent-gold-soft)]">
                  Время работы:
                </span>{" "}
                ежедневно с 10:00 до 22:00 по предварительной записи.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="btn-primary-dark"
                onClick={handleBookClick}
              >
                записаться в клуб
              </button>
              <a
                href="tel:+79877553000"
                onClick={handleFooterPhoneClick}
                className="text-sm text-[var(--accent-gold-soft)] underline-offset-2 hover:underline"
              >
                позвонить администратору: +7 987 755 30 00
              </a>
            </div>
          </div>

          {/* Фото/обложка контактов */}
          <div className="relative h-[260px] overflow-hidden rounded-3xl border border-[rgba(246,237,226,0.2)] bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.85)] md:h-[320px]">
            <img
              src="/images/contacts-front-door.jpg"
              alt="Вход в барбершоп‑клуб «Джентльмены Культуры» на Белозёрской, 4"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Контакты + карта */}
      <section className="section section-paper">
        <div className="container-custom max-w-6xl grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
          {/* Левый столбец: контакты */}
          <div className="space-y-6">
            <div>
              <p className="label-small text-[var(--text-muted)]">
                основное для связи
              </p>
              <h2 className="text-2xl font-semibold text-[var(--text-dark)] md:text-3xl">
                Адрес, телефон и мессенджеры.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Адрес */}
              <div className="card-paper p-4">
                <p className="label-small text-[var(--accent-gold-soft)] mb-2">
                  адрес клуба
                </p>
                <div className="flex items-start gap-3 text-sm text-[var(--text-dark)]">
                  <IconAddress className="mt-0.5 h-6 w-6 text-[var(--accent-gold-soft)]" />
                  <div>
                    <p>Нижний Новгород</p>
                    <p>ул. Белозёрская, 4</p>
                    <p>1 этаж</p>
                  </div>
                </div>
              </div>

              {/* Время работы */}
              <div className="card-paper p-4">
                <p className="label-small text-[var(--accent-gold-soft)] mb-2">
                  время работы
                </p>
                <p className="text-sm text-[var(--text-dark)]">
                  Ежедневно с 10:00 до 22:00.
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Формат клубной записи: все визиты по предварительному
                  согласованию времени.
                </p>
              </div>
            </div>

            {/* Телефон и мессенджеры */}
            <div className="card-paper p-5 space-y-4">
              <p className="label-small text-[var(--accent-gold-soft)]">
                телефон и мессенджеры
              </p>

              <a
                href="tel:+79877553000"
                onClick={handleFooterPhoneClick}
                className="inline-flex items-center gap-2 text-[15px] text-[var(--text-dark-strong)] hover:text-[var(--accent-red)] transition-colors"
              >
                <IconPhone className="h-5 w-5 text-[var(--accent-gold-soft)]" />
                <span>+7 987 755 30 00</span>
              </a>
              <p className="text-xs text-[var(--text-muted)]">
                Если не нашли удобное время в онлайн‑записи, напишите или
                позвоните — администратор предложит варианты.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://t.me/barberRomanChernov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(18,18,18,0.18)] bg-[rgba(0,0,0,0.02)] px-3 py-1.5 text-[13px] text-[var(--text-dark)] hover:border-[var(--accent-gold-soft)] hover:bg-[rgba(245,239,230,0.4)] transition-colors"
                >
                  <IconTelegram className="h-4 w-4 text-[var(--accent-gold-soft)]" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://vk.ru/barbershop_gentlemen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(18,18,18,0.18)] bg-[rgba(0,0,0,0.02)] px-3 py-1.5 text-[13px] text-[var(--text-dark)] hover:border-[var(--accent-gold-soft)] hover:bg-[rgba(245,239,230,0.4)] transition-colors"
                >
                  <IconVk className="h-4 w-4 text-[var(--accent-gold-soft)]" />
                  <span>VK</span>
                </a>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary-dark"
                onClick={handleBookClick}
              >
                записаться онлайн
              </button>
              <a
                href="https://yandex.ru/maps/?text=Нижний%20Новгород%2C%20Белозёрская%2C%204"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-dark text-[13px]"
              >
                открыть маршрут в навигаторе
              </a>
            </div>
          </div>

          {/* Правый столбец: интерактивная карта */}
          <div className="space-y-4">
            <p className="label-small text-[var(--text-muted)]">
              карта клуба
            </p>
            <div className="card-paper overflow-hidden">
              <div className="relative h-[260px] bg-[#0b060a] md:h-[320px]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3AYOUR_ID_HERE&source=constructor"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="border-t border-[rgba(18,18,18,0.08)] px-4 py-3 text-[11px] text-[var(--text-muted)]">
                Можно открыть локацию в Яндекс.Картах и построить маршрут до
                клуба в один клик.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Как добраться */}
      <section className="section section-paper">
        <div className="container-custom max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[var(--text-dark)] md:text-3xl">
            Как добраться до клуба.
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-paper p-5 text-sm text-[var(--text-muted)]">
              <p className="label-small mb-2 text-[var(--accent-gold-soft)]">
                пешком
              </p>
              <p>
                Клуб находится в жилом квартале на Белозёрской. Ближайшие
                остановки общественного транспорта — в 3–5 минутах пешком.
              </p>
            </div>
            <div className="card-paper p-5 text-sm text-[var(--text-muted)]">
              <p className="label-small mb-2 text-[var(--accent-gold-soft)]">
                на машине
              </p>
              <p>
                Удобнее всего ориентироваться на адрес Белозёрская, 4. Парковка
                — вдоль улицы и во дворе, обычно вечером есть свободные места.
              </p>
            </div>
            <div className="card-paper p-5 text-sm text-[var(--text-muted)]">
              <p className="label-small mb-2 text-[var(--accent-gold-soft)]">
                если опаздываете
              </p>
              <p>
                Если понимаете, что не успеваете к началу ритуала, напишите или
                позвоните администратору — попробуем сдвинуть время или
                перенести визит.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseModal} />
    </>
  );
}
