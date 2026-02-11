// pages/rituals.tsx
import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

type Ritual = {
  id: number;
  title: string;
  label: string;
  duration: string;
  price: string;
  description: string;
  details: string;
};

const rituals: Ritual[] = [
  {
    id: 1,
    label: 'классика клуба',
    title: 'Стрижка Gentlemen',
    duration: '60 минут',
    price: '1 800 ₽',
    description:
      'Спокойная, аккуратная мужская стрижка без экспериментов ради экспериментов. Чтобы утром вы узнали себя в зеркале — только свежее.',
    details:
      'Обсуждаем, чем вы живёте день, как носите волосы и что точно не хочется видеть на голове. Мастер подстраивает форму под ваш стиль жизни, а не под тренд в ленте.',
  },
  {
    id: 2,
    label: 'полный образ',
    title: 'Стрижка + борода',
    duration: '90 минут',
    price: '2 800 ₽',
    description:
      'Час с лишним, чтобы привести в порядок и голову, и бороду. Без спешки, с вниманием к мелочам и линии роста волос.',
    details:
      'Форма бороды подчёркивает лицо, а не прячет его. Мастер объясняет, как поддерживать результат между визитами, чтобы вы не зависели от одной удачной записи.',
  },
  {
    id: 3,
    label: 'ритуал для себя',
    title: 'Королевское бритьё',
    duration: '60 минут',
    price: '2 200 ₽',
    description:
      'Тёплые полотенца, масла, пена и аккуратная работа опасной бритвой — не ради шоу, а ради ощущения «наконец‑то обо мне позаботились».',
    details:
      'Если вы обычно «на бегу» проходите мимо зеркала, этот час — редкая возможность остановиться. Многие гости возвращаются на бритьё, даже когда бороды уже нет.',
  },
  {
    id: 4,
    label: 'обновить форму',
    title: 'Уход за бородой',
    duration: '40 минут',
    price: '1 200 ₽',
    description:
      'Чёткая линия, симметрия и длина, с которой комфортно жить каждый день, а не только в день визита.',
    details:
      'Подбираем форму под черты лица и привычки: кто‑то любит идеальную геометрию, кто‑то — живой, немного небрежный образ. В клубе есть варианты для обоих.',
  },
];

export default function RitualsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);

  const handleBookClick = (ritualTitle?: string) => {
    setSelectedRitual(ritualTitle ?? null);
    setIsBookingOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingOpen(false);
    setSelectedRitual(null);
  };

  return (
    <>
      <Head>
        <title>Ритуалы — барбершоп Gentlemen в Нижнем Новгороде</title>
        <meta
          name="description"
          content="Ритуалы Gentlemen Barbershop Club в Нижнем Новгороде: мужская стрижка, стрижка + борода, уход за бородой и королевское бритьё в клубной атмосфере без спешки."
        />
        <meta
          name="keywords"
          content="барбершоп ритуалы, стрижка gentlemen, стрижка и борода, королевское бритьё нижний новгород, уход за бородой клуб"
        />
        <link rel="canonical" href="https://gentlemen-nn.ru/rituals" />
      </Head>

      <Header onBookClick={() => handleBookClick()} />

      {/* HERO: что такое ритуал в клубе */}
      <section className="section section-paper section-animate">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="label-small text-club-muted">
            ритуалы барбершоп‑клуба Gentlemen
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)]">
            Не «услуги по прайсу», а привычные ритуалы для нормальной жизни.
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Мы называем это ритуалами, а не просто «стрижкой» или «бритьём».
            В кресле вы не отрабатываете талон — вы берёте час, который работает
            на образ, уверенность и спокойную голову.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Здесь нет навязанных «доп. услуг» и непонятных строк в чеке — только
            ясные форматы: выбрали ритуал под задачу, остальное сделает мастер
            барбершопа Gentlemen.
          </p>
        </div>
      </section>

      {/* СЕКЦИЯ РИТУАЛОВ — тёмный клубный фон */}
      <section className="section section-rituals section-animate">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="label-small text-club-muted mb-2">
              что конкретно мы делаем
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              Ритуалы, с которых удобно начать знакомство с клубом.
            </h2>
            <p className="text-club-soft text-sm md:text-base">
              Можно прийти с конкретным запросом — «стрижка как в прошлый раз»,
              а можно просто рассказать, как вы живёте день. Администратор и
              мастер подскажут, с какого ритуала начать: со стрижки, бороды
              или королевского бритья.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {rituals.map((ritual) => (
              <article key={ritual.id} className="ritual-card hover-lift">
                <p className="label-small text-club-muted mb-2">
                  {ritual.label}
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-[var(--text-dark-strong)] mb-1">
                  {ritual.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-club-muted">
                  <span className="inline-flex items-center gap-1">
                    <span className="feature-item-icon">⏱</span>
                    <span>{ritual.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="feature-item-icon">₽</span>
                    <span>{ritual.price}</span>
                  </span>
                </div>

                <p className="text-sm text-[var(--text-dark-strong)] mb-3">
                  {ritual.description}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-5">
                  {ritual.details}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    type="button"
                    className="btn-primary-dark"
                    onClick={() => handleBookClick(ritual.title)}
                  >
                    записаться на ритуал
                  </button>
                  <p className="text-[11px] text-club-soft max-w-xs">
                    В комментарии к записи можно указать, что важно учесть:
                    привычки по уходу, ограничения по времени или формат общения.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA перед футером */}
      <section className="section section-paper section-animate">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)] mb-4">
            Выберите ритуал — остальное мы возьмём на себя.
          </h2>
          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-2xl mx-auto mb-6">
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
        initialContext={
          selectedRitual ? { ritualName: selectedRitual } : undefined
        }
      />
    </>
  );
}
