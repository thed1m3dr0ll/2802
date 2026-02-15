// pages/landing.tsx
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { TimeScheduleIcon, Money02Icon, Target02Icon } from "hugeicons-react";

export default function LandingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookClick = () => {
    setIsBookingOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
  };

  const pageTitle =
    "Запись в барбершоп в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Запишитесь в барбершоп‑клуб «Джентльмены Культуры» в Нижнем Новгороде: мужская стрижка, борода и авторские ритуалы в спокойной клубной атмосфере.";
  const canonicalUrl = "https://gentlemenbarber.ru/landing";
  const ogImage = "https://gentlemenbarber.ru/og-image.jpg";

  return (
    <>
      <Head>
        {/* SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <Header onBookClick={handleBookClick} />

      <main className="bg-[var(--bg-main)] text-[var(--text-main)]">
        {/* HERO — один экран под «записаться» */}
        <section className="section pt-8 md:pt-16">
          <div className="container-custom grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
            <div className="space-y-5">
              <p className="label-small text-[var(--text-muted)]">
                барбершоп‑клуб в Нижнем Новгороде
              </p>
              <h1 className="text-[26px] md:text-[34px] font-semibold leading-tight">
                Мужская стрижка и борода в клубной атмосфере, без суеты и
                конвейера.
              </h1>
              <p className="text-[13px] md:text-[15px] text-[var(--text-muted)] max-w-xl">
                Запишитесь в барбершоп‑клуб «Джентльмены Культуры» на Белозёрской,
                4. Один визит — и у вас есть понятная стрижка, аккуратная борода
                и час тишины без лишних разговоров.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleBookClick}
                >
                  записаться в клуб
                </button>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Администратор перезвонит, уточнит удобное время и поможет
                  выбрать формат ритуала.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                <div className="inline-flex items-center gap-2">
                  <TimeScheduleIcon size={18} />
                  <span>Запись в удобное время, без ожидания в очереди</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Target02Icon size={18} />
                  <span>4+ ключевых ритуала: стрижка, борода, бритьё, уход</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-5 md:p-6 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                популярные ритуалы клуба
              </p>
              <ul className="space-y-3 text-[13px] text-[var(--text-main)]">
                <li className="flex items-center justify-between gap-3">
                  <span>Стрижка Gentlemen</span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--text-muted-strong)]">
                    <Money02Icon size={16} />
                    <span>1 800 ₽</span>
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Стрижка + борода</span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--text-muted-strong)]">
                    <Money02Icon size={16} />
                    <span>2 800 ₽</span>
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Королевское бритьё</span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--text-muted-strong)]">
                    <Money02Icon size={16} />
                    <span>2 200 ₽</span>
                  </span>
                </li>
              </ul>
              <p className="text-[11px] text-[var(--text-muted)]">
                Без скрытых доплат и навязанных услуг: все условия вы узнаете до
                записи.
              </p>
            </div>
          </div>
        </section>

        {/* Блок доверия / мини-отзывы */}
        <section className="section pt-6 md:pt-10">
          <div className="container-custom grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-3">
              <p className="label-small text-[var(--text-muted)]">
                почему выбирают клуб
              </p>
              <h2 className="text-[20px] md:text-[24px] font-semibold">
                Тихий мужской клуб, а не проходной барбершоп у ТРЦ.
              </h2>
              <p className="text-[13px] text-[var(--text-muted)]">
                В кресле не спешат и не навязывают «ещё один уход». Мастера
                работают по записи, уделяя час именно вам — без очередей и
                толпы вокруг.
              </p>
            </div>

            <div className="space-y-3 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-4 md:p-5 text-[13px]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)] mb-1">
                гости о клубе
              </p>
              <p className="leading-relaxed text-[var(--text-main)]">
                «Наконец нашёл место, где стригут как человеку, который ходит на
                работу, а не как герою из клипа. Плюс очень нравится, что никто
                не торопит — час в кресле воспринимаю как паузу от города».
              </p>
              <p className="mt-2 text-[11px] text-[var(--text-muted)]">
                Фрагмент отзыва с карты и соцсетей. Полные отзывы — на главной
                странице клуба.
              </p>
            </div>
          </div>
        </section>

        {/* Финальный CTA */}
        <section className="section pb-16 md:pb-20">
          <div className="container-custom text-center max-w-2xl">
            <h2 className="text-[20px] md:text-[24px] font-semibold mb-3">
              Оставьте заявку — администратор подберёт время и ритуал.
            </h2>
            <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] mb-6">
              Напишите, когда вам удобнее всего приходить и что хотите привести
              в порядок: стрижку, бороду или образ целиком. Остальное клуб
              возьмёт на себя.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleBookClick}
            >
              записаться в клуб
            </button>

            <p className="mt-3 text-[11px] text-[var(--text-muted)]">
              Или свяжитесь напрямую:&nbsp;
              <a
                href="tel:+79877553000"
                className="underline decoration-[rgba(255,255,255,0.32)] underline-offset-2 hover:text-[var(--accent-strong)]"
              >
                +7 (987) 755‑30‑00
              </a>
              &nbsp;или&nbsp;
              <a
                href="https://t.me/barberRomanChernov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[rgba(255,255,255,0.32)] underline-offset-2 hover:text-[var(--accent-strong)]"
              >
                Telegram
              </a>
              .
            </p>

            <p className="mt-4 text-[11px] text-[var(--text-muted)]">
              Если нужно больше информации о клубе, вы всегда можете перейти на{" "}
              <Link
                href="/"
                className="underline decoration-[rgba(255,255,255,0.32)] underline-offset-2 hover:text-[var(--accent-strong)]"
              >
                основную страницу
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
        initialContext={undefined}
      />
    </>
  );
}
