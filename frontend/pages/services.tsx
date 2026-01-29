export default function Services() {
  const rituals = [
    {
      title: "Мужская стрижка",
      description: "Классический ритуал, с которого начинается знакомство с барбершопом. Диагностика волос и формы головы, обсуждение желаемого образа, стрижка, мойка и укладка с рекомендациями по домашнему уходу.",
      duration: "45–60 минут",
      price: "1,500 ₽",
      category: "Стрижка"
    },
    {
      title: "Коррекция стрижки",
      description: "Когда прошло немного времени, форма ещё жива, но хочется освежить контуры. Аккуратно убираем лишнее, не меняя образ полностью.",
      duration: "30–40 минут",
      price: "900 ₽",
      category: "Стрижка"
    },
    {
      title: "Моделирование бороды",
      description: "Выстраиваем чёткие линии, подбираем длину и форму под лицо и образ жизни. Используем горячее полотенце, масла и средства для ухода, чтобы борода выглядела ухоженно на каждый день.",
      duration: "40–50 минут",
      price: "1,200 ₽",
      category: "Борода"
    },
    {
      title: "Коррекция бороды",
      description: "Подравниваем длину, аккуратно обновляем контуры и возвращаем бороде форму без кардинальных изменений.",
      duration: "20–30 минут",
      price: "600 ₽",
      category: "Борода"
    },
    {
      title: "Стрижка + борода",
      description: "Полный мужской ритуал: стрижка, борода, укладка и финальные штрихи. Идеальный выбор, если хотите выйти из кресла полностью собранным.",
      duration: "75–90 минут",
      price: "2,400 ₽",
      category: "Комплекс"
    },
    {
      title: "Отец и сын",
      description: "Совместный визит для тех, кто хочет сделать уход за собой частью семейной традиции. Спокойная атмосфера, уважение к каждому гостю и немного магии для ребёнка, который впервые попадает в барбершоп.",
      duration: "от 60 минут",
      price: "договорная",
      category: "Комплекс"
    },
    {
      title: "Под важный день",
      description: "Собеседование, свадьба, выступление или выезд. Продумываем образ под событие: стрижка, борода, укладка и советы по тому, как сохранить результат.",
      duration: "90+ минут",
      price: "договорная",
      category: "Особые случаи"
    },
    {
      title: "Подарочный сертификат",
      description: "Если нужно сделать подарок мужчине и не промахнуться. Сертификат на ритуал в барбершопе с душой — всегда уместная история.",
      duration: "–",
      price: "от 600 ₽",
      category: "Подарок"
    }
  ]

  return (
    <>
      {/* ==================== ИНТРО ==================== */}
      <section className="section bg-gradient-to-b from-club-dark via-club-dark to-club-dark pt-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-club-light">
              Ритуалы Джентльменов культуры
            </h1>
            <p className="text-lg text-club-light opacity-80 max-w-3xl mx-auto">
              Мы собрали услуги в понятные ритуалы: стрижка, борода, комплекс и особые случаи. Выбирайте по задаче, а не только по цене.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== РИТУАЛЫ ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rituals.map((ritual, index) => (
              <div key={index} className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-6 hover-lift">
                <div className="inline-block bg-club-gold bg-opacity-20 text-club-gold text-xs px-3 py-1 rounded-full mb-4">
                  {ritual.category}
                </div>
                <h3 className="text-2xl font-bold text-club-light mb-3">{ritual.title}</h3>
                <p className="text-club-light opacity-80 mb-6">{ritual.description}</p>
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-club-gold border-opacity-20">
                  <span className="text-club-gold text-sm">⏱ {ritual.duration}</span>
                  <span className="text-club-gold font-bold text-lg">{ritual.price}</span>
                </div>
                <button className="w-full btn btn-secondary">Записаться →</button>
              </div>
            ))}
          </div>

          {/* ЗАКРЫВАЮЩИЙ ТЕКСТ */}
          <div className="text-center mt-16 p-8 bg-club-brown bg-opacity-10 border border-club-gold border-opacity-30 rounded-lg">
            <p className="text-club-light opacity-80">
              Если сомневаетесь, какой ритуал выбрать — просто опишите вашу задачу при записи, и администратор подберёт лучший вариант по времени и бюджету.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-8 text-club-light">Готовы начать?</h2>
          <button className="btn btn-primary text-lg px-8 py-4">Записаться онлайн</button>
        </div>
      </section>
    </>
  )
}
