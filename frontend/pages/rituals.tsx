// pages/rituals.tsx
import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { TimeScheduleIcon, Money02Icon } from "hugeicons-react";

type ApiRitual = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  category: string;
  zone: string;
  duration_minutes: number;
  price_from: number;
  price_to: number | null;
};

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

type RitualContext = {
  ritualId?: string;
  ritualName?: string;
};

const ZONE_LABELS: Record<string, string> = {
  hair: "стрижка",
  beard: "борода",
  both: "стрижка и борода",
  other: "уход",
};

function formatDuration(minutes: number | undefined) {
  if (!minutes) return "";
  return `${minutes} минут`;
}

function formatPrice(priceFrom: number | undefined) {
  if (!priceFrom || priceFrom <= 0) return "по запросу";
  return `от ${priceFrom} ₽`;
}

export default function RitualsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<RitualContext | null>(
    null,
  );
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);

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

  // тянем ритуалы с backend и мапим под текущий UI
  useEffect(() => {
    async function load() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/rituals`);
        if (!res.ok) {
          throw new Error("Failed to load rituals");
        }
        const data: ApiRitual[] = await res.json();

        const mapped: Ritual[] = data.map((r) => ({
          id: r.id,
          title: r.name,
          label: ZONE_LABELS[r.zone] ?? "ритуал",
          duration: formatDuration(r.duration_minutes) || "45 минут",
          price: formatPrice(r.price_from),
          description: r.description || "",
          details:
            r.description ||
            "В стоимость входят консультация, работа мастера и базовый уход.",
          serviceId: r.code,
          isPopular: r.category === "base",
        }));

        setRituals(mapped);
      } catch (e) {
        console.error(e);
        setRituals([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const pageTitle =
    "Ритуалы барбершопа в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Ритуалы барбершоп‑клуба «Джентльмены Культуры» в Нижнем Новгороде: мужская стрижка, стрижка + борода, уход за бородой и королевское бритьё без спешки и суеты.";
  const canonicalUrl = "https://gentlemenbarber.ru/rituals";
  const ogImage = "https://gentlemenbarber.ru/og-rituals.jpg";

  // базовый блок Service
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
  }, [rituals]);

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
        <div className="container-custom max-w-3xl mx-auto space-y-6">
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
          <div className="mb-10 max-w-3xl mx-auto">
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

          {loading ? (
            <p className="text-sm text-[var(--text-muted)]">
              Загружаем актуальный прайс…
            </p>
          ) : rituals.length === 0 ? (
            <div className="max-w-md text-sm text-[var(--text-muted)] space-y-3">
              <p>
                Сейчас не получается загрузить прайс клуба. Попробуйте чуть
                позже или напишите администратору — подберём ритуал и озвучим
                стоимость лично.
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => handleBookClick()}
              >
                написать администратору
              </button>
            </div>
          ) : (
            <div className="grid gap-6 justify-center md:grid-cols-2">
              {rituals.map((ritual) => (
                <article
                  key={ritual.id}
                  id={`ritual-${ritual.id}`}
                  className="card-paper-lifted hover-lift flex w-full max-w-md flex-col justify-between bg-[var(--paper-bg)] p-5 md:p-6 mx-auto"
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
                      ограничения по времени или формат общения — мастер учтёт
                      это при работе.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ДОПОЛНЕНИЯ К ВИЗИТУ */}
      <section className="section section-paper section-animate">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="mb-3 text-2xl md:text-3xl font-semibold text-[var(--text-dark)]">
            Дополнения к визиту
          </h2>
          <p className="mb-5 text-sm text-[var(--text-muted)] md:text-base">
            Небольшие штуки, которые можно добавить к основному ритуалу —
            для более чистого контура, свежей кожи и аккуратной головы.
          </p>
          <ul className="space-y-3 text-sm md:text-[15px] text-[var(--text-dark)]">
            <li>
              <span className="font-semibold">Камуфляж головы</span> — от 1300 ₽.
              <span className="block text-[13px] text-[var(--text-muted)]">
                Лёгкое выравнивание тона и плотности, когда хочется
                «отдохнувший» вид без явного окрашивания.
              </span>
            </li>
            <li>
              <span className="font-semibold">Камуфляж бороды</span> — от 1200 ₽.
              <span className="block text-[13px] text-[var(--text-muted)]">
                Маскирует седину и неровности цвета, оставляя естественную
                текстуру бороды.
              </span>
            </li>
            <li>
              <span className="font-semibold">Чёрная маска</span> — от 700 ₽.
              <span className="block text-[13px] text-[var(--text-muted)]">
                Быстрый ритуал для очищения пор и выравнивания кожи после
                дороги или тяжёлой недели.
              </span>
            </li>
            <li>
              <span className="font-semibold">Укладка</span> — от 600 ₽.
              <span className="block text-[13px] text-[var(--text-muted)]">
                Настройка формы перед встречей или съёмкой, когда нужно, чтобы
                всё лежало аккуратно и держалось дольше обычного.
              </span>
            </li>
            <li>
              <span className="font-semibold">Воск</span> — от 400 ₽.
              <span className="block text-[13px] text-[var(--text-muted)]">
                Работа с отдельными зонами — брови, нос, уши — чтобы детали
                не выбивались из образа.
              </span>
            </li>
            <li>
              <span className="font-semibold">Патчи</span> — от 300 ₽.
              <span className="block text-[13px] text-[var(--text-muted)]">
                Небольшое дополнение под глаза, которое снимает следы недосыпа,
                пока вы сидите в кресле.
              </span>
            </li>
          </ul>
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
