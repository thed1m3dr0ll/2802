// pages/club.tsx
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { useState } from "react";

export default function AboutPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookClick = () => setIsBookingOpen(true);
  const handleCloseModal = () => setIsBookingOpen(false);

  const pageTitle =
    "О барбершоп‑клубе в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Закрытый барбершоп‑клуб «Джентльмены Культуры» в Нижнем Новгороде: спокойный формат без потока, ритуалы вместо «услуг по прайсу» и мастера, которые говорят с гостями на одном языке.";
  const canonicalUrl = "https://gentlemenbarber.ru/about";
  const ogImage = "https://gentlemenbarber.ru/og-main.jpg";

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

      {/* HERO: тёмный клубный блок */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,#5b1412_0,#050307_60%)] opacity-80" />
        </div>

        <div className="container-custom relative z-10 grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="label-small text-club-muted">
              о барбершоп‑клубе Gentlemen
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              Клуб, в котором стрижка — только часть вечера.
            </h1>
            <p className="text-sm text-club-soft md:text-base">
              «Джентльмены Культуры» — это закрытый барбершоп‑клуб на
              Белозёрской, 4. Без поточного конвейера, случайных мастеров и
              ощущения, что вы «забежали по‑быстрому». Здесь нормальная мужская
              стрижка превращается в ритуал: час, когда можно вернуть себе
              голову и состояние.
            </p>
            <p className="text-sm text-club-soft md:text-base">
              Мы работаем в формате клубной записи: ограниченное количество
              кресел, удобные слоты и мастера, которые запоминают не только
              форму висков, но и то, как вы живёте день.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={handleBookClick}
              >
                записаться в клуб
              </button>
              <p className="text-xs text-club-soft">
                Если формат отзовётся, уже с первого визита можно закрепить
                «свою» стрижку и мастера.
              </p>
            </div>
          </div>

          {/* Фото hero — общий план клуба */}
          <div className="relative h-[260px] overflow-hidden rounded-3xl border border-[rgba(246,237,226,0.2)] bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.85)] md:h-[320px]">
            <Image
              src="/images/about-hero-club.jpg"
              alt="Вечерняя атмосфера барбершоп‑клуба «Джентльмены Культуры»"
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Как устроен визит */}
      <section className="section section-paper">
        <div className="container-custom grid gap-10 max-w-6xl md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <p className="label-small text-[var(--text-muted)]">
              как проходит визит
            </p>
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] md:text-3xl">
              От двери до зеркала — без суеты и спешки.
            </h2>
            <p className="text-sm text-[var(--text-muted)] md:text-base">
              В клуб приходят не «к одному конкретному мастеру», а в первую
              очередь в пространство. Свет, музыка, бар, кресла — всё работает
              на то, чтобы вы на час выдохнули и занялись собой, а не телефоном.
            </p>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li>
                <span className="font-medium text-[var(--text-dark-strong)]">
                  Встреча.
                </span>{" "}
                Вас встречает администратор, угощает напитком и помогает выбрать
                ритуал, если вы здесь впервые.
              </li>
              <li>
                <span className="font-medium text-[var(--text-dark-strong)]">
                  Разговор.
                </span>{" "}
                Вместо «как обычно?» — пара вопросов о том, как вы живёте,
                работаете, куда ходите и как укладываете волосы.
              </li>
              <li>
                <span className="font-medium text-[var(--text-dark-strong)]">
                  Ритуал.
                </span>{" "}
                Мытьё головы, стрижка, борода, бритьё — всё в одном сценарии,
                без навязанных «доп. услуг» и сюрпризов в чеке.
              </li>
              <li>
                <span className="font-medium text-[var(--text-dark-strong)]">
                  Финал.
                </span>{" "}
                Мастер показывает, как укладывать стрижку дома, и фиксирует
                форму, чтобы следующий визит стал логичным продолжением, а не
                новой лотереей.
              </li>
            </ul>
          </div>

          {/* Фото: деталь кресла/рабочего места */}
          <div className="relative h-[260px] overflow-hidden rounded-3xl border border-[rgba(0,0,0,0.08)] bg-[#0e0608] shadow-[0_22px_55px_rgba(0,0,0,0.6)] md:h-[320px]">
            <Image
              src="/images/about-chair-detail.jpg"
              alt="Рабочее место мастера в клубе «Джентльмены Культуры»"
              fill
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Кому подходит / кому нет */}
      <section className="section section-paper">
        <div className="container-custom max-w-6xl grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="label-small text-[var(--text-muted)]">
              кому точно подойдёт
            </p>
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] md:text-3xl">
              Если вы цените нормальную тишину и предсказуемый результат.
            </h2>
            <p className="text-sm text-[var(--text-muted)] md:text-base">
              К нам приходят предприниматели, специалисты, создатели проектов —
              люди, у которых нет времени объяснять одно и то же каждый месяц.
              Им важнее стабильный образ и спокойная голова.
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>— вы устали искать «свою» стрижку и «своего» мастера;</li>
              <li>
                — хотите, чтобы образ совпадал с тем, как вы живёте, а не с
                очередным трендом;
              </li>
              <li>— цените, когда в кресле можно помолчать без неловкости;</li>
              <li>
                — нормально относитесь к тому, что хороший результат — это
                процесс, а не разовый фокус.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="label-small text-[var(--text-muted)]">
              честно, кому может не зайти
            </p>
            <p className="text-sm text-[var(--text-muted)] md:text-base">
              Если нужен «быстрый машинкой за 15 минут» формат или всегда самое
              низкое предложение по цене в районе — клубный формат может не
              совпасть с ожиданиями.
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                — вы ищете максимально короткую запись «между делом» без диалога
                с мастером;
              </li>
              <li>
                — важнее всего «подешевле», а не качество и состояние после
                визита;
              </li>
              <li>
                — любите шумные тусовочные барбершопы с постоянной суетой в
                зале.
              </li>
            </ul>
            <p className="text-xs text-[var(--text-muted)]">
              Это нормально — у каждого свой формат. Клубные форматы существуют
              как раз для тех, кому ближе другой темп.
            </p>
          </div>
        </div>
      </section>

      {/* Команда / мастера */}
      <section className="section section-dark">
        <div className="container-custom max-w-6xl grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="label-small text-club-muted">мастера клуба</p>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Команда, которая отвечает не только за форму, но и за вечер.
            </h2>
            <p className="text-sm text-club-soft md:text-base">
              В клубе работают мастера, для которых стрижка — не потоковая
              работа на час, а ремесло, которым они живут. У каждого своя
              специализация: кто‑то сильнее в классике, кто‑то — в сложных
              бородах или бритье.
            </p>
            <p className="text-sm text-club-soft md:text-base">
              Важно другое: мы не спорим с вами за образ, а предлагаем решения
              и объясняем, что будет работать именно в вашей жизни. Именно
              поэтому многие гости просто говорят: «как в прошлый раз» — и
              получают предсказуемый результат.
            </p>
            <p className="text-sm text-club-soft">
              Познакомиться ближе с командой можно на странице{" "}
              <Link
                href="/masters"
                className="text-[var(--accent-gold-soft)] underline-offset-2 hover:underline"
              >
                «Мастера»
              </Link>
              .
            </p>
          </div>

          {/* Фото команды */}
          <div className="relative h-[260px] overflow-hidden rounded-3xl border border-[rgba(246,237,226,0.24)] bg-black/40 shadow-[0_24px_60px_rgba(0,0,0,0.9)] md:h-[320px]">
            <Image
              src="/images/about-team-soft.jpg"
              alt="Команда мастеров барбершоп‑клуба «Джентльмены Культуры»"
              fill
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="section section-dark border-t border-black/40">
        <div className="container-custom text-center max-w-3xl">
          <p className="label-small mb-3 text-club-muted">
            если формат отзывается
          </p>
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            Выберите ритуал — остальное сделает клуб.
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-club-soft md:text-base">
            Можно начать с привычной стрижки или сразу взять комплекс с бородой.
            Главное — обозначить задачу, остальное мы подстроим под ваш образ
            жизни, график и привычки.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="btn-primary"
              onClick={handleBookClick}
            >
              записаться в клуб
            </button>
            <Link
              href="/rituals"
              className="text-sm text-club-soft underline-offset-2 hover:underline"
            >
              посмотреть ритуалы клуба
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseModal} />
    </>
  );
}
