import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingModal from '../components/BookingModal'

export default function StoriesPage() {
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

      {/* HERO: идея историй (светлый) */}
      <section className="section bg-white text-[var(--color-dark)]">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
            истории гостей
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Не отзывы,
            <br />
            а вечера, которые что‑то поменяли.
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Звёздочки и короткие «всё понравилось» мало что говорят о месте. Важно,
            зачем человек пришёл, что происходило в кресле и с каким ощущением
            он вышел в ночь из клуба.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Здесь мы собираем живые сюжеты: про неудачные макушки, бороды,
            которые никак не приживались, и про тот момент, когда в зеркале
            наконец увиделся «свой» человек.
          </p>
        </div>
      </section>

      {/* ЛЕНТА ИСТОРИЙ */}
      <section className="section bg-[#f6f7fa]">
        <div className="container-custom">
          <div className="mb-10 flex flex-col lg:flex-row gap-10 items-start">
            <div className="lg:w-1/3 space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-dark)]">
                Несколько вечеров из жизни клуба.
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Имена можно поменять, но ощущения — нет. Это сюжеты, в которых
                мужчины узнают себя, свои «до» и свои «после».
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Каждый вечер — это связка: человек, запрос, ритуал, мастер и то,
                с чем гость ушёл домой.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              {/* История 1 */}
              <article className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-2">
                  первый визит · ритуал «Вход» · 60 мин
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-[var(--color-dark)] mb-3">
                  «Макушка, которую никто не любил»
                </h3>
                <div className="space-y-3 text-sm text-[var(--color-muted)]">
                  <p>
                    Гость, который много лет ходил с одной и той же стрижкой
                    «потому что только так не торчит макушка». В обычных барбершопах
                    его просьба звучала как приговор, а не как задача.
                  </p>
                  <p>
                    На первом визите мы честно разобрали, что именно не нравится:
                    не «вообще всё плохо», а конкретные вихры, линии и переходы.
                    Мастер предложил путь не в один визит, а на пару месяцев вперёд.
                  </p>
                  <p>
                    После «Входа» гость впервые вышел не с «терпимой стрижкой»,
                    а с ощущением, что голова перестала быть проблемой. Кепка
                    осталась аксессуаром, а не защитой.
                  </p>
                </div>
              </article>

              {/* История 2 */}
              <article className="rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-2">
                  голова + борода · ритуал «Резиденция» · 90 мин
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-[var(--color-dark)] mb-3">
                  «Когда “подровнять” стало образом»
                </h3>
                <div className="space-y-3 text-sm text-[var(--color-muted)]">
                  <p>
                    Сергей много лет просил в разных местах одно и то же:
                    «просто подровнять бороду». Каждый раз она выходила новой,
                    и ни одна версия не успевала стать привычной.
                  </p>
                  <p>
                    В клуб он пришёл с запросом «хочу, чтобы это перестало быть лотереей».
                    Мы совместили стрижку и бороду в одном ритуале, посмотрели,
                    как он двигается, во что одевается и как разговаривает.
                  </p>
                  <p>
                    Через пару визитов “подровнять” превратилось в конкретную форму
                    и длину, которую можно повторять. Борода стала частью образа,
                    а не экспериментом раз в месяц.
                  </p>
                </div>
              </article>

              {/* История 3 */}
              <article className="rounded-2xl bg-white border border-dashed border-[var(--color-muted)]/30 p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-2">
                  поздний слот · ритуал «Ночной совет»
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-[var(--color-dark)] mb-3">
                  «Час, когда выключили голову»
                </h3>
                <div className="space-y-3 text-sm text-[var(--color-muted)]">
                  <p>
                    После затяжной недели и нескончаемых созвонов гость пришёл
                    в поздний слот, где нужно было не столько «сделать стрижку»,
                    сколько вернуть себе лицо и дыхание.
                  </p>
                  <p>
                    Мягкий свет, бар, горячее полотенце и мастер, который понимает,
                    когда лучше помолчать. Весь ритуал прошёл в полголоса и с минимумом слов.
                  </p>
                  <p>
                    Вышел тот же человек, но уже не в режиме «надо успеть»,
                    а в состоянии «я в порядке». И да, волосы легли так, что утром
                    не пришлось заново воевать с укладкой.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК: почему истории, а не отзывы (светлый) */}
      <section className="section bg-white border-t border-black/5 text-[var(--color-dark)]">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
              зачем это всё
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Истории помогают понять, ваш ли это клуб.
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              По чужим оценкам сложно понять, зайдёт ли вам место. А вот по чужим
              историям — проще: узнаёте себя в запросах, типе работы, образе жизни —
              значит, мы говорим на одном языке.
            </p>
          </div>
          <div className="space-y-4 text-sm text-[var(--color-muted)]">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                если вы узнаёте себя
              </h3>
              <p>
                Макушка, борода, усталость от «как скажете» в кресле — всё это
                те же самые сюжеты, только с другими именами. Значит, с задачей
                мы уже знакомы.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
                если у вас другая история
              </h3>
              <p>
                Это нормально. В клубе достаточно времени, чтобы разобрать запрос
                с нуля и придумать сценарий именно под вас.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — СВЕТЛЫЙ, перед футером */}
      <section className="section bg-[#f6f7fa] border-t border-black/5">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-dark)]">
            Хотите, чтобы здесь появилась ваша история?
          </h2>
          <p className="text-sm md:text-base text-[var(--color-muted)] max-w-2xl mx-auto mb-6">
            Начинается всё одинаково: вы выбираете ритуал и мастера, а мы забираем
            у города один час, чтобы вы вышли из клуба уже другим человеком.
          </p>
          <button
            type="button"
            className="btn btn-primary text-lg px-8 py-4 mb-3"
            onClick={handleBookClick}
          >
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

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
