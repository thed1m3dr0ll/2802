export default function Masters() {
  const masters = [
    {
      name: "Классика и аккуратность",
      specialty: "Мастер барбершопа",
      description: "Специализируется на классических и офисных стрижках, аккуратной бороде и чистых линиях. Подходит тем, кому важны опрятность, универсальность и минимум лишнего шума в образе. Спокойный, внимательный к деталям, уважает личное пространство: можно поговорить, а можно просто помолчать под звук машинки.",
      experience: "7+ лет",
      rating: 4.95
    },
    {
      name: "Фейды и динамика",
      specialty: "Мастер барбершопа",
      description: "Любит современные формы: фейды, текстурные стрижки, акцент на объём и плавные переходы. Работает так, чтобы образ был актуальным, но без лишней показушности. Легко поддерживает разговор, подскажет по стилю и уходу, если вы хотите чего‑то нового, но не знаете, с чего начать.",
      experience: "6+ лет",
      rating: 4.92
    },
    {
      name: "Борода и характер",
      specialty: "Мастер барбершопа",
      description: "Сильная сторона — борода и мужские образы под насыщенную жизнь: предприниматели, айтишники, креативщики. Видит, как вписать бороду в ваш стиль, а не просто сделать «как на фото» на один день. Говорит по делу: честно скажет, если задумка не подойдёт по волосам или форме лица.",
      experience: "8+ лет",
      rating: 4.98
    }
  ]

  return (
    <>
      {/* ==================== ИНТРО ==================== */}
      <section className="section bg-gradient-to-b from-club-dark via-club-dark to-club-dark pt-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-club-light">
              Наши мастера
            </h1>
            <p className="text-lg text-club-light opacity-80 max-w-3xl mx-auto">
              У каждого барбера — свой почерк, опыт и темы для разговора. Выберите того, кому будете доверять не один раз.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== МАСТЕРА ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {masters.map((master, index) => (
              <div key={index} className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg overflow-hidden hover-lift">
                {/* ФОТО (плейсхолдер) */}
                <div className="w-full h-64 md:h-80 bg-gradient-to-b from-club-brown to-club-dark flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>

                {/* ИНФОРМАЦИЯ */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-club-light mb-2">{master.name}</h3>
                  <p className="text-club-gold text-sm mb-4">{master.specialty}</p>

                  <p className="text-club-light opacity-80 text-sm mb-6">{master.description}</p>

                  {/* ОПЫТ И РЕЙТИНГ */}
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-club-gold border-opacity-20">
                    <span className="text-club-gold text-xs">⭐ {master.rating}/5</span>
                    <span className="text-club-light opacity-60 text-xs">{master.experience}</span>
                  </div>

                  {/* КНОПКА */}
                  <button className="w-full btn btn-secondary">Записаться →</button>
                </div>
              </div>
            ))}

            {/* СКОРО В КОМАНДЕ */}
            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg overflow-hidden hover-lift">
              <div className="w-full h-64 md:h-80 bg-gradient-to-b from-club-brown to-club-dark flex items-center justify-center">
                <div className="text-center">
                  <p className="text-club-gold text-sm">🔐</p>
                  <p className="text-club-gold font-bold mt-4">Скоро в открытом расписании</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-club-light mb-4">Барбер, который уже с нами</h3>
                <p className="text-club-light opacity-80 text-sm">
                  Четвёртый мастер уже в команде и принимает гостей по внутренней записи. Сейчас мы настраиваем процессы и готовим обновлённый сайт, чтобы представить его официально.
                </p>
                <p className="text-club-light opacity-60 text-xs mt-4">
                  Если хотите попасть к нему одним из первых — напишите администратору при записи.
                </p>
              </div>
            </div>
          </div>

          {/* ЗАКРЫВАЮЩИЙ ТЕКСТ */}
          <div className="text-center mt-16 p-8 bg-club-brown bg-opacity-10 border border-club-gold border-opacity-30 rounded-lg">
            <p className="text-club-light opacity-80">
              Не знаете, к кому записаться? Напишите пару слов о себе и своём образе жизни — мы предложим мастера, который подойдёт именно вам.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-8 text-club-light">Готовы встретиться?</h2>
          <button className="btn btn-primary text-lg px-8 py-4">Записаться онлайн</button>
        </div>
      </section>
    </>
  )
}
