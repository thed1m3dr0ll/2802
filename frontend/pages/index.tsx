export default function Home() {
  return (
    <>
      {/* ==================== БЛОК 1: HERO ==================== */}
      <section className="section bg-gradient-to-b from-club-dark via-club-dark to-club-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-club-gold from-5% via-transparent via-50% to-transparent opacity-5 pointer-events-none"></div>

        <div className="container-custom relative z-10 pt-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-club-light">
              Вход в мужской клуб
              <br />
              <span className="text-gradient">на районе</span>
            </h1>

            <p className="text-lg md:text-xl text-club-light opacity-90 max-w-3xl mx-auto mb-12">
              Здесь стрижка — это повод остановить время, выключить суету и навести порядок: на голове, в бороде и в мыслях. Место, где жизнь замедляется, суета исчезает, а ты наводишь порядок — в себе и в своём отражении.
              <br />
              <br />
              Квалифицированные мастера, премиум‑косметика и отношение, ради которого хочется возвращаться.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="btn btn-primary">Записаться в один клик</button>
              <button className="btn btn-secondary">Посмотреть ритуалы</button>
              <button className="btn btn-secondary">Познакомиться с мастерами</button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 2: ПОЧЕМУ МЫ ==================== */}
      <section className="section bg-club-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-club-light">
              Барбершоп, в котором есть душа
            </h2>
            <p className="text-lg text-club-light opacity-80 max-w-3xl mx-auto">
              Мы не гонимся за потоком. Для нас важнее, чтобы каждый гость вышел с чувством: «вот это — мой барбер и мой барбершоп».
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8 hover-lift">
              <h3 className="text-club-gold text-xl font-bold mb-4">✦</h3>
              <p className="text-club-light opacity-80">
                Опытные мастера со своим стилем и философией
              </p>
            </div>
            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8 hover-lift">
              <h3 className="text-club-gold text-xl font-bold mb-4">✦</h3>
              <p className="text-club-light opacity-80">
                Авторский подход вместо конвейера
              </p>
            </div>
            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8 hover-lift">
              <h3 className="text-club-gold text-xl font-bold mb-4">✦</h3>
              <p className="text-club-light opacity-80">
                Премиальная мужская косметика и профессиональный уход
              </p>
            </div>
            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8 hover-lift">
              <h3 className="text-club-gold text-xl font-bold mb-4">✦</h3>
              <p className="text-club-light opacity-80">
                Честное отношение к времени: работаем по записи без очередей
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 3: РИТУАЛЫ ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-club-light">
              Ритуалы для гостя*
            </h2>
            <p className="text-lg text-club-light opacity-80 max-w-3xl mx-auto">
              Стрижка, борода или полный перезапуск образа — каждый ритуал продуман по шагам, чтобы вы не переживали за результат.
            </p>
          </div>

          <div className="flex justify-center">
            <button className="btn btn-primary">Смотреть все ритуалы</button>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 4: МАСТЕРА ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-club-light">
              Те, кому доверяешь голову и бороду
            </h2>
            <p className="text-lg text-club-light opacity-80 max-w-3xl mx-auto">
              Мастера с характером и опытом, которые слышат запрос, предлагают решения и делают работу так, чтобы не приходилось проверять других.
            </p>
          </div>

          <div className="flex justify-center">
            <button className="btn btn-primary">Познакомиться ближе</button>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 5: ЦИФРЫ И ОТЗЫВЫ ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-club-light">
              5.0 по отзывам гостей
            </h2>
            <p className="text-lg text-club-light opacity-80 max-w-3xl mx-auto">
              Десятки постоянных клиентов и расписание, которое заполняется заранее — лучший показатель качества нашей работы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8">
              <p className="text-club-light opacity-80 italic mb-6">
                "Здесь стрижка — это повод остановить время. Выключить суету. Мой барбер и мой барбершоп."
              </p>
              <p className="text-club-gold font-bold">Постоянный гость</p>
              <p className="text-club-gold text-sm mt-2">⭐⭐⭐⭐⭐</p>
            </div>

            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8">
              <p className="text-club-light opacity-80 italic mb-6">
                "Работают по записи, без очередей. Уважают время. Вот это по‑мужски."
              </p>
              <p className="text-club-gold font-bold">Постоянный гость</p>
              <p className="text-club-gold text-sm mt-2">⭐⭐⭐⭐⭐</p>
            </div>

            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8">
              <p className="text-club-light opacity-80 italic mb-6">
                "Не просто барбершоп. Место, где можно выдохнуть, поговорить, вернуться в себя."
              </p>
              <p className="text-club-gold font-bold">Постоянный гость</p>
              <p className="text-club-gold text-sm mt-2">⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== БЛОК 6: КАК ПОПАСТЬ ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-club-light">
              Готовы?
            </h2>

            <button className="btn btn-primary text-lg px-8 py-4">
              Записаться онлайн
            </button>

            <p className="text-club-light opacity-60 mt-8 text-sm">
              Если не нашли удобное время — напишите нам. Обязательно найдем решение.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
