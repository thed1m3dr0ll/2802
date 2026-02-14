// pages/index.tsx
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import ClubMap from '../components/ClubMap';
import WorksGallery from '../components/WorksGallery';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ContactWidget from '../components/ContactWidget';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  Target01Icon,
  Scissor01Icon,
  Location01Icon,
  TimeScheduleIcon,
  DrinkIcon,
} from '@hugeicons/core-free-icons';

type ReviewSource = 'yandex' | '2gis' | 'site';

interface Review {
  id: number;
  author: string;
  source: ReviewSource;
  rating: number;
  text: string;
  date: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getSourceLabel(source: ReviewSource) {
  if (source === 'yandex') return 'Яндекс Карты';
  if (source === '2gis') return '2ГИС';
  return 'Сайт клуба Джентльмены Культуры';
}

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
          throw new Error('Failed to load reviews');
        }
        const data = (await res.json()) as Review[];
        setReviews(data);
      } catch (e) {
        console.error('Failed to load reviews', e);
        setReviewsError('Отзывы временно недоступны');
      } finally {
        setReviewsLoading(false);
      }
    }

    loadReviews();
  }, []);

  return (
    <>
      <Head>
        <title>
          Барбершоп Джентльмены Культуры | Стрижка и борода от 1 800₽
        </title>
        <meta
          name="description"
          content="Премиум барбершоп‑клуб «Джентльмены Культуры» на Белозёрской, 4. Мужские стрижки, борода, ритуалы и ночной формат для своих."
        />
        <meta
          name="keywords"
          content="барбершоп нижний новгород, мужская стрижка нн, стрижка борода, барбершоп белозерская, gentlemen barbershop, джентльмены культуры отзывы"
        />
        <meta
          property="og:title"
          content="Барбершоп‑клуб «Джентльмены Культуры» — премиум‑формат в НН"
        />
        <meta
          property="og:description"
          content="Закрытый мужской клуб. Ритуалы, а не просто стрижка."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gentlemen-nn.ru/" />
      </Head>

      <Header onBookClick={handleBookClick} />

      {/* СЛОЙ 1: SEO‑полоса над героем */}
      <section className="section-paper section-hero-top border-b border-[var(--card-border)]">
        <div className="container-custom flex flex-col gap-4 py-4 md:py-5 md:flex-row md:items-stretch md:justify-between">
          {/* Слева: адрес + оффер */}
          <div className="w-full md:max-w-xl">
            <p className="label-small text-[var(--text-muted)] flex items-center gap-2 mb-1">
              <HugeiconsIcon
                icon={Location01Icon}
                size={18}
                className="lux-icon"
              />
              <span className="text-[13px] md:text-[14px]">
                Нижний Новгород · Белозёрская, 4
              </span>
            </p>

            <h1 className="mt-1 text-[20px] leading-snug md:text-[28px] md:leading-snug font-semibold text-[var(--text-dark-strong)]">
              Мужские стрижки и борода от{' '}
              <span className="font-bold">1 800 ₽</span> в{' '}
              <span className="font-semibold text-[var(--accent-red)]">
                премиум
              </span>{' '}
              барбершоп‑клубе «Джентльмены Культуры»
            </h1>
          </div>

          {/* Справа: колонка с CTA, прижатая вниз */}
          <div className="w-full md:w-auto flex flex-col md:items-end md:min-h-[120px]">
            <div className="flex flex-col gap-2 md:gap-1 mt-auto md:items-end">
              <button
                type="button"
                className="btn-primary w-full md:w-auto"
                onClick={handleBookClick}
              >
                записаться онлайн
              </button>

              <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] md:text-right">
                Только по предварительной записи ·{' '}
                <a
                  href="tel:+79877553000"
                  className="text-[var(--accent-red)] hover:opacity-80 transition"
                >
                  +7 987 755 30 00
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HERO (СЛОЙ 2: клуб) */}
      <section
        id="hero"
        className="section section-dark relative overflow-hidden section-animate"
      >
        {/* спокойный фон‑градиент */}
        <div className="absolute inset-0 hero-glow-layer pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-[#180405] via-[#050307] to-[#050307]" />
        </div>

        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Левая колонка: текст */}
          <div className="space-y-6 max-w-xl">
            <p className="label-small text-club-muted">
              мужской барбершоп‑клуб · нижний новгород
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Закрытый мужской клуб стрижек и ритуалов для тех, кто ценит себя
            </h2>

            <p className="text-club-soft text-[15px] md:text-base">
              Атмосферный барбершоп‑клуб на Белозёрской, 4: тёмный зал, тёплый
              свет, мягкие кресла и мастера, которым можно доверить голову и
              бороду без оговорок.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <button
                ref={firstFieldRef}
                type="button"
                className="btn-primary-dark"
                onClick={handleBookClick}
              >
                записаться в клуб
              </button>

              <button
                type="button"
                className="btn-secondary-dark"
                onClick={() => {
                  window.location.href = '/rituals';
                }}
              >
                смотреть ритуалы
              </button>
            </div>

            <p className="text-[13px] text-club-muted max-w-md">
              Ул. Белозёрская, 4 · пространство 18+ с уважением к личному
              времени и ритуалам гостей.
            </p>
          </div>

          {/* Правая колонка: фото + карточка клуба */}
          <div className="space-y-4">
            <figure className="card-dark overflow-hidden">
              <picture>
                <source srcSet="/images/club/club-main.webp" type="image/webp" />
                <img
                  src="/images/club/club-main.jpg"
                  alt="Интерьер барбершоп‑клуба Джентльмены Культуры на Белозёрской"
                  className="hero-image"
                  loading="lazy"
                />
              </picture>
              <figcaption className="sr-only">
                Интерьер барбершоп‑клуба Джентльмены Культуры на Белозёрской
              </figcaption>
            </figure>

            <div className="card-glass px-6 py-5">
              <div className="mb-3">
                <div className="grid grid-cols-2 gap-x-6 text-[12px] uppercase tracking-[0.16em] text-club-muted">
                  <div>клубный формат</div>
                  <div className="text-right text-[var(--accent-gold)]">
                    only by
                  </div>
                  <div>только по записи</div>
                  <div className="text-right text-[var(--accent-gold)]">
                    invitation
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-[14px] card-dark-text max-w-md">
                <p>
                  — Камерное пространство с мягким светом, где можно спрятаться
                  от города хотя бы на час.
                </p>
                <p>
                  — Мастера с характером и вкусом, а не просто «свободная смена
                  по графику».
                </p>
                <p>
                  — Авторские ритуалы, в которых стрижка и борода — только
                  часть общего сценария вечера.
                </p>
                <p>
                  — Атмосфера клуба: помним по имени, истории и любимые детали
                  вашего образа.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* УТП / ПРЕИМУЩЕСТВА */}
      <section className="section section-paper section-animate">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <header className="mb-10 text-center">
              <p className="label-small tracking-[0.22em] uppercase text-[var(--accent-gold-soft)] mb-2">
                почему выбирают клуб
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark-strong)]">
                Почему выбирают клуб «Джентльмены Культуры»
              </h2>
            </header>

            <div className="relative pl-10 md:pl-16">
              <div className="hidden md:block pointer-events-none absolute left-6 top-2 bottom-4">
                <div className="w-px h-full bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(170,140,105,0.7)] to-[rgba(0,0,0,0.35)]" />
              </div>

              <div className="space-y-8 md:space-y-9">
                {/* 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="benefit-icon mb-2">
                      <HugeiconsIcon
                        icon={Target01Icon}
                        size={28}
                        className="lux-icon"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[16px] md:text-[17px] font-semibold mb-1.5 text-[var(--text-dark-strong)]">
                      Персональный подход в клубном формате
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[var(--text-muted)] leading-relaxed">
                      Запоминаем ваши предпочтения, удачные решения и историю
                      образа, чтобы каждый визит в клуб «Джентльмены Культуры»
                      начинался не с нуля.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="benefit-icon mb-2">
                      <HugeiconsIcon
                        icon={Scissor01Icon}
                        size={28}
                        className="lux-icon"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[16px] md:text-[17px] font-semibold mb-1.5 text-[var(--text-dark-strong)]">
                      Мастера с опытом и единым почерком
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[var(--text-muted)] leading-relaxed">
                      Опыт от 5 лет, внутренняя школа и стандарты клуба — не
                      потоковая смена, а команда, которая разделяет почерк
                      «Джентльменов Культуры».
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="benefit-icon mb-2">
                      <HugeiconsIcon
                        icon={TimeScheduleIcon}
                        size={28}
                        className="lux-icon"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[16px] md:text-[17px] font-semibold mb-1.5 text-[var(--text-dark-strong)]">
                      Строго по записи и по времени
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[var(--text-muted)] leading-relaxed">
                      Планируем ритуалы так, чтобы вы приходили на своё время и
                      не сидели в живой очереди у стойки администратора.
                    </p>
                  </div>
                </div>

                {/* 4 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="benefit-icon mb-2">
                      <HugeiconsIcon
                        icon={DrinkIcon}
                        size={28}
                        className="lux-icon"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[16px] md:text-[17px] font-semibold mb-1.5 text-[var(--text-dark-strong)]">
                      Атмосфера закрытого мужского клуба
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[var(--text-muted)] leading-relaxed">
                      Бар, мягкий свет и гости, которым близок спокойный формат
                      без суеты и лишнего шума.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-[var(--accent-red)] hover:opacity-80">
                манифест клуба
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* МАНИФЕСТ */}
      <section className="section section-wave-top section-animate">
        <div className="container-custom max-w-4xl space-y-7">
          <p className="label-small text-[var(--accent-red)]">манифест клуба</p>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-[var(--text-dark-strong)] max-w-3xl">
            Мы не просто стрижём — мы{' '}
            <span className="text-[var(--accent-red)]">строим отношения</span> с
            гостями клуба
          </h2>

          <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
            Мы не продаём ещё одну стрижку по записи. Каждый визит — часть
            истории: любимый мастер, понятный образ и место, куда хочется
            возвращаться.
          </p>
          <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
            Личные предпочтения, удачные решения и ритуалы фиксируются в клубном
            кабинете, чтобы каждый следующий визит начинался не с нуля.
          </p>
          <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
            Если нужен просто недорогой срез кончиков, вокруг достаточно
            салонов. Если нужно своё место в городе — для этого есть клуб
            «Джентльмены Культуры».
          </p>
        </div>
      </section>

      {/* РИТУАЛЫ (услуги + цены) */}
      <section
        id="club"
        className="section section-dark section-rug-photo section-animate"
      >
        <div className="container-custom flex flex-col items-center">
          <div className="w-full max-w-3xl text-center mb-10 mx-auto">
            <p className="label-small text-club-muted mb-2">
              какие ритуалы живут в клубе
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              Мужские стрижки и ритуалы для головы и бороды
            </h2>
            <p className="text-club-soft text-[15px] md:text-base max-w-2xl mx-auto">
              Первый визит, мужская стрижка, борода, аккуратный контур и ночной
              формат для своих — вместо длинного прайса только понятные форматы,
              которые действительно нужны гостям барбершопа Джентльмены Культуры
              на Белозёрской, 4.
            </p>
          </div>

          <div className="w-full max-w-lg space-y-6 mx-auto">
            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2 text-left">
                первый визит
              </p>
              <h3 className="text-lg font-semibold card-dark-title mb-2 text-left">
                «Собрать голову» — первая мужская стрижка в клубе
              </h3>
              <p className="text-[14px] md:text-[15px] card-dark-text mb-3 text-left">
                Ритуал для тех, кто приходит в клуб «Джентльмены Культуры»
                впервые. Консультация, мужская стрижка, мытьё головы, укладка и
                понятные рекомендации, как носить новую форму без стилиста под
                боком.
              </p>
              <p className="text-[13px] text-[var(--accent-gold-soft)] text-left">
                от 1 800 ₽ · около 60 минут · мужская стрижка
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="btn-primary-dark"
                  onClick={() => handleBookWithRitual('Собрать голову')}
                >
                  выбрать этот ритуал
                </button>
              </div>
            </article>

            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2 text-left">
                голова и борода
              </p>
              <h3 className="text-lg font-semibold card-dark-title mb-2 text-left">
                «Собрать образ» — стрижка и борода под один сценарий
              </h3>
              <p className="text-[14px] md:text-[15px] card-dark-text mb-3 text-left">
                Когда голова и борода давно живут разной жизнью. Мастер собирает
                всё в единый образ: мужская стрижка, моделирование бороды,
                форма, линии, длина и уход, чтобы зеркало радовало не только в
                день визита.
              </p>
              <p className="text-[13px] text-[var(--accent-gold-soft)] text-left">
                от 2 800 ₽ · около 90 минут · стрижка + борода
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="btn-primary-dark"
                  onClick={() => handleBookWithRitual('Собрать образ')}
                >
                  выбрать этот ритуал
                </button>
              </div>
            </article>

            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2 text-left">
                быстрый формат
              </p>
              <h3 className="text-lg font-semibold card-dark-title mb-2 text-left">
                «Чистый контур» — освежить линии без полной стрижки
              </h3>
              <p className="text-[14px] md:text-[15px] card-dark-text mb-3 text-left">
                Когда в целом всё устраивает, но поплыл край: виски, шея,
                борода. Небольшой ритуал, чтобы освежить контуры и вернуть
                ощущение собранности без радикальных изменений длины.
              </p>
              <p className="text-[13px] text-[var(--accent-gold-soft)] text-left">
                от 800 ₽ · 30–45 минут · коррекция контура
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="btn-primary-dark"
                  onClick={() => handleBookWithRitual('Чистый контур')}
                >
                  выбрать этот ритуал
                </button>
              </div>
            </article>

            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2 text-left">
                закрытый формат · для своих
              </p>
              <h3 className="text-lg font-semibold card-dark-title mb-2 text-left">
                «Выключить голову» — ночной клубный ритуал
              </h3>
              <p className="text-[14px] md:text-[15px] card-dark-text mb-3 text-left">
                Поздний ритуал для гостей, которые уже успели стать частью
                клуба. Больше времени, мягкий свет, бар и расширенный уход для
                головы и бороды, чтобы выйти не только с новой головой, но и с
                другим состоянием.
              </p>
              <p className="text-[13px] text-[var(--accent-gold-soft)] text-left">
                доступен гостям с историей 5+ визитов · детали и стоимость у
                администратора
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="btn-primary-dark"
                  onClick={() => handleBookWithRitual('Выключить голову')}
                >
                  обсудить ночной ритуал
                </button>
              </div>
            </article>
          </div>

          <div className="mt-10 w-full max-w-lg text-center space-y-2 mx-auto">
            <p className="text-club-soft text-[14px] md:text-[15px]">
              Точные цены и свободные слоты можно уточнить у администратора или
              выбрать ритуал онлайн.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleBookClick}
            >
              выбрать ритуал и записаться
            </button>
          </div>
        </div>
      </section>

      <WorksGallery />

      {/* ИСТОРИИ ГОСТЕЙ (ТИЗЕР) */}
      <section className="section section-paper section-animate">
        <div className="container-custom">
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <p className="label-small text-[var(--text-muted)] mb-2">
              ДО и ПОСЛЕ · истории образов
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark-strong)] mb-3">
              Как меняется образ, когда есть свой клуб
            </h2>
            <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
              Реальные гости клуба «Джентльмены Культуры»: зачем приходили, какой
              ритуал выбрали и с чем ушли.
            </p>
          </div>

          <div className="flex justify-center overflow-x-auto gap-6 pb-2 -mx-4 md:mx-0 px-4 md:px-0">
            {/* карточка 1 */}
            <article className="gallery-item flex-none w-64 md:w-72 h-80 md:h-80 rounded-2xl border border-[#e1d4c4]/60 bg-[#15110d] overflow-hidden relative">
              <img
                src="/images/stories/barbershop-story-first-visit.webp"
                alt="До и после: классическая мужская стрижка и борода"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay absolute inset-0 flex flex-col items-center justify-end px-3 pb-4 md:pb-5 bg-gradient-to-t from-black/65 via-black/20 to-transparent text-[#f3ebe0] text-center">
                <h3 className="text-[13px] font-semibold mb-1 leading-snug tracking-[0.12em] uppercase">
                  «Собрать образ» перед важной встречей
                </h3>
                <p className="text-[12px] text-[#f3ebe0]/85 leading-snug">
                  Мастер: Елена · стрижка + борода, образ для переговоров.
                </p>
              </div>
            </article>

            {/* карточка 2 */}
            <article className="gallery-item flex-none w-64 md:w-72 h-80 md:h-80 rounded-2xl border border-[#e1d4c4]/60 bg-[#15110d] overflow-hidden relative">
              <img
                src="/images/stories/barbershop-story-night-ritual.webp"
                alt="Ночной клубный ритуал с баром и уходом"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay absolute inset-0 flex flex-col items-center justify-end px-3 pb-4 md:pb-5 bg-gradient-to-t from-black/65 via-black/20 to-transparent text-[#f3ebe0] text-center">
                <h3 className="text-[13px] font-semibold mb-1 leading-snug tracking-[0.12em] uppercase">
                  «Выключить голову» после сложной недели
                </h3>
                <p className="text-[12px] text-[#f3ebe0]/85 leading-snug">
                  Мастер: Роман · ночной формат, расширенный уход и бар.
                </p>
              </div>
            </article>

            {/* карточка 3 */}
            <article className="gallery-item flex-none w-64 md:w-72 h-80 md:h-80 rounded-2xl border border-[#e1d4c4]/60 bg-[#15110d] overflow-hidden relative">
              <img
                src="/images/stories/barbershop-story-clean-contour.webp"
                alt="Чистый контур бороды и висков"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay absolute inset-0 flex flex-col items-center justify-end px-3 pb-4 md:pb-5 bg-gradient-to-t from-black/65 via-black/20 to-transparent text-[#f3ebe0] text-center">
                <h3 className="text-[13px] font-semibold mb-1 leading-snug tracking-[0.12em] uppercase">
                  «Чистый контур» вместо полной стрижки
                </h3>
                <p className="text-[12px] text-[#f3ebe0]/85 leading-snug">
                  Мастер: Максим · обновили линии, оставили длину.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
              onClick={() => {
                window.location.href = '/stories';
              }}
            >
              смотреть все истории
            </button>
          </div>
        </div>
      </section>

      {/* МАСТЕРА */}
      <section id="masters" className="section section-paper section-animate">
        <div className="container-custom">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="label-small text-[var(--text-muted)] mb-2">
              совет клуба джентльмены культуры
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-dark-strong)]">
              Мастера барбершопа «Джентльмены Культуры» в Нижнем Новгороде
            </h2>
            <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
              Не случайные мастера по графику, а команда с характером и вкусом.
              Вы выбираете не кресло — вы выбираете человека, которому готовы
              доверить голову и бороду.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Елена */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between bg-[var(--paper-bg)]">
              <div className="border-b border-[var(--card-border)] pb-4 mb-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/elena.jpg"
                    alt="ТОП‑барбер Елена"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted-strong)]">
                    ТОП барбер
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark-strong)]">
                    Елена
                  </h3>
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--text-dark)] mb-4">
                Видит детали, которые другие пропускают. Любит чистые формы,
                аккуратные переходы и естественную укладку, которую легко
                повторить дома.
              </p>
              <button
                type="button"
                className="text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={() => handleBookWithMaster('Елена')}
              >
                записаться к елене
              </button>
            </article>

            {/* Максим */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between bg-[var(--paper-bg)]">
              <div className="border-b border-[var(--card-border)] pb-4 mb-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/maksim.jpg"
                    alt="ТОП‑барбер Максим"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted-strong)]">
                    ТОП барбер
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark-strong)]">
                    Максим
                  </h3>
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--text-dark)] mb-4">
                Спокойный характер и уверенная рука. Делает современные стрижки
                и фейды без лишнего шоу, когда важнее результат, а не разговоры.
              </p>
              <button
                type="button"
                className="text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={() => handleBookWithMaster('Максим')}
              >
                записаться к максиму
              </button>
            </article>

            {/* Алексей */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between bg-[var(--paper-bg)]">
              <div className="border-b border-[var(--card-border)] pb-4 mb-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/aleksei.jpg"
                    alt="ТОП‑барбер Алексей"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted-strong)]">
                    ТОП барбер
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark-strong)]">
                    Алексей
                  </h3>
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--text-dark)] mb-4">
                Отвечает за образ целиком: стрижка, борода, линии — чтобы всё
                собиралось в одну картинку без крайностей и перегибов.
              </p>
              <button
                type="button"
                className="text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={() => handleBookWithMaster('Алексей')}
              >
                записаться к алексею
              </button>
            </article>

            {/* Роман */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between bg-[var(--paper-bg)]">
              <div className="border-b border-[var(--card-border)] pb-4 mb-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/roman.jpg"
                    alt="Арт‑директор Роман"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted-strong)]">
                    арт‑директор клуба
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark-strong)]">
                    Роман
                  </h3>
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--text-dark)] mb-4">
                Отвечает за почерк клуба и сложные запросы. Настраивает форму
                под характер и образ жизни, курирует ночные форматы и обучает
                команду.
              </p>
              <button
                type="button"
                className="text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={() => handleBookWithMaster('Роман')}
              >
                записаться к роману
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="media" className="section section-dark section-animate">
        <div className="container-custom">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="label-small text-club-muted mb-2">
              голоса гостей клуба
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              5.0 по отзывам гостей «Джентльменов Культуры» в Нижнем Новгороде
            </h2>
            <p className="text-club-soft text-[14px] md:text-[15px]">
              Здесь — короткая выборка отзывов о клубе на Белозёрской, 4.
              Полные списки всегда можно посмотреть на Яндекс Картах и в 2ГИС.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">
            <a
              href="https://yandex.ru/maps/org/dzhentlmeny_kultury/101569682800/reviews/?ll=43.875272%2C56.348966&z=17"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[12px] uppercase tracking-[0.16em] text-club-soft hover:bg-white/10 transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#ffcc00]" />
              все отзывы о клубе на яндекс картах
            </a>
            <a
              href="https://2gis.ru/n_novgorod/firm/70000001080133566/tab/reviews"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[12px] uppercase tracking-[0.16em] text-club-soft hover:bg-white/10 transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#00b25c]" />
              все отзывы о клубе в 2ГИС
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviewsLoading && (
              <p className="text-club-muted text-center col-span-full">
                Загружаем отзывы гостей…
              </p>
            )}

            {!reviewsLoading && reviewsError && (
              <p className="text-club-soft text-center col-span-full text-[14px]">
                Отзывы временно недоступны, но клуб продолжает жить своей
                атмосферой — скоро всё вернём.
              </p>
            )}

            {!reviewsLoading && !reviewsError && reviews.length === 0 && (
              <p className="text-club-soft text-center col-span-full text-[14px]">
                Пока нет опубликованных отзывов, но гости уже оставляют
                впечатления в клубе.
              </p>
            )}

            {!reviewsLoading &&
              !reviewsError &&
              reviews.map((review) => {
                const formattedDate = review.date
                  ? new Date(
                      review.date + 'T00:00:00',
                    ).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : null;

                return (
                  <article
                    key={review.id}
                    className="card-glass px-6 py-6 flex flex-col justify-between hover-lift"
                  >
                    <p className="text-[14px] card-dark-text italic mb-4">
                      «{review.text}»
                    </p>
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <p className="text-[var(--accent-gold-soft)] font-semibold text-[14px]">
                          {review.author || 'Гость клуба'}
                        </p>
                        <p className="text-[12px] text-club-muted mt-1">
                          {getSourceLabel(review.source)}
                          {formattedDate ? ` • ${formattedDate}` : ''}
                        </p>
                      </div>
                      <p className="text-[var(--accent-red)] text-[14px]">
                        {'★'.repeat(review.rating)}
                      </p>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      </section>

      {/* ВИТРИНЫ С ФОТО */}
      <section id="cards" className="section section-paper section-animate">
        <div className="container-custom">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <p className="label-small text-[var(--text-muted)] mb-2">
              клубные подборки
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark-strong)] mb-3">
              Истории, ритуалы и рекомендации в одном месте
            </h2>
            <p className="text-[14px] md:text-[15px] text-[var(--text-muted)]">
              Вместо длинного меню — три витрины, с которых проще всего начать
              знакомство с клубом.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="card-showcase hover-lift">
              <div className="card-showcase-media">
                <img
                  src="/images/club/detail-rituals.jpg"
                  alt="Рабочее место барбера и инструменты"
                  className="image-hover"
                  loading="lazy"
                />
              </div>
              <div className="card-showcase-body">
                <div>
                  <h3 className="text-[14px] font-semibold tracking-[0.12em] uppercase">
                    Ритуальная карта
                  </h3>
                  <p className="card-showcase-text">
                    Все форматы клубных ритуалов — от первого визита до ночного
                    «Выключить голову».
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-4 text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
                  onClick={() => {
                    window.location.href = '/rituals';
                  }}
                >
                  перейти к ритуалам
                </button>
              </div>
            </article>

            <article className="card-showcase hover-lift">
              <div className="card-showcase-media">
                <img
                  src="/images/club/detail-stories.jpg"
                  alt="Процесс стрижки в кресле"
                  className="image-hover"
                  loading="lazy"
                />
              </div>
              <div className="card-showcase-body">
                <div>
                  <h3 className="text-[14px] font-semibold tracking-[0.12em] uppercase">
                    Истории гостей
                  </h3>
                  <p className="card-showcase-text">
                    Короткие сюжеты о том, зачем мужчины приходят в клуб и с чем
                    уходят после ритуала.
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-4 text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
                  onClick={() => {
                    window.location.href = '/stories';
                  }}
                >
                  читать истории
                </button>
              </div>
            </article>

            <article className="card-showcase hover-lift">
              <div className="card-showcase-media">
                <img
                  src="/images/club/detail-cabinet.jpg"
                  alt="Уютный уголок клуба и полка с уходом"
                  className="image-hover"
                  loading="lazy"
                />
              </div>
              <div className="card-showcase-body">
                <div>
                  <h3 className="text-[14px] font-semibold tracking-[0.12em] uppercase">
                    Клубный кабинет
                  </h3>
                  <p className="card-showcase-text">
                    История визитов, мастера и персональные рекомендации по
                    уходу в одном личном кабинете.
                  </p>
                </div>
                <button
                  type="button"
                  className="text-[12px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
                  onClick={() => {
                    window.location.href = '/cabinet';
                  }}
                >
                  войти в кабинет
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ КЛУБА */}
      <section className="section section-paper section-animate">
        <div className="container-custom max-w-3xl">
          <p className="label-small text-[var(--text-muted)] mb-2">
            ответы до звонка
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark-strong)] mb-5">
            Частые вопросы о клубе
          </h2>

          <div className="space-y-4 text-[14px] md:text-[15px] text-[var(--text-muted)]">
            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Работаете по записи или можно прийти без звонка?
              </summary>
              <p className="mt-2">
                Клуб работает только по предварительной записи. Так мы держим
                ритм и не сажаем гостей в живую очередь у стойки администратора.
              </p>
            </details>

            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Сколько по времени длится визит?
              </summary>
              <p className="mt-2">
                «Собрать голову» — около 60 минут, «Собрать образ» — до 90
                минут, «Чистый контур» — 30–45 минут. Ночной ритуал обсуждается
                отдельно.
              </p>
            </details>

            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Можно ли прийти с ребёнком или семьёй?
              </summary>
              <p className="mt-2">
                Клуб создавался как пространство 18+. Если нужен формат для
                подростка — уточните у администратора, подберём подходящее время
                и мастера.
              </p>
            </details>

            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Как отменить или перенести запись?
              </summary>
              <p className="mt-2">
                Просто напишите администратору в мессенджер или позвоните
                минимум за 3 часа до визита — так мы успеем предложить слот
                другому гостю.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ПОДАРОЧНЫЙ СЕРТИФИКАТ */}
      <section className="section section-dark section-animate">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Левая колонка */}
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
              onClick={handleBookClick}
            >
              оформить сертификат
            </button>
          </div>

          {/* Правая колонка: фото сертификата */}
          <div className="card-paper-lifted p-6">
            <div className="border border-[var(--card-border)] rounded-xl overflow-hidden bg-[var(--paper-bg)]">
              <img
                src="/images/club/gift-certificate-preview.jpg"
                alt="Подарочный сертификат клуба «Джентльмены Культуры»"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section id="contacts" className="section section-dark section-animate">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <p className="label-small text-club-muted mb-3">
            готовы зайти в клуб?
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Оставьте заявку — подберём время и ритуал под ваш вечер
          </h2>
          <p className="text-club-soft text-[14px] md:text-[15px] mb-6">
            Напишите или позвоните администратору, если сложно выбрать формат
            онлайн. Подскажем мастера, ритуал и время, чтобы первый визит сразу
            попал в точку.
          </p>

          <button
            type="button"
            className="btn-primary mb-3"
            onClick={handleBookClick}
          >
            записаться онлайн
          </button>

          <p className="text-club-soft text-[14px]">
            или по телефону{' '}
            <a
              href="tel:+79877553000"
              className="text-[var(--accent-gold-soft)] hover:opacity-80 transition-colors"
            >
              +7 987 755 30 00
            </a>
          </p>
        </div>
      </section>

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
