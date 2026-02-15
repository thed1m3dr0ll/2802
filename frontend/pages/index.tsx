// pages/index.tsx
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import ClubMap from "../components/ClubMap";
import WorksGallery from "../components/WorksGallery";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ContactWidget from "../components/ContactWidget";

import { HeroTopBar } from "../components/home/HeroTopBar";
import { HeroSection } from "../components/home/HeroSection";
import { BenefitsSection } from "../components/home/BenefitsSection";
import { ManifestSection } from "../components/home/ManifestSection";
import { RitualsSummarySection } from "../components/home/RitualsSummarySection";
import { StoriesTeaserSection } from "../components/home/StoriesTeaserSection";
import { MastersSection } from "../components/home/MastersSection";
import { ReviewsSection, Review } from "../components/home/ReviewsSection";
import { ShowcaseSection } from "../components/home/ShowcaseSection";
import { FaqSection } from "../components/home/FaqSection";
import { GiftSection } from "../components/home/GiftSection";
import { FinalCtaSection } from "../components/home/FinalCtaSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<{
    masterName?: string;
    ritualName?: string;
  } | null>(null);

  const firstFieldRef = useRef<HTMLButtonElement | null>(null);

  const handleBookClick = () => {
    setBookingContext(null);
    setIsBookingOpen(true);
  };

  const handleBookWithMaster = (masterName: string) => {
    setBookingContext({ masterName });
    setIsBookingOpen(true);
  };

  const handleBookWithRitual = (ritualName: string) => {
    setBookingContext({ ritualName });
    setIsBookingOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
  };

  useEffect(() => {
    async function loadReviews() {
      try {
        setReviewsError(null);
        const res = await fetch(`${API_URL}/reviews/`);
        if (!res.ok) {
          throw new Error("Failed to load reviews");
        }
        const data = (await res.json()) as Review[];
        setReviews(data);
      } catch (e) {
        console.error("Failed to load reviews", e);
        setReviewsError("Отзывы временно недоступны");
      } finally {
        setReviewsLoading(false);
      }
    }

    loadReviews();
  }, []);

  const pageTitle = "Барбершоп в Нижнем Новгороде | Джентльмены Культуры";
  const pageDescription =
    "Барбершоп‑клуб «Джентльмены Культуры» в Нижнем Новгороде: мужские стрижки, борода, авторские ритуалы и клубная атмосфера на Белозёрской, 4.";
  const canonicalUrl = "https://gentlemenbarber.ru/";
  const ogImage = "https://gentlemenbarber.ru/og-image.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "Барбершоп «Джентльмены Культуры»",
    url: canonicalUrl,
    telephone: "+7-987-755-30-00",
    sameAs: [
      "https://vk.ru/barbershop_gentlemen",
      "https://yandex.ru/maps/org/dzhentlmeny_kultury/101569682800",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Белозёрская, 4",
      addressLocality: "Нижний Новгород",
      addressCountry: "RU",
    },
    openingHours: "Mo-Su 10:00-22:00",
  };

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

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* structured data */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header onBookClick={handleBookClick} />

      <HeroTopBar onBookClick={handleBookClick} />
      <HeroSection
        onBookClick={handleBookClick}
        firstButtonRef={firstFieldRef}
      />
      <BenefitsSection />

      {/* поднятый блок отзывов — social proof выше по странице */}
      <ReviewsSection
        reviews={reviews}
        loading={reviewsLoading}
        error={reviewsError}
      />

      <ManifestSection />
      <RitualsSummarySection
        onBookWithRitual={handleBookWithRitual}
        onBookClick={handleBookClick}
      />
      <WorksGallery />
      <StoriesTeaserSection />
      <MastersSection onBookWithMaster={handleBookWithMaster} />
      <ShowcaseSection />
      <FaqSection />
      <GiftSection onBookClick={handleBookClick} />

      {/* Блок гарантий/доверия перед финальным CTA */}
      <section className="section">
        <div className="container-custom rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-5 py-6 grid gap-6 items-start md:px-8 md:py-7 md:grid-cols-3">
          <div>
            <p className="label-small mb-1 text-[var(--text-muted)]">
              честный формат
            </p>
            <h2 className="mb-1 text-[16px] font-semibold text-[var(--text-main)] md:text-[18px]">
              Если что‑то не так — переделаем.
            </h2>
            <p className="text-[12px] text-[var(--text-muted)]">
              Если после визита что‑то не устраивает в стрижке или бороде,
              клуб берёт на себя корректировку — важно, чтобы вам было комфортно.
            </p>
          </div>

          <div>
            <p className="label-small mb-1 text-[var(--text-muted)]">
              мастера клуба
            </p>
            <h3 className="mb-1 text-[14px] font-semibold text-[var(--text-main)] md:text-[16px]">
              Опытные барберы без «учеников».
            </h3>
            <p className="text-[12px] text-[var(--text-muted)]">
              В кресло не записывают стажёров. Каждый мастер прошёл отбор и
              работает по единым стандартам клуба.
            </p>
          </div>

          <div>
            <p className="label-small mb-1 text-[var(--text-muted)]">
              прозрачные условия
            </p>
            <h3 className="mb-1 text-[14px] font-semibold text-[var(--text-main)] md:text-[16px]">
              Никаких скрытых доплат в чеке.
            </h3>
            <p className="text-[12px] text-[var(--text-muted)]">
              Стоимость ритуала фиксируется заранее. Вы заранее понимаете,
              за что платите, без сюрпризов на кассе.
            </p>
          </div>
        </div>
      </section>

      <FinalCtaSection onBookClick={handleBookClick} />
      <ClubMap />
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
        initialContext={bookingContext || undefined}
      />

      <ScrollToTopButton />
      <ContactWidget />
    </>
  );
}
