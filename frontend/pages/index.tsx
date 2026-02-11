// pages/index.tsx
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import ClubMap from '../components/ClubMap';
import WorksGallery from '../components/WorksGallery';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ContactWidget from '../components/ContactWidget';

type ReviewSource = 'yandex' | '2gis' | 'site';

interface Review {
  id: number;
  author: string;
  source: ReviewSource;
  rating: number;
  text: string;
}

function getSourceLabel(source: ReviewSource) {
  if (source === 'yandex') return 'Яндекс Карты';
  if (source === '2gis') return '2ГИС';
  return 'Сайт клуба';
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const firstFieldRef = useRef<HTMLButtonElement | null>(null);

  const handleBookClick = () => setIsBookingOpen(true);
  const handleCloseModal = () => setIsBookingOpen(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('http://localhost:8000/reviews/');
        const data = (await res.json()) as Review[];
        setReviews(data);
      } catch (e) {
        console.error('Failed to load reviews', e);
      } finally {
        setReviewsLoading(false);
      }
    }

    loadReviews();
  }, []);

  return (
    <>
      <Header onBookClick={handleBookClick} />

      {/* ========== HERO ========== */}
      <section
        id="hero"
        className="section section-dark relative overflow-hidden section-animate"
      >
        <div className="absolute inset-0 hero-glow-layer">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top,#5b1412_0,#050307_60%)] opacity-80" />
        </div>

        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Текст */}
          <div className="space-y-6 max-w-xl">
            <p className="label-small text-club-muted">
              мужской барбершоп‑клуб · нижний новгород
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-xl">
              Закрытый мужской клуб стрижек и ритуалов для тех, кто ценит себя
            </h1>

            <p className="text-club-soft text-sm md:text-base">
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

            <p className="text-[11px] text-club-muted max-w-md">
              Только по предварительной записи · ул. Белозёрская, 4 ·
              пространство 18+ с уважением к личному времени и ритуалам гостей.
            </p>
          </div>

          {/* Фото + стеклянная карточка */}
          <div className="space-y-4">
            <figure className="card-dark overflow-hidden">
              <picture>
                <source
                  srcSet="/images/club/club-main.webp"
                  type="image/webp"
                />
                <img
                  src="/images/club/club-main.jpg"
                  alt="Интерьер барбершоп‑клуба Gentlemen на Белозёрской"
                  className="hero-image"
                  loading="lazy"
                />
              </picture>
              <figcaption className="sr-only">
                Интерьер барбершоп‑клуба Gentlemen на Белозёрской
              </figcaption>
            </figure>

            <div className="card-glass px-6 py-5">
              <div className="flex items-center justify-between mb-3">
                <p className="label-small text-club-muted">
                  клубный формат · only by invitation
                </p>
                <span className="label-small text-[var(--accent-gold)]">
                  только по записи
                </span>
              </div>
              <div className="space-y-2 text-sm card-dark-text">
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

      {/* ========== УТП / ПРЕИМУЩЕСТВА ========== */}
      <section className="section section-paper section-animate">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-6">
            Почему выбирают Gentlemen
          </h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h3 className="text-base font-semibold mb-2">Персональный подход</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Запоминаем ваши предпочтения, удачные решения и историю образа.
              </p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✂️</div>
              <h3 className="text-base font-semibold mb-2">Мастера экстра‑класса</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Опыт от 5 лет, внутренняя школа и единые стандарты клуба.
              </p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🕐</div>
              <h3 className="text-base font-semibold mb-2">Строго по времени</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Не опаздываем и планируем ритуалы так, чтобы вы не сидели в очереди.
              </p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🍷</div>
              <h3 className="text-base font-semibold mb-2">Атмосфера клуба</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Бар, мягкий свет и гости, которым близок спокойный формат без суеты.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ========== МАНИФЕСТ ========== */}
      <section className="section section-wave-top section-animate">
        <div className="container-custom max-w-4xl space-y-7">
          <p className="label-small text-[var(--accent-red)]">манифест клуба</p>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-[var(--text-dark)] max-w-3xl">
            Мы не просто стрижём — мы строим отношения с гостями клуба
          </h2>

          <p className="text-sm text-[var(--text-muted)]">
            Мы не продаём ещё одну стрижку по записи. Каждый визит — часть истории:
            любимый мастер, понятный образ и место, куда хочется возвращаться.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Личные предпочтения, удачные решения и ритуалы фиксируются в клубном
            кабинете, чтобы каждый следующий визит начинался не с нуля.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Если нужен просто недорогой срез кончиков, вокруг достаточно салонов.
            Если нужно своё место в городе — для этого есть Gentlemen.
          </p>
        </div>
      </section>


      {/* ========== РИТУАЛЫ ========== */}
      <section
        id="club"
        className="section section-dark section-rug-photo section-animate"
      >
        <div className="container-custom">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="label-small text-club-muted mb-2">
              какие ритуалы живут в клубе
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              Форматы, которыми мы собираем образ
            </h2>
            <p className="text-club-soft text-sm md:text-base">
              Первый визит, голова и борода, аккуратный контур и ночной формат
              для своих — вместо длинного прайса только то, что действительно
              нужно гостям клуба.
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2">первый визит</p>
              <h3 className="text-lg font-semibold card-dark-title mb-2">
                «Собрать голову»
              </h3>
              <p className="text-sm card-dark-text mb-3">
                Ритуал для тех, кто приходит в клуб впервые. Консультация,
                стрижка, мойка, укладка и понятные рекомендации, как носить
                новую форму без стилиста под боком.
              </p>
              <p className="text-xs text-[var(--accent-gold-soft)]">
                от 1 800 ₽ · около 60 минут
              </p>
            </article>

            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2">
                голова и борода
              </p>
              <h3 className="text-lg font-semibold card-dark-title mb-2">
                «Собрать образ»
              </h3>
              <p className="text-sm card-dark-text mb-3">
                Когда голова и борода давно живут разной жизнью. Мастер
                собирает всё в единый образ: форма, линии, длина и уход, чтобы
                зеркало радовало не только в день стрижки.
              </p>
              <p className="text-xs text-[var(--accent-gold-soft)]">
                от 2 800 ₽ · около 90 минут
              </p>
            </article>

            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2">быстрый формат</p>
              <h3 className="text-lg font-semibold card-dark-title mb-2">
                «Чистый контур»
              </h3>
              <p className="text-sm card-dark-text mb-3">
                Когда в целом всё устраивает, но поплыл край: виски, шея,
                борода. Небольшой ритуал, чтобы освежить линии и вернуть
                ощущение собранности без радикальных перемен.
              </p>
              <p className="text-xs text-[var(--accent-gold-soft)]">
                от 800 ₽ · 30–45 минут
              </p>
            </article>

            <article className="card-glass hover-lift px-6 py-6 ritual-card">
              <p className="label-small text-club-muted mb-2">
                закрытый формат · для своих
              </p>
              <h3 className="text-lg font-semibold card-dark-title mb-2">
                «Выключить голову»
              </h3>
              <p className="text-sm card-dark-text mb-3">
                Поздний ритуал для гостей, которые уже успели стать частью
                клуба. Больше времени, мягкий свет, бар и расширенный уход,
                чтобы выйти не только с новой головой, но и с другим
                состоянием.
              </p>
              <p className="text-xs text-[var(--accent-gold-soft)]">
                доступен гостям с историей 5+ визитов · детали у администратора
              </p>
            </article>
          </div>

          <div className="mt-10 text-center">
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

      {/* ========== ИСТОРИИ ГОСТЕЙ (ТИЗЕР) ========== */}
      <section className="section section-paper section-animate">
        <div className="container-custom">
          <div className="mb-8 max-w-3xl">
            <p className="label-small text-[var(--text-muted)] mb-2">
              до и после · истории образов
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-3">
              Как меняется образ, когда есть свой клуб
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)]">
              Реальные гости Gentlemen: зачем приходили, какой ритуал выбрали и с чем ушли.
            </p>
          </div>

          <div className="gallery-grid">
            <article className="gallery-item">
              <img
                src="/images/stories/story-1.jpg"
                alt="До и после: классическая стрижка и борода"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <h3 className="text-sm font-semibold mb-1">
                  «Собрать образ» перед важной встречей
                </h3>
                <p className="text-xs text-[#f3ebe0]">
                  Мастер: Елена · стрижка + борода, образ для переговоров.
                </p>
              </div>
            </article>

            <article className="gallery-item">
              <img
                src="/images/stories/story-2.jpg"
                alt="Ночной ритуал в клубе Gentlemen"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <h3 className="text-sm font-semibold mb-1">
                  «Выключить голову» после сложной недели
                </h3>
                <p className="text-xs text-[#f3ebe0]">
                  Мастер: Роман · ночной формат, расширенный уход и бар.
                </p>
              </div>
            </article>

            <article className="gallery-item">
              <img
                src="/images/stories/story-3.jpg"
                alt="Чистый контур бороды"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <h3 className="text-sm font-semibold mb-1">
                  «Чистый контур» вместо полной стрижки
                </h3>
                <p className="text-xs text-[#f3ebe0]">
                  Мастер: Максим · обновили линии, оставили длину.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
              onClick={() => {
                window.location.href = '/stories';
              }}
            >
              смотреть все истории
            </button>
          </div>
        </div>
      </section>


      {/* ========== МАСТЕРА ========== */}
      <section id="masters" className="section section-dark section-animate">
        <div className="container-custom">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="label-small text-club-muted mb-2">
              совет клуба gentlemen
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              Люди, которым не страшно доверить голову
            </h2>
            <p className="text-club-soft text-sm md:text-base">
              Не случайные мастера по графику, а команда с характером и вкусом.
              Вы выбираете не кресло — вы выбираете человека.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Елена */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/elena.jpg"
                    alt="ТОП‑барбер Елена"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted)]">
                    ТОП барбер
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                    Елена
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Видит детали, которые другие пропускают. Любит чистые формы,
                аккуратные переходы и естественную укладку, которую легко
                повторить дома.
              </p>
              <button
                type="button"
                className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={handleBookClick}
              >
                записаться к елене
              </button>
            </article>

            {/* Максим */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/maksim.jpg"
                    alt="ТОП‑барбер Максим"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted)]">
                    ТОП барбер
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                    Максим
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Спокойный характер и уверенная рука. Делает современные стрижки
                и фейды без лишнего шоу, когда важнее результат, а не разговоры.
              </p>
              <button
                type="button"
                className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={handleBookClick}
              >
                записаться к максиму
              </button>
            </article>

            {/* Алексей */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/aleksei.jpg"
                    alt="ТОП‑барбер Алексей"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted)]">
                    ТОП барбер
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                    Алексей
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Отвечает за образ целиком: стрижка, борода, линии — чтобы всё
                собиралось в одну картинку без крайностей и перегибов.
              </p>
              <button
                type="button"
                className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={handleBookClick}
              >
                записаться к алексею
              </button>
            </article>

            {/* Роман */}
            <article className="card-paper-lifted hover-lift p-6 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/images/masters/roman.jpg"
                    alt="Арт‑директор Роман"
                    className="w-full h-full object-cover master-photo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="label-small text-[var(--text-muted)]">
                    арт‑директор клуба
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                    Роман
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Отвечает за почерк клуба и сложные запросы. Настраивает форму
                под характер и образ жизни, курирует ночные форматы и обучает
                команду.
              </p>
              <button
                type="button"
                className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                onClick={handleBookClick}
              >
                записаться к роману
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* ========== ОТЗЫВЫ ========== */}
      <section id="media" className="section section-dark section-animate">
        <div className="container-custom">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="label-small text-club-muted mb-2">
              голоса гостей клуба
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              5.0 по отзывам тех, кто уже стал своим
            </h2>
            <p className="text-club-soft text-sm md:text-base">
              Когда делаешь не как у всех, а по‑своему и на совесть, это
              выливается в расписание, заполненное заранее, и рекомендации из
              уст в уста.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsLoading && (
              <p className="text-club-muted text-center col-span-full">
                Загружаем отзывы гостей…
              </p>
            )}

            {!reviewsLoading &&
              reviews.map((review) => (
                <article
                  key={review.id}
                  className="card-glass px-6 py-6 flex flex-col justify-between hover-lift"
                >
                  <p className="text-sm card-dark-text italic mb-4">
                    «{review.text}»
                  </p>
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <p className="text-[var(--accent-gold-soft)] font-semibold text-sm">
                        {review.author || 'Гость клуба'}
                      </p>
                      <p className="text-[11px] text-club-muted mt-1">
                        {getSourceLabel(review.source)}
                      </p>
                    </div>
                    <p className="text-[var(--accent-red)] text-sm">
                      {'★'.repeat(review.rating)}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* ========== БЛОК 5: ВИТРИНЫ С ФОТО ========== */}
      <section id="cards" className="section section-paper section-animate">
        <div className="container-custom">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <p className="label-small text-[var(--text-muted)] mb-2">
              клубные подборки
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)] mb-3">
              Истории, ритуалы и рекомендации в одном месте
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)]">
              Вместо бесконечных пунктов меню — три карты, с которых удобно
              начать знакомство с клубом: ритуалы, истории гостей и личный кабинет.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ритуалы */}
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
                <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">
                  Ритуальная карта
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] mb-3">
                  Все клубные ритуалы в одном месте: от первого визита до ночного
                  формата «Выключить голову».
                </p>
                <button
                  type="button"
                  className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
                  onClick={() => {
                    window.location.href = '/rituals';
                  }}
                >
                  перейти к ритуалам
                </button>
              </div>
            </article>

            {/* Истории гостей */}
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
                <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">
                  Истории гостей
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] mb-3">
                  Живые сюжеты: зачем мужчины приходят в клуб и с каким
                  ощущением выходят в ночь после ритуала.
                </p>
                <button
                  type="button"
                  className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
                  onClick={() => {
                    window.location.href = '/stories';
                  }}
                >
                  читать истории
                </button>
              </div>
            </article>

            {/* Личный кабинет */}
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
                <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">
                  Клубный кабинет
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] mb-3">
                  История визитов, любимые мастера и персональные рекомендации
                  по уходу — всё собрано в одном месте.
                </p>
                <button
                  type="button"
                  className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80"
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

      {/* ========== FAQ КЛУБА ========== */}
      <section className="section section-paper section-animate">
        <div className="container-custom max-w-3xl">
          <p className="label-small text-[var(--text-muted)] mb-2">
            ответы до звонка
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-5">
            Частые вопросы о клубе
          </h2>

          <div className="space-y-4 text-sm md:text-base text-[var(--text-muted)]">
            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Работаете по записи или можно прийти без звонка?
              </summary>
              <p className="mt-2">
                Клуб работает только по предварительной записи. Так мы держим ритм и
                не сажаем гостей в живую очередь у стойки администратора.
              </p>
            </details>

            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Сколько по времени длится визит?
              </summary>
              <p className="mt-2">
                «Собрать голову» — около 60 минут, «Собрать образ» — до 90 минут,
                «Чистый контур» — 30–45 минут. Ночной ритуал обсуждается отдельно.
              </p>
            </details>

            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Можно ли прийти с ребёнком или семьёй?
              </summary>
              <p className="mt-2">
                Клуб создавался как пространство 18+. Если нужен формат для подростка —
                уточните у администратора, подберём подходящее время и мастера.
              </p>
            </details>

            <details className="rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-[var(--text-dark-strong)]">
                Как отменить или перенести запись?
              </summary>
              <p className="mt-2">
                Просто напишите администратору в мессенджер или позвоните минимум за
                3 часа до визита — так мы успеем предложить слот другому гостю.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ========== ПОДАРОЧНЫЙ СЕРТИФИКАТ ========== */}
      <section className="section section-dark section-animate">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="label-small text-club-muted mb-2">
              подарок, который точно используют
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Подарочные сертификаты клуба Gentlemen
            </h2>
            <p className="text-club-soft text-sm md:text-base mb-4">
              Сертификат на ритуал или сумму — спокойный способ подарить человеку
              время на себя: стрижка, борода, уход и клубная атмосфера вместо очередного сувенира.
            </p>
            <ul className="text-club-soft text-sm space-y-1 mb-5">
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

          <div className="card-paper-lifted p-6">
            <div className="border border-[var(--card-border)] rounded-xl px-5 py-4 bg-[var(--paper-bg)]">
              <p className="label-small text-[var(--text-muted)] mb-3">
                пример сертификата
              </p>
              <p className="text-lg font-semibold text-[var(--text-dark-strong)] mb-1">
                Gentlemen Barbershop Club
              </p>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Подарочный сертификат на клубный ритуал «Собрать образ» или услуги на сумму 3&nbsp;000 ₽.
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Дата выдачи, номер сертификата и условия использования указываются при оформлении.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ФИНАЛЬНЫЙ CTA ========== */}
      <section
        id="contacts"
        className="section section-dark section-animate"
      >
        <div className="container-custom text-center max-w-2xl mx-auto">
          <p className="label-small text-club-muted mb-3">
            готовы зайти в клуб?
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Оставьте заявку — подберём время и ритуал под ваш вечер
          </h2>
          <p className="text-club-soft text-sm md:text-base mb-6">
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

          <p className="text-club-soft text-sm">
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
      />

      <ScrollToTopButton />
      <ContactWidget />
    </>
  );
}
