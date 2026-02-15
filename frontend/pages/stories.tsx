// pages/stories.tsx
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

export default function StoriesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookClick = () => {
    setIsBookingOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
  };

  const pageTitle =
    "Истории гостей барбершопа в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Истории гостей барбершопа «Джентльмены Культуры» в Нижнем Новгороде: зачем мужчины приходят в клуб, какие ритуалы выбирают и с каким ощущением выходят из кресла на Белозёрской, 4.";
  const canonicalUrl = "https://gentlemenbarber.ru/stories";
  const ogImage = "https://gentlemenbarber.ru/og-main.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Истории гостей барбершопа «Джентльмены Культуры»",
    url: canonicalUrl,
    itemListElement: [
      {
        "@type": "CreativeWork",
        position: 1,
        name: "«Макушка, которую никто не любил»",
        description:
          "История первого визита с запросом решить проблему с макушкой и выйти не с терпимой стрижкой, а с уверенным образом.",
      },
      {
        "@type": "CreativeWork",
        position: 2,
        name: "«Когда “подровнять” стало образом»",
        description:
          "История гостя, который много лет просил «подровнять бороду», пока ритуал не превратился в устойчивый образ.",
      },
      {
        "@type": "CreativeWork",
        position: 3,
        name: "«Час, когда выключили голову»",
        description:
          "История позднего визита в ночной формат, где важнее было вернуть себе лицо и состояние, чем просто сделать стрижку.",
      },
    ],
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

        {/* structured data */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header onBookClick={handleBookClick} />

      {/* HERO: идея историй на тёмном фоне */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,#5b1412_0,#050307_60%)] opacity-80" />
        </div>

        <div className="container-custom relative z-10 max-w-3xl space-y-6">
          <p className="label-small text-club-muted">
            истории гостей барбершопа Gentlemen
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">
            Не просто отзывы,
            <br />
            а вечера, которые что‑то поменяли.
          </h1>
          <p className="text-sm text-club-soft md:text-base">
            Звёздочки и короткие «всё понравилось» мало что говорят о месте.
            Важно, зачем человек пришёл, что происходило в кресле и с каким
            ощущением он вышел в ночь из клуба.
          </p>
          <p className="text-sm text-club-soft md:text-base">
            Здесь мы собираем живые сюжеты: про неудачные макушки, бороды,
            которые никак не приживались, и про тот момент, когда в зеркале
            наконец увиделся «свой» человек.
          </p>
        </div>
      </section>

      {/* Лента историй на светлом листе */}
      <section className="section section-paper">
        <div className="container-custom">
          <div className="mb-10 flex flex-col items-start gap-10 lg:flex-row">
            <div className="space-y-4 lg:w-1/3">
              <h2 className="text-2xl font-semibold text-[var(--text-dark)] md:text-3xl">
                Несколько вечеров из жизни клуба.
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Имена можно поменять, но ощущения — нет. Это сюжеты, в которых
                мужчины узнают себя, свои «до» и свои «после».
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Каждый вечер — это связка: человек, запрос, ритуал, мастер и то,
                с чем гость ушёл домой.
              </p>
            </div>

            <div className="space-y-6 lg:w-2/3">
              {/* История 1 */}
              <article className="card-paper-lifted hover-lift p-6">
                <p className="label-small mb-2 text-[var(--text-muted)]">
                  первый визит · ритуал «Стрижка Gentlemen» · 60 мин
                </p>
                <h3 className="mb-3 text-lg font-semibold text-[var(--text-dark)] md:text-xl">
                  «Макушка, которую никто не любил»
                </h3>
                <div className="space-y-3 text-sm text-[var(--text-muted)]">
                  <p>
                    Гость, который много лет ходил с одной и той же стрижкой
                    «потому что только так не торчит макушка». В обычных
                    барбершопах его просьба звучала как приговор, а не как
                    задача.
                  </p>
                  <p>
                    На первом визите мы честно разобрали, что именно не
                    нравится: не «вообще всё плохо», а конкретные вихры, линии и
                    переходы. Мастер предложил путь не в один визит, а на пару
                    месяцев вперёд.
                  </p>
                  <p>
                    После «входа» гость впервые вышел не с «терпимой стрижкой»,
                    а с ощущением, что голова перестала быть проблемой. Кепка
                    осталась аксессуаром, а не защитой.
                  </p>
                </div>
                <p className="mt-3 text-[11px] text-[var(--text-muted)]">
                  Ритуал:{" "}
                  <Link
                    href="/rituals#ritual-1"
                    className="text-[var(--accent-red)] underline-offset-2 hover:underline"
                  >
                    Стрижка Gentlemen
                  </Link>
                  .
                </p>
              </article>

              {/* История 2 */}
              <article className="card-paper-lifted hover-lift p-6">
                <p className="label-small mb-2 text-[var(--text-muted)]">
                  голова + борода · ритуал «Стрижка + борода» · 90 мин
                </p>
                <h3 className="mb-3 text-lg font-semibold text-[var(--text-dark)] md:text-xl">
                  «Когда “подровнять” стало образом»
                </h3>
                <div className="space-y-3 text-sm text-[var(--text-muted)]">
                  <p>
                    Сергей много лет просил в разных местах одно и то же:
                    «просто подровнять бороду». Каждый раз она выходила новой, и
                    ни одна версия не успевала стать привычной.
                  </p>
                  <p>
                    В клуб он пришёл с запросом «хочу, чтобы это перестало быть
                    лотереей». Мы совместили стрижку и бороду в одном ритуале,
                    посмотрели, как он двигается, во что одевается и как
                    разговаривает.
                  </p>
                  <p>
                    Через пару визитов «подровнять» превратилось в конкретную
                    форму и длину, которую можно повторять. Борода стала частью
                    образа, а не экспериментом раз в месяц.
                  </p>
                </div>
                <p className="mt-3 text-[11px] text-[var(--text-muted)]">
                  Ритуал:{" "}
                  <Link
                    href="/rituals#ritual-2"
                    className="text-[var(--accent-red)] underline-offset-2 hover:underline"
                  >
                    Стрижка + борода
                  </Link>
                  .
                </p>
              </article>

              {/* История 3 */}
              <article className="card-paper-lifted hover-lift border border-dashed border-[rgba(18,18,18,0.18)] p-6">
                <p className="label-small mb-2 text-[var(--text-muted)]">
                  поздний слот · ритуал «Королевское бритьё»
                </p>
                <h3 className="mb-3 text-lg font-semibold text-[var(--text-dark)] md:text-xl">
                  «Час, когда выключили голову»
                </h3>
                <div className="space-y-3 text-sm text-[var(--text-muted)]">
                  <p>
                    После затяжной недели и нескончаемых созвонов гость пришёл
                    в поздний слот, где нужно было не столько «сделать стрижку»,
                    сколько вернуть себе лицо и дыхание.
                  </p>
                  <p>
                    Мягкий свет, бар, горячее полотенце и мастер, который
                    понимает, когда лучше помолчать. Весь ритуал прошёл в
                    полголоса и с минимумом слов.
                  </p>
                  <p>
                    Вышел тот же человек, но уже не в режиме «надо успеть», а в
                    состоянии «я в порядке». И да, волосы легли так, что утром
                    не пришлось заново воевать с укладкой.
                  </p>
                </div>
                <p className="mt-3 text-[11px] text-[var(--text-muted)]">
                  Ритуал:{" "}
                  <Link
                    href="/rituals#ritual-3"
                    className="text-[var(--accent-red)] underline-offset-2 hover:underline"
                  >
                    Королевское бритьё
                  </Link>
                  .
                </p>
              </article>

              {/* мягкий CTA под лентой */}
              <div className="mt-4 text-sm text-[var(--text-muted)]">
                Узнали себя в одной из историй? Можно начать с такого же ритуала
                — выберите формат на{" "}
                <Link
                  href="/rituals"
                  className="text-[var(--accent-red)] underline-offset-2 hover:underline"
                >
                  странице ритуалов
                </Link>{" "}
                или сразу{" "}
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline text-[var(--accent-red)] underline-offset-2 hover:underline"
                >
                  записаться в клуб
                </button>
                .
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок: почему истории, а не только отзывы */}
      <section className="section section-dark">
        <div className="container-custom grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="label-small text-club-muted">зачем это всё</p>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Истории помогают понять, ваш ли это клуб.
            </h2>
            <p className="text-sm text-club-soft">
              По чужим оценкам сложно понять, зайдёт ли вам место. А вот по
              чужим историям — проще: узнаёте себя в запросах, типе работы,
              образе жизни — значит, мы говорим на одном языке.
            </p>
          </div>
          <div className="space-y-4 text-sm text-club-soft">
            <div>
              <h3 className="mb-1 text-xs uppercase tracking-[0.18em] text-club-muted">
                если вы узнаёте себя
              </h3>
              <p>
                Макушка, борода, усталость от «как скажете» в кресле — всё это
                те же самые сюжеты, только с другими именами. Значит, с задачей
                мы уже знакомы.
              </p>
            </div>
            <div>
              <h3 className="mb-1 text-xs uppercase tracking-[0.18em] text-club-muted">
                если у вас другая история
              </h3>
              <p>
                Это нормально. В клубе достаточно времени, чтобы разобрать
                запрос с нуля и придумать сценарий именно под вас.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: приглашение стать новой историей */}
      <section className="section section-dark border-t border-black/40">
        <div className="container-custom text-center">
          <p className="label-small mb-3 text-club-muted">
            хотите, чтобы здесь появилась ваша история?
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Всё начинается с одного визита.
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-club-soft md:text-base">
            Начинается всё одинаково: вы выбираете ритуал и мастера, а мы
            забираем у города один час, чтобы вы вышли из клуба уже другим
            человеком.
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
        </div>
      </section>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseModal} />
    </>
  );
}
