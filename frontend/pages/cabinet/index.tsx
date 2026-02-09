// pages/cabinet/index.tsx
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function CabinetPage() {
  const guestName = 'Гость клуба'

  return (
    <>
      <Header />

      {/* HERO: что такое кабинет (светлый) */}
      <section className="section bg-white text-[var(--color-dark)]">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
            личный кабинет клуба
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Место, где ваши визиты
            <br />
            складываются в историю.
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Клуб — это не только кресло и зеркало, но и память о том, что уже было
            сделано: стрижки, бороды, удачные решения и мастера, к которым вы возвращаетесь.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            В личном кабинете хранятся ваши визиты, заметки мастеров, рекомендации
            по уходу и те самые варианты образа, к которым всегда можно вернуться.
          </p>
        </div>
      </section>

      {/* ОБЩИЙ ЛЭЙАУТ КАБИНЕТА */}
      <section className="section bg-[#f6f7fa]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8">
          {/* Сайдбар */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-1">
                профиль
              </p>
              <p className="text-sm font-semibold text-[var(--color-dark)]">
                {guestName}
              </p>
              <p className="mt-2 text-[11px] text-[var(--color-muted)]">
                Постоянный гость клуба. История посещений и рекомендации мастеров
                доступны только вам.
              </p>
            </div>

            <nav className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-4 space-y-1 text-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-2">
                разделы кабинета
              </p>
              <button className="w-full text-left py-2 px-3 rounded-md bg-[var(--color-dark)] text-white text-xs tracking-[0.16em] uppercase">
                ближайшие визиты
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--color-dark)]">
                История посещений
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--color-dark)]">
                Мои мастера
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--color-dark)]">
                Рекомендации по уходу
              </button>
              <button className="w-full text-left py-2 px-3 rounded-md hover:bg-black/5 text-[13px] text-[var(--color-dark)]">
                Настройки профиля
              </button>
            </nav>

            <div className="rounded-2xl bg-white border border-[var(--color-muted)]/15 text-[var(--color-dark)] p-5 text-sm space-y-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                ещё не с нами?
              </p>
              <p className="text-[var(--color-muted)]">
                Личный кабинет открывается после первого визита в клуб. Запишитесь
                на любой ритуал — и мы создадим профиль с вашими настройками.
              </p>
              <button className="mt-2 btn btn-primary btn-sm w-full">
                Записаться в клуб
              </button>
            </div>
          </aside>

          {/* Контент кабинета (заглушки под будущее) */}
          <main className="space-y-8">
            {/* Блок: ближайшие визиты */}
            <section className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    ближайшие визиты
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--color-dark)]">
                    Ваше расписание в клубе
                  </h2>
                </div>
                <button className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dark)] hover:text-[var(--color-accent-strong)]">
                  открыть календарь
                </button>
              </div>

              <div className="rounded-xl border border-dashed border-[var(--color-muted)]/40 p-4 text-sm text-[var(--color-muted)]">
                Пока в расписании пусто. Как только вы запишетесь на ритуал — здесь
                появится дата, время, мастер и формат вечера.
              </div>
            </section>

            {/* Блок: история посещений */}
            <section className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    история посещений
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--color-dark)]">
                    Как менялся ваш образ
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[var(--color-muted)]">
                <p>
                  После каждого визита мы сохраняем важные детали: выбранный ритуал,
                  длину, форму, реакции волос на укладку и комментарии мастера.
                </p>
                <div className="rounded-xl border border-dashed border-[var(--color-muted)]/40 p-4">
                  <p className="text-[13px]">
                    Здесь появятся ваши прошлые визиты: даты, мастера, ритуалы и заметки.
                    Это помогает не начинать каждый раз с нуля и опираться на то,
                    что уже «зашло».
                  </p>
                </div>
              </div>
            </section>

            {/* Блок: мои мастера */}
            <section className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    мои мастера
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--color-dark)]">
                    Те, кому вы доверяете голову
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--color-muted)]">
                <div className="rounded-xl border border-dashed border-[var(--color-muted)]/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                    основной мастер
                  </p>
                  <p className="text-[13px]">
                    Как только вы начнёте регулярно ходить к одному человеку, он
                    появится здесь — вместе с быстрыми кнопками записи.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-[var(--color-muted)]/40 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                    другие мастера клуба
                  </p>
                  <p className="text-[13px]">
                    Если вы пробовали разных мастеров, кабинет запомнит, у кого
                    какие решения вам понравились, и подскажет варианты на будущее.
                  </p>
                </div>
              </div>
            </section>

            {/* Блок: рекомендации по уходу */}
            <section className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    рекомендации по уходу
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--color-dark)]">
                    Как поддерживать образ между визитами
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[var(--color-muted)]">
                <p>
                  Мастера оставляют в кабинете короткие инструкции: чем мыть голову,
                  как сушить, чем укладывать и на что обратить внимание именно с
                  вашим типом волос.
                </p>
                <div className="rounded-xl border border-dashed border-[var(--color-muted)]/40 p-4 text-[13px]">
                  После визита здесь появятся рекомендации под ваш образ. Можно
                  открыть их утром перед рабочим днём — и вспомнить всё за 30 секунд.
                </div>
              </div>
            </section>
          </main>
        </div>
      </section>

      {/* CTA — светлый, перед футером */}
      <section className="section bg-[#f6f7fa] border-t border-black/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark)]">
            Хотите, чтобы у вашей стрижки была память?
          </h2>
          <p className="text-sm md:text-base text-[var(--color-muted)] max-w-2xl mx-auto mb-6">
            Начните с первого визита. Дальше клуб возьмёт на себя историю образа,
            а личный кабинет станет местом, где всё это собрано в одном месте.
          </p>
          <button className="btn btn-primary text-lg px-8 py-4 mb-3">
            Записаться в клуб
          </button>
          <p className="text-[var(--color-muted)] text-sm">
            или по телефону{' '}
            <a
              href="tel:+79877553000"
              className="text-[var(--color-accent-strong)] hover:opacity-80 transition-colors"
            >
              +7 987 755 30 00
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
