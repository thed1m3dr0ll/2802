// pages/rituals.tsx
import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { TimeScheduleIcon, Money02Icon } from "hugeicons-react";

type Ritual = {
  id: number;
  title: string;
  label: string;
  duration: string;
  price: string;
  description: string;
  details: string;
  serviceId?: string;
  isPopular?: boolean;
};

const rituals: Ritual[] = [
  {
    id: 1,
    label: "классика клуба",
    title: "Стрижка Gentlemen",
    duration: "60 минут",
    price: "1 800 ₽",
    description:
      "Спокойная, аккуратная мужская стрижка без экспериментов ради экспериментов. Чтобы утром вы узнали себя в зеркале — только свежее.",
    details:
      "Обсуждаем, чем вы живёте день, как носите волосы и что точно не хочется видеть на голове. Мастер подстраивает форму под ваш стиль жизни, а не под тренд в ленте. В стоимость входит консультация, мытьё головы и базовая укладка.",
    serviceId: "service_collect_head",
    isPopular: true,
  },
  {
    id: 2,
    label: "полный образ",
    title: "Стрижка + борода",
    duration: "90 минут",
    price: "2 800 ₽",
    description:
      "Час с лишним, чтобы привести в порядок и голову, и бороду. Без спешки, с вниманием к мелочам и линии роста волос.",
    details:
      "Форма бороды подчёркивает лицо, а не прячет его. Мастер объясняет, как поддерживать результат между визитами, чтобы вы не зависели от одной удачной записи. В цену уже входят стрижка, работа с бородой и укладка.",
    serviceId: "service_collect_image",
    isPopular: true,
  },
  {
    id: 3,
    label: "ритуал для себя",
    title: "Королевское бритьё",
    duration: "60 минут",
    price: "2 200 ₽",
    description:
      "Тёплые полотенца, масла, пена и аккуратная работа опасной бритвой — не ради шоу, а ради ощущения «наконец‑то обо мне позаботились».",
    details:
      "Если вы обычно «на бегу» проходите мимо зеркала, этот час — редкая возможность остановиться. В ритуал входят подготовка кожи, несколько проходов бритвой и финальный уход.",
    serviceId: "service_royal_shave",
  },
  {
    id: 4,
    label: "обновить форму",
    title: "Уход за бородой",
    duration: "40 минут",
    price: "1 200 ₽",
    description:
      "Чёткая линия, симметрия и длина, с которой комфортно жить каждый день, а не только в день визита.",
    details:
      "Подбираем форму под черты лица и привычки: кто‑то любит идеальную геометрию, кто‑то — живой, немного небрежный образ. В стоимость входят консультация, коррекция формы и укладка бороды.",
    serviceId: "service_beard_care",
  },
];

type RitualContext = {
  ritualId?: string;
  ritualName?: string;
};

export default function RitualsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<RitualContext | null>(
    null,
  );

  const handleBookClick = (ritual?: Ritual) => {
    if (ritual) {
      setSelectedRitual({
        ritualId: ritual.serviceId,
        ritualName: ritual.title,
      });
    } else {
      setSelectedRitual(null);
    }
    setIsBookingOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
    setSelectedRitual(null);
  };

  const pageTitle =
    "Ритуалы барбершопа в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Ритуалы барбершоп‑клуба «Джентльмены Культуры» в Нижнем Новгороде: мужская стрижка, стрижка + борода, уход за бородой и королевское бритьё без спешки и суеты.";
  const canonicalUrl = "https://gentlemenbarber.ru/rituals";
  const ogImage = "https://gentlemenbarber.ru/og-rituals.jpg";

  // базовый блок Service (как было)
  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ритуалы барбершопа «Джентльмены Культуры»",
    url: canonicalUrl,
    serviceType: "Barber services",
    areaServed: {
      "@type": "City",
      name: "Нижний Новгород",
    },
    provider: {
      "@type": "BarberShop",
      name: "Барбершоп «Джентльмены Культуры»",
      sameAs: ["https://vk.ru/barbershop_gentlemen"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Нижний Новгород",
        addressCountry: "RU",
      },
    },
  };

  // Offer для каждого ритуала (цены + длительность)
  const jsonLdOffers = useMemo(() => {
    return rituals.map((ritual) => {
      const numericPrice = ritual.price.replace(/[^\d]/g, "");
      const priceCurrency = "RUB";

      let durationMinutes: number | undefined;
      const match = ritual.duration.match(/(\d+)\s*мин/);
      if (match) {
        durationMinutes = Number(match[1]);
      }

      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: ritual.title,
        description: ritual.description,
        provider: {
          "@type": "BarberShop",
          name: "Барбершоп «Джентльмены Культуры»",
        },
        areaServed: {
          "@type": "City",
          name: "Нижний Новгород",
        },
        offers: {
          "@type": "Offer",
          price: numericPrice || undefined,
          priceCurrency,
          category: ritual.label,
          url: `${canonicalUrl}#ritual-${ritual.id}`,
          availability: "https://schema.org/InStoreOnly",
        },
        ...(durationMinutes
          ? {
              duration: {
                "@type": "Duration",
                iso8601Duration: `PT${durationMinutes}M`,
              },
            }
          : {}),
      };
    });
  }, []);

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

        {/* structured data: общий Service */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
        />

        {/* structured data: подробные офферы по ритуалам */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOffers) }}
        />
      </Head>

      <Header onBookClick={() => handleBookClick()} />

      {/* Хлебные крошки */}
      <nav
        aria-label="Хлебные крошки"
        className="section section-paper pb-0 pt-4"
      >
        <div className="container-custom text-[12px] text-[var(--text-muted)] md:text[13px]">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[var(--accent-red)]"
              >
                Главная
              </Link>
            </li>
            <li className="text-[var(--text-muted)]">/</li>
            <li aria-current="page" className="text-[var(--text-dark-strong)]">
              Ритуалы
            </li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section className="section section-paper section-animate">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="label-small text-club-muted">
            ритуалы барбершоп‑клуба Gentlemen
          </p>
          <h1 className="text-3xl font-semibold text-[var(--text-dark)] md:text-4xl">
            Не «услуги по прайсу», а привычные ритуалы для нормальной жизни.
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Мы называем это ритуалами, а не просто «стрижкой» или «бритьём». В
            кресле вы не отрабатываете талон — вы берёте час, который работает
            на образ, уверенность и спокойную голову.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Здесь нет навязанных «доп. услуг» и непонятных строк в чеке — только
            ясные форматы: выбрали ритуал под задачу, остальное сделает мастер
            барбершопа Gentlemen.
          </p>
        </div>
      </section>

      {/* РИТУАЛЫ */}
      <section className="section section-paper section-animate">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 label-small text-[var(--text-muted)]">
              что конкретно мы делаем
            </p>
            <h2 className="mb-3 text-3xl font-semibold text-[var(--text-dark)] md:text-4xl">
              Ритуалы, с которых удобно начать знакомство с клубом.
            </h2>
            <p className="text-sm text-[var(--text-muted)] md:text-base">
              Можно прийти с конкретным запросом — «стрижка как в прошлый раз»,
              а можно просто рассказать, как вы живёте день. Администратор и
              мастер подскажут, с какого ритуала начать: со стрижки, бороды или
              королевского бритья.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] text-[var(--text-muted)] md:text-[12px]">
            <span className="rounded-full bg-black/5 px-3 py-1">
              • Стрижка Gentlemen и «Стрижка + борода» — самые частые первые
              ритуалы гостей.
            </span>
            <span className="rounded-full bg-black/5 px-3 py-1">
              • В стоимость уже входят консультация, мытьё головы и базовая
              укладка.
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {rituals.map((ritual) => (
              <article
                key={ritual.id}
                id={`ritual-${ritual.id}`}
                className="card-paper-lifted hover-lift flex flex-col justify-between bg-[var(--paper-bg)] p-6"
              >
                <div className="mb-3">
                  <p className="mb-1 label-small text-[var(--accent-gold-soft)]">
                    {ritual.label}
                    {ritual.isPopular && (
                      <span className="ml-2 rounded-full bg-[rgba(199,17,36,0.08)] px-2 py-[2px] text-[10px] uppercase tracking-[0.14em] text-[var(--accent-red)]">
                        популярно
                      </span>
                    )}
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark-strong)] md:text-xl">
                    {ritual.title}
                  </h3>
                </div>

                {/* время + цена */}
                <div className="mb-4 flex flex-wrap items-center gap-4 text-[12px] text-[var(--text-muted-strong)] md:text-[13px]">
                  <span className="inline-flex items-center gap-1.5">
                    <TimeScheduleIcon
                      size={18}
                      className="text-[var(--accent-gold-soft)]"
                    />
                    <span>{ritual.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Money02Icon
                      size={18}
                      className="text-[var(--accent-gold-soft)]"
                    />
                    <span>{ritual.price}</span>
                  </span>
                </div>

                <p className="mb-3 text-sm leading-relaxed text-[var(--text-dark)] md:text-[15px]">
                  {ritual.description}
                </p>
                <p className="mb-5 text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">
                  {ritual.details}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => handleBookClick(ritual)}
                    className="btn-primary-dark w-full whitespace-nowrap text-center sm:w-auto"
                  >
                    ЗАПИСАТЬСЯ НА РИТУАЛ
                  </button>
                  <p className="max-w-xs text-[11px] leading-relaxed text-[var(--text-muted)]">
                    В комментарии к записи можно указать привычки по уходу,
                    ограничения по времени или формат общения — мастер учтёт это
                    при работе.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-paper section-animate">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text-dark)] md:text-3xl">
            Выберите ритуал — остальное мы возьмём на себя.
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
            Если сложно определиться, достаточно написать пару строк о себе.
            Администратор подскажет, с чего начать: со стрижки, бороды или
            просто часа тишины в кресле барбершоп‑клуба Gentlemen.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => handleBookClick()}
          >
            записаться в клуб
          </button>
        </div>
      </section>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
        initialContext={selectedRitual || undefined}
      />
    </>
  );
}
