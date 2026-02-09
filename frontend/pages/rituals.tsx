import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingModal from '../components/BookingModal'

export default function RitualsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBookClick = () => {
    setIsBookingOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingOpen(false)
  }

  return (
    <>
      <Header onBookClick={handleBookClick} />

      {/* HERO: заголовок и вводка (светлый) */}
      <section className="section bg-white text-[var(--color-dark)]">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
            клубные ритуалы
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Не услуги,
            <br />
            а сценарии вечера.
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            В прайс‑листах обычно пишут «стрижка», «борода», «комплекс».
            Мы называем это ритуалами, потому что за час в кресле успевает
            поменяться не только длина волос.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Каждый ритуал собран как готовый формат вечера: свет, темп работы,
            уход и финальный образ. Вы выбираете сценарий, мы берём на себя детали.
          </p>
        </div>
      </section>

      {/* СЕТКА РИТУАЛОВ */}
      <section className="section bg-[#f6f7fa]">
        <div className="container-custom">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-dark)]">
                Три ритуала, которыми живёт клуб.
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Стартовое знакомство, выбор тех, кто остаётся, и закрытый формат
                для своих. Этого набора достаточно, чтобы решить почти любую задачу
                с волосами и бородой.
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              цены и время могут меняться · актуальное — у администратора
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* РИТУАЛ 1: ВХОД */}
            <article className="hover-lift rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  знакомство с клубом
                </p>
                <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                  «Вход»
                </h3>
                <p className="text-sm text-[var(--color-muted)]">
                  Ритуал для тех, кто только заходит в клуб или хочет честно обновить
                  свой привычный образ. Спокойная консультация, стрижка, мойка и укладка —
                  без лишних движений и навязанных «опций».
                </p>
                <ul className="mt-2 space-y-1 text-[13px] text-[var(--color-muted)]">
                  <li>• Разбор того, как вы обычно носите волосы.</li>
                  <li>• Точная стрижка под ваш образ жизни.</li>
                  <li>• Мойка, укладка и рекомендации по уходу.</li>
                </ul>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="text-[var(--color-accent-strong)] font-semibold">
                  от 1 800 ₽ · 60 мин
                </span>
                <button
                  type="button"
                  className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-dark)] hover:text-[var(--color-accent-strong)]"
                  onClick={handleBookClick}
                >
                  записаться
                </button>
              </div>
            </article>

            {/* РИТУАЛ 2: РЕЗИДЕНЦИЯ */}
            <article className="hover-lift rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle_at_top,#bf2525_0,#ffffff_55%)]" />
              <div className="relative space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  выбор клуба
                </p>
                <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                  «Резиденция»
                </h3>
                <p className="text-sm text-[var(--color-muted)]">
                  Формат для тех, кто ценит, когда голова и борода собраны в один образ.
                  Один мастер, один час с хвостиком и внимание к деталям вместо
                  конвейера «отдельно голова, отдельно борода».
                </p>
                <ul className="mt-2 space-y-1 text-[13px] text-[var(--color-muted)]">
                  <li>• Стрижка с учётом роста волос и особенностей головы.</li>
                  <li>• Оформление бороды и усов под черты лица.</li>
                  <li>• Горячее полотенце, уход и укладка.</li>
                </ul>
              </div>
              <div className="relative mt-5 flex items-center justify-between text-xs">
                <span className="text-[var(--color-accent-strong)] font-semibold">
                  от 2 800 ₽ · 90 мин
                </span>
                <button
                  type="button"
                  className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-dark)] hover:text-[var(--color-accent-strong)]"
                  onClick={handleBookClick}
                >
                  записаться
                </button>
              </div>
            </article>

            {/* РИТУАЛ 3: НОЧНОЙ СОВЕТ */}
            <article className="rounded-2xl bg-white border border-dashed border-[var(--color-muted)]/30 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  закрытый формат
                </p>
                <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                  «Ночной совет»
                </h3>
                <p className="text-sm text-[var(--color-muted)]">
                  Поздний формат для своих, когда город уже выдохнул.
                  Больше времени, мягкий свет, бар и возможность наконец
                  вытащить голову из недели и спокойно привести себя в порядок.
                </p>
                <ul className="mt-2 space-y-1 text-[13px] text-[var(--color-muted)]">
                  <li>• Индивидуальный сценарий под запрос гостя.</li>
                  <li>• Расширенный уход и внимание к деталям.</li>
                  <li>• Время на разговор или молчание — как вам комфортнее.</li>
                </ul>
              </div>
              <p className="mt-5 text-[11px] text-[var(--color-muted)]">
                Доступен для гостей клуба. Подробности и приглашение — у администратора.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* БЛОК С FAQ / Пояснениями (светлый) */}
      <section className="section bg-white text-[var(--color-dark)] border-t border-black/5">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
              как выбрать ритуал
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Если сомневаетесь — скажите просто «хочу стать человеком».
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              На первом визите не обязательно разбираться в названиях. Расскажите,
              как вы живёте, как обычно носите волосы и что именно раздражает в зеркале —
              мастер поможет подобрать ритуал и формат.
            </p>
          </div>
          <div className="space-y-4 text-sm text-[var(--color-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                если нужно просто привести голову в порядок
              </h3>
              <p>Берите «Вход» — аккуратное обновление без радикальных шагов.</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                если голова и борода живут разной жизнью
              </h3>
              <p>«Резиденция» собирает всё в единый образ одним мастером и за один вечер.</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                если хочется выдохнуть после недели
              </h3>
              <p>
                Спросите у администратора про «Ночной совет» — это отдельная история
                для тех, кто уже стал гостем клуба.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — СВЕТЛЫЙ, перед футером */}
      <section className="section bg-[#f6f7fa] border-t border-black/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark)]">
            Выбирайте ритуал — за остальным следим мы.
          </h2>
          <p className="text-sm md:text-base text-[var(--color-muted)] max-w-2xl mx-auto mb-6">
            Если сложно определиться online, напишите администратору или позвоните —
            подскажем формат, мастера и время, чтобы первый визит сразу попал в точку.
          </p>
          <button
            type="button"
            className="btn btn-primary text-lg px-8 py-4 mb-3"
            onClick={handleBookClick}
          >
            Записаться на ритуал
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

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
