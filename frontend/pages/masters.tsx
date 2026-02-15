// pages/masters.tsx
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

type MasterContext = {
  masterId?: string;
  masterName?: string;
};

export default function MastersPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState<MasterContext | null>(
    null,
  );

  const handleBookClick = (master?: MasterContext) => {
    setSelectedMaster(master ?? null);
    setIsBookingOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
    setSelectedMaster(null);
  };

  const pageTitle =
    "Мастера барбершопа в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Команда барбершоп‑клуба «Джентльмены Культуры» в Нижнем Новгороде: мастера, которым можно доверить образ, бороду и час своей жизни.";
  const canonicalUrl = "https://gentlemenbarber.ru/masters";
  const ogImage = "https://gentlemenbarber.ru/og-masters.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Мастера барбершоп‑клуба «Джентльмены Культуры»",
    url: canonicalUrl,
    itemListElement: [
      {
        "@type": "Person",
        name: "Совет клуба Gentlemen",
        jobTitle: "Барберы",
        worksFor: {
          "@type": "BarberShop",
          name: "Барбершоп «Джентльмены Культуры»",
          sameAs: ["https://vk.ru/barbershop_gentlemen"],
        },
      },
    ],
  };

  return (
    <>
      <Head>
        {/* базовый SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / VK */}
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

      <Header onBookClick={() => handleBookClick()} />

      {/* Хлебные крошки */}
      <nav
        aria-label="Хлебные крошки"
        className="section section-paper pt-4 pb-0"
      >
        <div className="container-custom text-[12px] md:text-[13px] text-[var(--text-muted)]">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link
                href="/"
                className="hover:text-[var(--accent-red)] transition-colors"
              >
                Главная
              </Link>
            </li>
            <li className="text-[var(--text-muted)]">/</li>
            <li aria-current="page" className="text-[var(--text-dark-strong)]">
              Мастера клуба
            </li>
          </ol>
        </div>
      </nav>

      {/* HERO: кто эти люди */}
      <section className="section section-paper section-animate">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="label-small text-[var(--text-muted)]">совет клуба</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)]">
            Команда, с которой держится клуб.
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            В обычных барбершопах вы выбираете свободное кресло. В клубе —
            человека, которому готовы доверить образ, настроение и час своей
            жизни.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Мы показываем мастеров вместе, потому что в кресле вы попадаете не
            только к конкретному барберу, а в общую команду: характеры, чувство
            вкуса и отношение к делу у всех совпадают.
          </p>
        </div>
      </section>

      {/* КАРТОЧКИ МАСТЕРОВ — СТОЛБИКОМ */}
      <section className="section section-paper section-animate">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="label-small text-[var(--text-muted)] mb-2">
              не персонажи на фото
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-dark)]">
              Вы выбираете не кресло, а человека.
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)]">
              Здесь нет формальных «био» с перечнем конкурсов. Важнее, как
              мастер смотрит на мужской образ, как разговаривает и как вы
              чувствуете себя в кресле рядом с ним.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Карточка 1 — Совет клуба */}
            <article className="card-paper-lifted hover-lift flex gap-5 bg-[var(--paper-bg)] min-h-[220px]">
              <div className="w-[240px] md:w-[280px] flex-shrink-0 overflow-hidden rounded-2xl">
                <div className="relative h-full w-full min-h-[220px]">
                  <Image
                    src="/images/masters/master-1.jpg"
                    alt="Команда барбершоп‑клуба Gentlemen"
                    fill
                    sizes="(min-width: 1024px) 280px, 240px"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 py-2">
                <div>
                  <p className="label-small text-[var(--accent-gold-soft)] mb-1">
                    команда gentlemen
                  </p>
                  <h3 className="text-base md:text-lg font-semibold text-[var(--text-dark-strong)] mb-2">
                    Совет клуба Gentlemen
                  </h3>
                  <p className="text-sm text-[var(--text-dark)] mb-2 leading-relaxed">
                    На этом снимке — ядро команды: люди, которые собрали клуб с
                    первых гостей. Характеры разные, но у всех одно отношение к
                    времени гостя и тому, что происходит в кресле.
                  </p>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                    Если вы приходите впервые, выберите удобное время — вас
                    встретит кто‑то из совета, и с этого начнётся личная история
                    в клубе.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleBookClick({
                      masterId: "staff_council",
                      masterName: "Совет клуба",
                    })
                  }
                  className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                >
                  записаться к мастеру из совета
                </button>
              </div>
            </article>

            {/* Карточка 2 — команда в работе */}
            <article className="card-paper-lifted hover-lift flex gap-5 bg-[var(--paper-bg)] min-h-[220px]">
              <div className="w-[240px] md:w-[280px] flex-shrink-0 overflow-hidden rounded-2xl">
                <div className="relative h-full w-full min-h-[220px]">
                  <Image
                    src="/images/masters/master-2.jpg"
                    alt="Команда барбершоп‑клуба Gentlemen за работой"
                    fill
                    sizes="(min-width: 1024px) 280px, 240px"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 py-2">
                <div>
                  <p className="label-small text-[var(--accent-gold-soft)] mb-1">
                    образ и атмосфера
                  </p>
                  <h3 className="text-base md:text-lg font-semibold text-[var(--text-dark-strong)] mb-2">
                    Команда в работе, а не в позе
                  </h3>
                  <p className="text-sm text-[var(--text-dark)] mb-2 leading-relaxed">
                    Общие кадры с креслами — обычный вечер в клубе. Кто‑то
                    стрижёт, кто‑то обсуждает дела, кто‑то просто молчит и
                    отдыхает. Без шоу и поз ради контента.
                  </p>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                    Один любит идеальную геометрию, другой — живой, чуть
                    небрежный образ. Внутри команды найдётся человек под ваш
                    характер, работу и привычки.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleBookClick({
                      masterId: "staff_pick_master",
                      masterName: "Подбор мастера",
                    })
                  }
                  className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                >
                  подобрать мастера под себя
                </button>
              </div>
            </article>

            {/* Карточка 3 — Ваш мастер / ссылка в кабинет */}
            <Link
              href="/cabinet"
              className="card-paper-lifted hover-lift flex gap-5 bg-[var(--paper-bg)] min-h-[220px] cursor-pointer"
            >
              <div className="w-[240px] md:w-[280px] flex-shrink-0 overflow-hidden rounded-2xl">
                <div className="relative h-full w-full min-h-[220px]">
                  <Image
                    src="/images/masters/master-your.jpg"
                    alt="Ваш мастер в клубе Gentlemen"
                    fill
                    sizes="(min-width: 1024px) 280px, 240px"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 py-2">
                <div>
                  <p className="label-small text-[var(--accent-gold-soft)] mb-1">
                    свой человек в клубе
                  </p>
                  <h3 className="text-base md:text-lg font-semibold text-[var(--text-dark-strong)] mb-2">
                    Ваш мастер на общем фото
                  </h3>
                  <p className="text-sm text-[var(--text-dark)] mb-2 leading-relaxed">
                    На этих групповых снимках будущий «ваш» мастер уже есть —
                    просто вы пока не знаете, кто именно. Иногда совпадает с
                    первого визита, иногда — через пару попыток.
                  </p>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                    Достаточно описать задачу и то, как вы живёте день —
                    администратор подскажет, с кого начать знакомство.
                  </p>
                </div>

                <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] underline underline-offset-4">
                  перейти в кабинет и закрепить своего мастера
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* БЛОК: как проходит визит */}
      <section className="section section-paper section-animate">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <p className="label-small text-[var(--text-muted)]">
              как проходит час
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)]">
              Никакой магии — просто нормальный человеческий сервис.
            </h2>
          </div>
          <div className="space-y-4 text-sm text-[var(--text-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                знакомство
              </h3>
              <p>
                Сначала мастер слушает: чем вы занимаетесь, как обычно носите
                волосы, что раздражает в зеркале и чего категорически не
                хочется.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                работа
              </h3>
              <p>
                Потом начинается аккуратная работа без суеты. Можно говорить,
                можно молчать — никаких обязательных small talk, если вы этого
                не любите.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-[var(--text-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                результат
              </h3>
              <p>
                На финише — образ, который можно повторить: мастер объясняет,
                как укладываться дома и чем пользоваться, чтобы не зависеть от
                одного удачного раза.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                история
              </h3>
              <p>
                Ваши удачные решения сохраняются в клубе: длина, форма, фото,
                любимый мастер. Чтобы следующий визит был продолжением истории,
                а не попыткой вспомнить, «как там было тогда».
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — перед футером */}
      <section className="section section-dark section-animate">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Выберите мастера — а потом он будет выбирать решения для вас.
          </h2>
          <p className="text-club-soft text-sm md:text-base max-w-2xl mx-auto mb-6">
            Можно записаться к конкретному мастеру, а можно первым делом
            написать администратору пару строк о себе — мы подскажем, с кем
            начать.
          </p>
          <button
            type="button"
            className="btn-primary mb-3"
            onClick={() => handleBookClick()}
          >
            записаться к мастеру
          </button>
          <p className="text-club-soft text-sm">
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

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
        initialContext={selectedMaster || undefined}
      />
    </>
  );
}
