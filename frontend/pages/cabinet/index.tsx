// pages/cabinet/index.tsx
import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';

export default function CabinetPage() {
  const guestName = 'Гость клуба';
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookClick = () => setIsBookingOpen(true);
  const handleCloseModal = () => setIsBookingOpen(false);

  return (
    <>
      <Head>
        <title>Личный кабинет — Gentlemen Barbershop Club</title>
        <meta
          name="description"
          content="Личный кабинет гостя Gentlemen Barbershop Club: история визитов, выбранные мастера, ритуалы, рекомендации по уходу и ближайшие записи в барбершопе на Белозёрской, 4."
        />
        <meta
          name="keywords"
          content="личный кабинет барбершоп, история визитов gentlemen, мои мастера, рекомендации по уходу, клубный кабинет gentlemen"
        />
        <link rel="canonical" href="https://gentlemen-nn.ru/cabinet" />
      </Head>

      <Header onBookClick={handleBookClick} />

      {/* HERO */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top,#5b1412_0,#050307_60%)] opacity-80" />
        </div>

        <div className="container-custom relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-[10px] uppercase tracking-[0.18em] text-amber-300">
              скоро
            </span>
            <p className="label-small text-club-muted">
              личный кабинет клуба
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Место, где ваши визиты
            <br />
            складываются в историю.
          </h1>

          <div className="space-y-3 text-sm md:text-base text-club-soft">
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
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8 items-start">
          {/* SIDEBAR */}
          <aside className="space-y-4">
            <div className="card-paper-lifted p-5 space-y-2">
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

            <nav className="card-paper p-4 space-y-2 text-sm">
              <p className="label-small text-[var(--text-muted)] mb-1">
                разделы кабинета
              </p>
              <button className="w-full text-left py-2.5 px-3 rounded-md bg-[var(--text-dark)] text-white text-[11px] tracking-[0.16em] uppercase">
                ближайшие визиты
              </button>
              <button className="w-full text-left py-2.5 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--text-dark)]">
                История посещений
              </button>
              <button className="w-full text-left py-2.5 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--text-dark)]">
                Мои мастера
              </button>
              <button className="w-full text-left py-2.5 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--text-dark)]">
                Рекомендации по уходу
              </button>
              <button className="w-full text-left py-2.5 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--text-dark)]">
                Настройки профиля
              </button>
            </nav>

            <div className="card-paper p-5 text-sm space-y-3">
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
            <section className="card-paper-lifted p-6 space-y-4">
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
            <section className="card-paper-lifted p-6 space-y-4">
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
            <section className="card-paper-lifted p-6 space-y-4">
              <div>
                <p className="label-small text-[var(--text-muted)]">
                  мои мастера
                </p>
                <h2 className="text-lg font-semibold text-[var(--text-dark)]">
                  Те, кому вы доверяете голову
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <div className="rounded-xl border border-dashed border-[var(--text-muted)]/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] mb-2">
                    основной мастер
                  </p>
                  <p className="text-[13px]">
                    Как только вы начнёте регулярно ходить к одному человеку, он
                    появится здесь — вместе с быстрыми кнопками записи.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-[var(--text-muted)]/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] mb-2">
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
            <section className="card-paper-lifted p-6 space-y-4">
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
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Хотите, чтобы у вашей стрижки была память?
          </h2>
          <p className="text-sm md:text-base text-club-soft mb-6">
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
          <p className="text-club-soft text-sm">
            или по телефону{' '}
            <a
              href="tel:+79877553000"
              className="text-[var(--accent-gold-soft)] hover:opacity-80 transition-colors"
            >
              +7 987 755 30 00
            </a>
          </p>
          <p className="text-club-soft text-[11px] mt-3">
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
