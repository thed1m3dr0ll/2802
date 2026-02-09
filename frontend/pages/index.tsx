// pages/index.tsx
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingModal from '../components/BookingModal'

type ReviewSource = 'yandex' | '2gis' | 'site'

interface Review {
  id: number
  author: string
  source: ReviewSource
  rating: number
  text: string
}

function getSourceLabel(source: ReviewSource) {
  if (source === 'yandex') return 'Яндекс Карты'
  if (source === '2gis') return '2ГИС'
  return 'Сайт клуба'
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBookClick = () => {
    setIsBookingOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingOpen(false)
  }

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('http://localhost:8000/reviews/')
        const data = (await res.json()) as Review[]
        setReviews(data)
      } catch (e) {
        console.error('Failed to load reviews', e)
      } finally {
        setReviewsLoading(false)
      }
    }

    loadReviews()
  }, [])

  return (
    <>
      <Header onBookClick={handleBookClick} />

      {/* ==================== БЛОК 0: МАНИФЕСТ КЛУБА ==================== */}
      <section className="section bg-white text-[var(--color-dark)]">
        <div className="container-custom max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
            манифест клуба
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Мы против лендингов
            <br />
            и одноразовых визитов.
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Лендинги нужны тем, кому важнее воронка, чем человек. Стрижка — товар,
            клиент — лид, вечер — слот в онлайн‑записи. Нам такой мир не подходит.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Мы строим не страницу, а клуб. Здесь у каждого гостя есть история,
            своё место в расписании и свои люди за креслом. Ваши визиты не теряются
            в CRM — они собираются в личный кабинет и превращаются в хронику образа.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Мы верим в сервис, который помнит, как вы стриглись год назад, какую музыку
            вы любите и зачем заходите вечером. В истории, которые продолжаются,
            а не обрываются после кнопки «записаться».
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Если вам нужно просто быстро «срезать концы» — вокруг достаточно лендингов.
            Если нужно место, куда возвращаются, — добро пожаловать в клуб.
          </p>
        </div>
      </section>

      {/* ==================== БЛОК 1: ХАБ ГЛАВНЫХ РАЗДЕЛОВ ==================== */}
      <section className="section bg-white border-t border-black/5 text-[var(--color-dark)]">
        <div className="container-custom space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Истории гостей */}
            <a
              href="/stories"
              className="group rounded-2xl bg-[#f6f7fa] border border-black/5 p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  живые истории
                </p>
                <h2 className="text-lg font-semibold">
                  Истории гостей
                </h2>
                <p className="text-sm text-[var(--color-muted)]">
                  Реальные вечера в клубе: до/после, выбор ритуала, зачем человек пришёл
                  и с чем ушёл.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-[var(--color-muted)] group-hover:text-[var(--color-dark)]">
                читать истории →
              </span>
            </a>

            {/* Ритуалы */}
            <a
              href="/rituals"
              className="group rounded-2xl bg-[#f6f7fa] border border-black/5 p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  сценарии вечера
                </p>
                <h2 className="text-lg font-semibold">
                  Ритуалы клуба
                </h2>
                <p className="text-sm text-[var(--color-muted)]">
                  Не прайс‑лист, а продуманные форматы часа: свет, темп, уход и финальный образ.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-[var(--color-muted)] group-hover:text-[var(--color-dark)]">
                выбрать ритуал →
              </span>
            </a>

            {/* Личный кабинет */}
            <a
              href="/cabinet"
              className="group rounded-2xl bg-[#f6f7fa] border border-black/5 p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  для своих
                </p>
                <h2 className="text-lg font-semibold">
                  Клубный кабинет
                </h2>
                <p className="text-sm text-[var(--color-muted)]">
                  Ваша история визитов, любимые мастера, рекомендации и доступ
                  к закрытым форматам.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-[var(--color-muted)] group-hover:text-[var(--color-dark)]">
                войти в кабинет →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 2: HERO (ПРО КЛУБ И АДРЕС) ==================== */}
      <section
        id="hero"
        className="section bg-[radial-gradient(circle_at_top,#ffffff_0%,#eef1f7_55%,#e3e7f0_100%)]"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Левая колонка: клубный месседж */}
            <div className="space-y-8">
              <p className="inline-flex items-center justify-center text-[11px] tracking-[0.28em] uppercase text-[var(--color-muted)] border border-[var(--color-muted)]/25 rounded-full px-5 py-1 bg-white/80">
                закрытый барбершоп‑клуб · белозёрская, 4
              </p>

              <h2 className="text-[32px] md:text-[40px] lg:text-[44px] font-semibold leading-tight text-[var(--color-dark)]">
                Клуб, куда заходят за собой,
                <br />
                а не «подстричься»
              </h2>

              <p className="text-[15px] md:text-base text-[var(--color-muted)] max-w-xl">
                Здесь стрижка — не строчка в прайсе, а повод забрать у города один
                честный час. Выключить телефон, выдохнуть и разложить по местам
                волосы, бороду и мысли.
              </p>
              <p className="text-[15px] md:text-base text-[var(--color-muted)] max-w-xl">
                Мастера, которым не всё равно, и атмосфера, из‑за которой пропадает
                желание искать «что‑то новенькое» в соседних барбершопах.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleBookClick}
                >
                  Записаться в один клик
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { window.location.href = '/rituals' }}
                >
                  Посмотреть ритуалы
                </button>
              </div>

              <p className="text-[11px] text-[var(--color-muted)]">
                Только по предварительной записи · Нижний Новгород, ул. Белозёрская, 4
              </p>
            </div>

            {/* Правая колонка: спокойный формат клуба */}
            <div className="w-full">
              <div className="rounded-[26px] bg-white/95 border border-[var(--color-muted)]/15 shadow-[0_18px_60px_rgba(37,43,51,0.18)] p-7 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
                    клубный формат
                  </p>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                    только по записи
                  </span>
                </div>

                <div className="space-y-3 text-sm text-[var(--color-dark)]">
                  <p>
                    — Светлое камерное пространство с мягким светом и спокойной музыкой.
                  </p>
                  <p>
                    — Мастера с характером и вкусом, которые отвечают за результат, а не за минуту.
                  </p>
                  <p>
                    — Авторские ритуалы стрижки и ухода вместо конвейерных «услуг из прайса».
                  </p>
                  <p>
                    — Атмосфера клуба, где помнят по имени и не заставляют сидеть в очереди.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 3: КЛУБ (ПОЧЕМУ МЫ) ==================== */}
      <section id="club" className="section bg-[#f6f7fa]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-dark)]">
              Барбершоп, который помнит вас в лицо
            </h2>
            <p className="text-lg text-[var(--color-muted)] max-w-3xl mx-auto">
              Мы не делаем «ещё одну стрижку по фото» и не гонимся за потоком.
              Куда интереснее, когда через пару визитов вы садитесь в кресло
              и говорите: «как в прошлый раз — только ещё лучше».
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[var(--color-muted)]/20 rounded-lg p-8 hover-lift">
              <h3 className="text-[var(--color-accent-strong)] text-sm font-semibold mb-3 tracking-[0.18em] uppercase">
                мастера
              </h3>
              <p className="text-[var(--color-muted)]">
                Мастера с собственным вкусом и позицией, а не люди «на подмене».
                Вы выбираете не кресло, а человека.
              </p>
            </div>

            <div className="bg-white border border-[var(--color-muted)]/20 rounded-lg p-8 hover-lift">
              <h3 className="text-[var(--color-accent-strong)] text-sm font-semibold mb-3 tracking-[0.18em] uppercase">
                формат
              </h3>
              <p className="text-[var(--color-muted)]">
                Клуб вместо конвейера: один час — один гость, без очередей и суеты.
              </p>
            </div>

            <div className="bg-white border border-[var(--color-muted)]/20 rounded-lg p-8 hover-lift">
              <h3 className="text-[var(--color-accent-strong)] text-sm font-semibold mb-3 tracking-[0.18em] uppercase">
                уход
              </h3>
              <p className="text-[var(--color-muted)]">
                Уход, который работает в реальной жизни, а не только в день стрижки:
                премиальная косметика и отработанные ритуалы.
              </p>
            </div>

            <div className="bg-white border border-[var(--color-muted)]/20 rounded-lg p-8 hover-lift">
              <h3 className="text-[var(--color-accent-strong)] text-sm font-semibold mb-3 tracking-[0.18em] uppercase">
                память
              </h3>
              <p className="text-[var(--color-muted)]">
                Мы помним ваши удачные решения: длину, форму, мастеров и ритуалы,
                чтобы не начинать каждый раз с нуля.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 4: РИТУАЛЫ ==================== */}
      <section id="rituals" className="section bg-white">
        <div className="container-custom">
          <div className="mb-10 flex flex-col lg:flex-row gap-10 items-start">
            {/* Левая колонка: вводка */}
            <div className="lg:w-1/3 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
                клубные ритуалы
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-dark)]">
                Ритуалы вместо
                <br />
                списка услуг.
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Стрижка, борода или полный перезапуск образа — каждый ритуал
                собран как сценарий вечера. Вы приходите не «на услугу», а
                на готовый формат часа.
              </p>
            </div>

            {/* Правая колонка: карточки ритуалов */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Ритуал 1 */}
              <article className="hover-lift rounded-2xl bg-[#f6f7fa] border border-[var(--color-muted)]/15 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    старт
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    «Вход»
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Базовый ритуал, с которого удобно начать знакомство с клубом.
                    Консультация, стрижка, мойка и укладка — чтобы выйти
                    из кресла уже собранным человеком.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
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

              {/* Ритуал 2 */}
              <article className="hover-lift rounded-2xl bg-[#f6f7fa] border border-[var(--color-muted)]/15 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    выбор клуба
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    «Резиденция»
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Голова + борода в одном сценарии: стрижка, оформление бороды,
                    уход и укладка. Формат «вышел из кресла — уже полностью собран».
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
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

              {/* Ритуал 3 */}
              <article className="rounded-2xl bg-[#f6f7fa] border border-dashed border-[var(--color-muted)]/30 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    закрытый формат
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    «Ночной совет»
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Поздние слоты, бар, мягкий свет и больше времени на разговор
                    или тишину. Формат для тех, кто уже стал своим в клубе.
                  </p>
                </div>
                <p className="mt-4 text-[11px] text-[var(--color-muted)]">
                  Подробности и приглашение — у администратора клуба.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК X: ИСТОРИИ ГОСТЕЙ ==================== */}
      <section id="stories" className="section bg-[#f6f7fa]">
        <div className="container-custom">
          <div className="mb-10 flex flex-col lg:flex-row gap-10 items-start">
            {/* Левая колонка: вводка */}
            <div className="lg:w-1/3 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
                истории гостей
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-dark)]">
                Не отзывы,
                <br />
                а личные сюжеты.
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Вместо сухих звёздочек — вечера, которые действительно что‑то меняют.
                Зачем человек пришёл, какой ритуал выбрал и с чем ушёл домой.
              </p>
              <button
                type="button"
                className="mt-2 text-[11px] tracking-[0.18em] uppercase text-[var(--color-dark)] hover:text-[var(--color-accent-strong)]"
                onClick={() => { window.location.href = '/stories' }}
              >
                смотреть все истории
              </button>
            </div>

            {/* Правая колонка: карточки историй */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* История 1 */}
              <a
                href="/stories"
                className="hover-lift rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    первый визит
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    «Макушка, которую
                    <br />
                    никто не любил»
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Гость, который всю жизнь прятал голову под кепкой, и ритуал,
                    после которого кепка стала просто аксессуаром, а не защитой.
                  </p>
                </div>
                <p className="mt-4 text-[11px] text-[var(--color-muted)]">
                  Ритуал: «Вход» · 60 мин
                </p>
              </a>

              {/* История 2 */}
              <a
                href="/stories"
                className="hover-lift rounded-2xl bg-white border border-[var(--color-muted)]/15 p-6 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    борода
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    «Когда “подровнять”
                    <br />
                    стало образом»
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    История Сергея, у которого борода каждый раз выходила разной,
                    пока она не стала частью продуманного образа.
                  </p>
                </div>
                <p className="mt-4 text-[11px] text-[var(--color-muted)]">
                  Ритуал: «Резиденция» · 90 мин
                </p>
              </a>

              {/* История 3 */}
              <a
                href="/stories"
                className="rounded-2xl bg-white border border-dashed border-[var(--color-muted)]/30 p-6 flex flex-col justify-between cursor-pointer hover-lift"
              >
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    ночной совет
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    «Час, когда
                    <br />
                    выключили голову»
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Поздний визит после тяжёлой недели, горячее полотенце, тихий бар
                    и стрижка, после которой снова хочется смотреть в зеркало.
                  </p>
                </div>
                <p className="mt-4 text-[11px] text-[var(--color-muted)]">
                  Полные версии историй — в разделе «Истории гостей».
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 5: МАСТЕРА ==================== */}
      <section
        id="masters"
        className="section bg-white border-t border-black/5"
      >
        <div className="container-custom">
          <div className="mb-10 flex flex-col lg:flex-row gap-10 items-start">
            {/* Левая колонка: заголовок */}
            <div className="lg:w-1/3 space-y-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                совет клуба
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
                Люди, которым
                <br />
                не страшно доверить голову.
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                У нас нет случайных людей «по графику». Каждый мастер — характер,
                вкус и своё видение мужского образа. Вы выбираете не кресло,
                а человека.
              </p>
            </div>

            {/* Правая колонка: профили мастеров */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Мастер 1 */}
              <article className="rounded-2xl border border-[var(--color-muted)]/25 bg-[#f6f7fa] p-6 flex flex-col justify-between hover:border-[var(--color-accent-strong)]/60 hover:shadow-[0_0_32px_rgba(191,37,37,0.25)] transition-all">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    точность и порядок
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    Мастер №1
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Аккуратные линии, строгие формы, минимум лишнего.
                    Для тех, кто любит, когда всё «по линеечке» — в голове и в жизни.
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--color-accent-strong)] hover:opacity-80 underline underline-offset-4"
                  onClick={handleBookClick}
                >
                  Записаться к этому мастеру
                </button>
              </article>

              {/* Мастер 2 */}
              <article className="rounded-2xl border border-[var(--color-muted)]/25 bg-[#f6f7fa] p-6 flex flex-col justify-between hover:border-[var(--color-accent-strong)]/60 hover:shadow-[0_0_32px_rgba(191,37,37,0.25)] transition-all">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    образ и настроение
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]">
                    Мастер №2
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Видит картинку целиком: от стрижки до бороды и очков.
                    Для тех, кто готов довериться и выйти другим человеком.
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--color-accent-strong)] hover:opacity-80 underline underline-offset-4"
                  onClick={handleBookClick}
                >
                  Записаться к этому мастеру
                </button>
              </article>

              {/* Мастер 3 */}
              <article className="rounded-2xl border border-dashed border-[var(--color-muted)]/40 bg-white p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    свой человек
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-dark)]/80">
                    Ваш мастер
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Первый визит — всегда знакомство. Мы подскажем, к кому лучше
                    пойти, исходя из задач, характера и образа жизни.
                  </p>
                </div>
                <p className="mt-5 text-xs text-[var(--color-muted)]">
                  Подробности и рекомендации — у администратора клуба.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 6: ОТЗЫВЫ ==================== */}
      <section
        id="media"
        className="section bg-[#f6f7fa] border-t border-black/5"
      >
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-dark)]">
              5.0 по отзывам гостей
            </h2>
            <p className="text-lg text-[var(--color-muted)] max-w-3xl mx-auto">
              Постоянные гости, заполненное заранее расписание и рекомендации
              «из уст в уста» — нормальный итог, когда делаешь не «как у всех»,
              а по‑своему и на совесть.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsLoading && (
              <p className="text-[var(--color-muted)] text-center col-span-full">
                Загружаем отзывы...
              </p>
            )}

            {!reviewsLoading &&
              reviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-white border border-[var(--color-muted)]/25 rounded-lg p-8 flex flex-col justify-between"
                >
                  <p className="text-[var(--color-dark)]/85 italic mb-6">
                    «{review.text}»
                  </p>
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <p className="text-[var(--color-accent-strong)] font-semibold">
                        {review.author || 'Гость клуба'}
                      </p>
                      <p className="text-[var(--color-muted)] text-xs mt-1">
                        {getSourceLabel(review.source)}
                      </p>
                    </div>
                    <p className="text-[var(--color-accent-strong)] text-sm">
                      {'★'.repeat(review.rating)}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 7: КОНТАКТЫ ==================== */}
      <section
        id="contacts"
        className="section bg-white border-t border-black/5"
      >
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-dark)]">
              Готовы зайти в клуб?
            </h2>

            <button
              type="button"
              className="btn btn-primary text-lg px-8 py-4 mb-4"
              onClick={handleBookClick}
            >
              Записаться онлайн
            </button>

            <p className="text-[var(--color-dark)] text-base">
              <a
                href="tel:+79877553000"
                className="text-[var(--color-accent-strong)] hover:opacity-80 transition-colors"
              >
                +7 987 755 30 00
              </a>
            </p>

            <p className="text-[var(--color-muted)] mt-4 text-sm max-w-xl mx-auto">
              Нижний Новгород, ул. Белозёрская, 4 · работаем по записи, чтобы ваш час был только вашим.
            </p>
          </div>
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
