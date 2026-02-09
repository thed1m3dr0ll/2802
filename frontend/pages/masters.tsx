// pages/masters.tsx
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import BookingModal from '../components/BookingModal'

export default function MastersPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedMaster, setSelectedMaster] = useState<string | undefined>(undefined)

  const handleBookClick = (masterName?: string) => {
    setSelectedMaster(masterName)
    setIsBookingOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingOpen(false)
    setSelectedMaster(undefined)
  }

  return (
    <>
      <Header onBookClick={() => handleBookClick()} />

      {/* HERO: кто эти люди (светлый) */}
      <section className="section bg-white text-[var(--color-dark)]">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
            совет клуба
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Люди, которым
            <br />
            не страшно доверить голову.
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            В обычных барбершопах вы выбираете свободное кресло. В клубе — человека,
            которому готовы доверить образ, настроение и час своей жизни.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            У каждого мастера свой характер, темперамент и стиль работы. Это нормально:
            кому‑то важна идеальная геометрия, кому‑то — ощущение «стал тем самым
            собой». Важно найти «своего».
          </p>
        </div>
      </section>

      {/* СЕТКА МАСТЕРОВ */}
      <section className="section bg-[#f6f7fa] border-t border-black/5">
        <div className="container-custom">
          <div className="mb-10 flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-1/3 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-dark)]">
                Не «персонаж на фото»,
                <br />
                а человек, с которым вы по пути.
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Здесь нет формальных «био» с перечнем конкурсов. Гораздо важнее,
                как мастер смотрит на мужской образ, как разговаривает и как вы
                чувствуете себя в кресле.
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Если сложно выбрать по описанию — можно прийти в клуб, посмотреть
                вживую и решить, к кому хочется вернуться ещё.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Мастер 1 */}
              <article className="rounded-2xl border border-[var(--color-muted)]/25 bg-white p-6 flex flex-col justify-between hover:border-[var(--color-accent-strong)]/60 hover:shadow-[0_0_32px_rgba(191,37,37,0.25)] transition-all">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    точность и порядок
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    Мастер №1
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Любит, когда всё чётко: линии, переходы, расписание.
                    Спокоен, собран, аккуратен в деталях. Подойдёт, если вы цените
                    структурированные формы и порядок в голове и на голове.
                  </p>
                  <p className="text-xs text-[var(--color-muted)]/80">
                    Хороший выбор для тех, кто носит классические стрижки,
                    работает в строгих дресс‑кодах и не любит сюрпризов.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleBookClick('Мастер №1')}
                  className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--color-accent-strong)] hover:opacity-80 underline underline-offset-4"
                >
                  Записаться к этому мастеру
                </button>
              </article>

              {/* Мастер 2 */}
              <article className="rounded-2xl border border-[var(--color-muted)]/25 bg-white p-6 flex flex-col justify-between hover:border-[var(--color-accent-strong)]/60 hover:shadow-[0_0_32px_rgba(191,37,37,0.25)] transition-all">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    образ и настроение
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    Мастер №2
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Видит человека целиком: от роста волос до манеры сидеть
                    и того, как вы заходите в помещение. Часто предлагает решения,
                    о которых вы сами не думали — но потом к ним возвращаетесь.
                  </p>
                  <p className="text-xs text-[var(--color-muted)]/80">
                    Для тех, кто готов чуть рискнуть ради живого образа,
                    а не «ещё одной стрижки по фото из Pinterest».
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleBookClick('Мастер №2')}
                  className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--color-accent-strong)] hover:opacity-80 underline underline-offset-4"
                >
                  Записаться к этому мастеру
                </button>
              </article>

              {/* Мастер 3 / Ваш мастер */}
              <Link
                href="/cabinet"
                className="rounded-2xl border border-dashed border-[var(--color-muted)]/40 bg-white p-6 flex flex-col justify-between hover:border-[var(--color-accent-strong)]/60 hover:bg-[rgba(191,37,37,0.03)] hover:shadow-[0_0_32px_rgba(191,37,37,0.18)] transition-all cursor-pointer"
              >
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    свой человек
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]/80">
                    Ваш мастер
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    В каждом клубе в какой‑то момент появляется тот самый мастер,
                    к которому вы записываетесь автоматически, не заглядывая в список.
                    Это не всегда с первого визита — и это нормально.
                  </p>
                  <p className="text-xs text-[var(--color-muted)]/80">
                    Можно прийти с задачей, характером и образом жизни — мы подскажем,
                    с кого лучше начать знакомство.
                  </p>
                </div>
                <p className="mt-5 text-xs text-[var(--color-muted)]">
                  Подбор мастера — через администратора клуба или в личном кабинете.
                  Нажмите, чтобы продолжить.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК: как проходит визит (светлый) */}
      <section className="section bg-white border-t border-black/5 text-[var(--color-dark)]">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
              как проходит час
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Никакой магии — просто нормальный человеческий сервис.
            </h2>
          </div>
          <div className="space-y-4 text-sm text-[var(--color-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                знакомство
              </h3>
              <p>
                Сначала мастер слушает: чем вы занимаетесь, как обычно носите волосы,
                что раздражает в зеркале и чего категорически не хочется.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                работа
              </h3>
              <p>
                Потом начинается аккуратная работа без суеты. Можно говорить,
                можно молчать — никаких обязательных small talk, если вы этого не любите.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-[var(--color-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                результат
              </h3>
              <p>
                На финише — образ, который можно повторить: мастер объясняет,
                как укладываться дома и чем пользоваться, чтобы не зависеть
                от одного «удачного раза».
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
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

      {/* CTA — СВЕТЛЫЙ, перед футером */}
      <section className="section bg-[#f6f7fa] border-t border-black/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark)]">
            Выберите мастера — а потом он будет выбирать решения для вас.
          </h2>
          <p className="text-sm md:text-base text-[var(--color-muted)] max-w-2xl mx-auto mb-6">
            Можно записаться к конкретному мастеру, а можно первым делом написать
            администратору пару строк о себе — мы подскажем, с кем начать.
          </p>
          <button
            type="button"
            className="btn btn-primary text-lg px-8 py-4 mb-3"
            onClick={() => handleBookClick()}
          >
            Записаться к мастеру
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

      {/* Модалка записи */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
        masterName={selectedMaster}
      />
    </>
  )
}
