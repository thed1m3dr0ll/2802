// pages/masters.tsx
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import BookingModal from '../components/BookingModal'

export default function MastersPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedMaster, setSelectedMaster] = useState<string | undefined>(
    undefined
  )

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

      {/* HERO: кто эти люди (светлый, клубная палитра) */}
      <section className="section section-paper section-animate">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="label-small text-[var(--text-muted)]">совет клуба</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-dark)]">
            Команда, с которой держится клуб.
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            В обычных барбершопах вы выбираете свободное кресло. В клубе —
            человека, которому готовы доверить образ, настроение и час своей
            жизни.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Мы показываем мастеров вместе, потому что в кресле вы попадаете не
            только к конкретному барберу, а в общую команду: характеры,
            чувство вкуса и отношение к делу у всех совпадают.
          </p>
        </div>
      </section>

      {/* СЕТКА МАСТЕРОВ — широкие карточки с фото слева */}
      <section className="section section-dark section-animate">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="label-small text-club-muted mb-2">
              не персонажи на фото
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
              Вы выбираете не кресло, а человека.
            </h2>
            <p className="text-club-soft text-sm md:text-base">
              Здесь нет формальных «био» с перечнем конкурсов. Важнее, как
              мастер смотрит на мужской образ, как разговаривает и как вы
              чувствуете себя в кресле рядом с ним.
            </p>
          </div>

          <div className="space-y-6">
            {/* Карточка 1 — Совет клуба */}
            <article className="card-master-wide hover-lift flex flex-col md:flex-row">
              <div className="card-master-photo">
                <img
                  src="/images/masters/master-1.jpg"
                  alt="Команда барбершоп‑клуба Gentlemen"
                />
              </div>
              <div className="card-master-body">
                <div className="card-master-headline">
                  <p className="label-small text-[var(--text-muted)]">
                    команда gentlemen
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                    Совет клуба Gentlemen
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  На этом снимке — ядро команды: люди, которые собрали клуб с
                  первых гостей. У каждого свой характер и почерк, но всех объединяет
                  уважение к времени гостя и к тому, что происходит в кресле.
                </p>
                <p className="text-xs text-[var(--text-muted)]/80 mb-4">
                  Если вы приходите впервые, достаточно выбрать удобное время —
                  вас встретит кто‑то из этого кадра, и с этого начнётся ваша
                  личная история в клубе.
                </p>
                <button
                  type="button"
                  onClick={() => handleBookClick('Совет клуба')}
                  className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                >
                  записаться к мастеру из совета
                </button>
              </div>
            </article>

            {/* Карточка 2 — команда в работе */}
            <article className="card-master-wide hover-lift flex flex-col md:flex-row">
              <div className="card-master-photo">
                <img
                  src="/images/masters/master-2.jpg"
                  alt="Команда барбершоп‑клуба Gentlemen за работой"
                />
              </div>
              <div className="card-master-body">
                <div className="card-master-headline">
                  <p className="label-small text-[var(--text-muted)]">
                    образ и атмосфера
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                    Команда в работе, а не в позе
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Общие кадры с креслами — это обычный вечер в клубе: кто‑то стрижёт,
                  кто‑то обсуждает дела, кто‑то просто молчит и отдыхает. Здесь можно
                  быть собой, а не «клиентом по талону».
                </p>
                <p className="text-xs text-[var(--text-muted)]/80 mb-4">
                  Один любит идеальную геометрию, другой — живой, чуть небрежный образ.
                  Внутри команды найдётся человек под ваш характер, работу и привычки.
                </p>
                <button
                  type="button"
                  onClick={() => handleBookClick('Подбор мастера')}
                  className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] hover:opacity-80 underline underline-offset-4"
                >
                  подобрать мастера под себя
                </button>
              </div>
            </article>

            {/* Карточка 3 — Ваш мастер / ссылка в кабинет */}
            <Link
              href="/cabinet"
              className="card-master-wide hover-lift flex flex-col md:flex-row cursor-pointer"
            >
              <div className="card-master-photo">
                <img
                  src="/images/masters/master-your.jpg"
                  alt="Ваш мастер в клубе Gentlemen"
                />
              </div>
              <div className="card-master-body">
                <div className="card-master-headline">
                  <p className="label-small text-[var(--text-muted)]">
                    свой человек в клубе
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-dark)]/90">
                    Ваш мастер на общем фото
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  На этих групповых снимках будущий «ваш» мастер уже есть — просто вы
                  пока не знаете, кто именно. Иногда совпадение происходит с первого
                  визита, иногда — через пару попыток.
                </p>
                <p className="text-xs text-[var(--text-muted)]/80 mb-4">
                  Можно прийти с задачей, родом деятельности и тем, как вы живёте день —
                  администратор подскажет, с кого начать знакомство, а дальше вы уже
                  будете возвращаться к своему человеку сами.
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent-red)] underline underline-offset-4">
                  перейти в кабинет и закрепить своего мастера
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* БЛОК: как проходит визит (светлый) */}
      <section className="section section-paper section-animate">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <p className="label-small text-[var(--text-muted)]">
              как проходит час
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)]">
              Никакой магии — просто нормальный человеческий сервис.
            </h2>
          </div>
          <div className="space-y-4 text-sm text-[var(--text-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                знакомство
              </h3>
              <p>
                Сначала мастер слушает: чем вы занимаетесь, как обычно носите
                волосы, что раздражает в зеркале и чего категорически не
                хочется.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                работа
              </h3>
              <p>
                Потом начинается аккуратная работа без суеты. Можно говорить,
                можно молчать — никаких обязательных small talk, если вы этого
                не любите.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-[var(--text-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                результат
              </h3>
              <p>
                На финише — образ, который можно повторить: мастер объясняет,
                как укладываться дома и чем пользоваться, чтобы не зависеть от
                одного удачного раза.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
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

      {/* CTA — перед футером */}
      <section className="section section-dark section-animate">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Выберите мастера — а потом он будет выбирать решения для вас.
          </h2>
          <p className="text-club-soft text-sm md:text-base max-w-2xl mx-auto mb-6">
            Можно записаться к конкретному мастеру, а можно первым делом
            написать администратору пару строк о себе — мы подскажем, с кем
            начать.
          </p>
          <button
            type="button"
            className="btn-primary mb-3"
            onClick={() => handleBookClick()}
          >
            записаться к мастеру
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
