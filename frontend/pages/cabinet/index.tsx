// @ts-nocheck
import { useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BookingModal from "../../components/BookingModal";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://gentlemenbarber.ru";

type Profile = {
  id: string;
  name: string;
};

type CabinetPageProps = {
  profile: Profile | null;
};

export default function CabinetPage({ profile }: CabinetPageProps) {
  const guestName = profile?.name || "Гость клуба";
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookClick = () => setIsBookingOpen(true);
  const handleCloseModal = () => setIsBookingOpen(false);

  const pageTitle = "Личный кабинет — Gentlemen Barbershop Club";
  const pageDescription =
    "Личный кабинет гостя Gentlemen Barbershop Club: история визитов, выбранные мастера, ритуалы, рекомендации по уходу и ближайшие записи в барбершопе на Белозёрской, 4.";
  const canonicalUrl = "https://gentlemenbarber.ru/cabinet";
  const ogImage = "https://gentlemenbarber.ru/og-cabinet.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Личный кабинет гостя Gentlemen Barbershop Club",
    url: canonicalUrl,
    description: pageDescription,
    about: {
      "@type": "BarberShop",
      name: "Барбершоп «Джентльмены Культуры»",
      url: "https://gentlemenbarber.ru/",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Белозёрская, 4",
        addressLocality: "Нижний Новгород",
        addressCountry: "RU",
      },
    },
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="личный кабинет барбершоп, история визитов gentlemen, мои мастера, рекомендации по уходу, клубный кабинет gentlemen"
        />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header onBookClick={handleBookClick} />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,#5b1412_0,#050307_60%)] opacity-80" />
        </div>

        <div className="container-custom relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-300">
              скоро
            </span>
            <p className="label-small text-club-muted">личный кабинет клуба</p>
          </div>

          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Место, где ваши визиты
            <br />
            складываются в историю.
          </h1>

          <div className="space-y-3 text-sm text-club-soft md:text-base">
            <p>
              Клуб — это не только кресло и зеркало, но и память о том, что уже
              было сделано: стрижки, бороды, удачные решения и мастера, к
              которым вы возвращаетесь.
            </p>
            <p>
              В личном кабинете хранятся ваши визиты, заметки мастеров,
              рекомендации по уходу и те самые варианты образа, к которым всегда
              можно вернуться.
            </p>
            <p className="text-[11px] text-club-soft/80">
              Сейчас кабинет работает как демонстрация возможностей. Логин и
              сохранение данных появятся после запуска клубной регистрации.
            </p>
          </div>
        </div>
      </section>

      {/* LAYOUT */}
      <section className="section section-paper">
        <div className="container-custom grid items-start grid-cols-1 gap-8 lg:grid-cols-[260px,1fr]">
          {/* SIDEBAR */}
          <aside className="space-y-4">
            <div className="card-paper-lifted space-y-2 p-5">
              <p className="label-small text-[var(--text-muted)]">профиль</p>
              <p className="text-sm font-semibold text-[var(--text-dark)]">
                {guestName}
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                Постоянный гость клуба. История посещений и рекомендации мастеров
                доступны только вам.
              </p>
              <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                Сейчас кабинет работает как демонстрация. После первого визита
                мы привяжем ваш профиль и откроем доступ к истории.
              </p>
            </div>

            <nav className="card-paper space-y-2 p-4 text-sm">
              <p className="mb-1 label-small text-[var(--text-muted)]">
                разделы кабинета
              </p>
              <button
                type="button"
                className="w-full rounded-md bg-[var(--text-dark)] px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.16em] text-white"
              >
                ближайшие визиты
              </button>
              <button
                type="button"
                className="w-full rounded-md px-3 py-2.5 text-left text-[13px] text-[var(--text-dark)] hover:bg-black/5"
              >
                История посещений
              </button>
              <button
                type="button"
                className="w-full rounded-md px-3 py-2.5 text-left text-[13px] text-[var(--text-dark)] hover:bg-black/5"
              >
                Мои мастера
              </button>
              <button
                type="button"
                className="w-full rounded-md px-3 py-2.5 text-left text-[13px] text-[var(--text-dark)] hover:bg-black/5"
              >
                Рекомендации по уходу
              </button>
              <button
                type="button"
                className="w-full rounded-md px-3 py-2.5 text-left text-[13px] text-[var(--text-dark)] hover:bg-black/5"
              >
                Настройки профиля
              </button>
            </nav>

            <div className="card-paper space-y-3 p-5 text-sm">
              <p className="label-small text-[var(--text-muted)]">
                ещё не с нами?
              </p>
              <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">
                Личный кабинет открывается после первого визита в клуб.
                Запишитесь на любой ритуал — и мы создадим профиль с вашими
                настройками.
              </p>
              <button
                type="button"
                className="btn-primary w-full"
                onClick={handleBookClick}
              >
                записаться в клуб
              </button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="space-y-6">
            {/* Ближайшие визиты */}
            <section className="card-paper-lifted space-y-4 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="label-small text-[var(--text-muted)]">
                    ближайшие визиты
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--text-dark)]">
                    Ваше расписание в клубе
                  </h2>
                </div>
                <button
                  type="button"
                  className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-dark)] hover:text-[var(--accent-red)]"
                  onClick={handleBookClick}
                >
                  открыть календарь
                </button>
              </div>

              <div className="rounded-xl border border-dashed border-[var(--text-muted)]/40 p-4 text-sm leading-relaxed text-[var(--text-muted)]">
                Пока в расписании пусто. Как только вы запишетесь на ритуал —
                здесь появится дата, время, мастер и формат вечера.
              </div>
            </section>

            {/* История посещений */}
            <section className="card-paper-lifted space-y-4 p-6">
              <div>
                <p className="label-small text-[var(--text-muted)]">
                  история посещений
                </p>
                <h2 className="text-lg font-semibold text-[var(--text-dark)]">
                  Как менялся ваш образ
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                  После каждого визита мы сохраняем важные детали: выбранный
                  ритуал, длину, форму, реакции волос на укладку и комментарии
                  мастера.
                </p>
                <div className="rounded-xl border border-dashed border-[var(--text-muted)]/40 p-4">
                  <p className="text-[13px]">
                    Здесь появятся ваши прошлые визиты: даты, мастера, ритуалы и
                    заметки. Это помогает не начинать каждый раз с нуля и
                    опираться на то, что уже «зашло».
                  </p>
                </div>
              </div>
            </section>

            {/* Мои мастера */}
            <section className="card-paper-lifted space-y-4 p-6">
              <div>
                <p className="label-small text-[var(--text-muted)]">
                  мои мастера
                </p>
                <h2 className="text-lg font-semibold text-[var(--text-dark)]">
                  Те, кому вы доверяете голову
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm leading-relaxed text-[var(--text-muted)] md:grid-cols-2">
                <div className="rounded-xl border border-dashed border-[var(--text-muted)]/40 p-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.18em]">
                    основной мастер
                  </p>
                  <p className="text-[13px]">
                    Как только вы начнёте регулярно ходить к одному человеку, он
                    появится здесь — вместе с быстрыми кнопками записи.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-[var(--text-muted)]/40 p-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.18em]">
                    другие мастера клуба
                  </p>
                  <p className="text-[13px]">
                    Если вы пробовали разных мастеров, кабинет запомнит, у кого
                    какие решения вам понравились, и подскажет варианты на
                    будущее.
                  </p>
                </div>
              </div>
            </section>

            {/* Рекомендации по уходу */}
            <section className="card-paper-lifted space-y-4 p-6">
              <div>
                <p className="label-small text-[var(--text-muted)]">
                  рекомендации по уходу
                </p>
                <h2 className="text-lg font-semibold text-[var(--text-dark)]">
                  Как поддерживать образ между визитами
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                  Мастера оставляют в кабинете короткие инструкции: чем мыть
                  голову, как сушить, чем укладывать и на что обратить внимание
                  именно с вашим типом волос.
                </p>
                <div className="rounded-xl border border-dashed border-[var(--text-muted)]/40 p-4 text-[13px]">
                  После визита здесь появятся рекомендации под ваш образ. Можно
                  открыть их утром перед рабочим днём — и вспомнить всё за 30
                  секунд.
                </div>
              </div>
            </section>
          </main>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark border-t border-black/40">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
            Хотите, чтобы у вашей стрижки была память?
          </h2>
          <p className="mb-6 text-sm text-club-soft md:text-base">
            Начните с первого визита. Дальше клуб возьмёт на себя историю
            образа, а личный кабинет станет местом, где всё это собрано в одном
            месте.
          </p>
          <button
            type="button"
            className="btn-primary mb-3"
            onClick={handleBookClick}
          >
            записаться в клуб
          </button>
          <p className="text-sm text-club-soft">
            или по телефону{" "}
            <a
              href="tel:+79877553000"
              className="text-[var(--accent-gold-soft)] transition-colors hover:opacity-80"
            >
              +7 987 755 30 00
            </a>
          </p>
          <p className="mt-3 text-[11px] text-club-soft">
            Личный кабинет в онлайне запускаем поэтапно. После вашего первого
            визита мы привяжем профиль и откроем доступ к истории образа.
          </p>
        </div>
      </section>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseModal} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;

  try {
    const res = await fetch(API_BASE + "/auth/profile", {
      method: "GET",
      headers: {
        cookie: req.headers.cookie || "",
      },
    });

    if (!res.ok) {
      return {
        redirect: {
          destination: "/cabinet/login",
          permanent: false,
        },
      };
    }

    const profile = await res.json();

    return {
      props: {
        profile,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/cabinet/login",
        permanent: false,
      },
    };
  }
}
