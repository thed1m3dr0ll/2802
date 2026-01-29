export default function Contacts() {
  return (
    <>
      {/* ==================== ИНТРО ==================== */}
      <section className="section bg-gradient-to-b from-club-dark via-club-dark to-club-dark pt-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-club-light">
              Как нас найти
            </h1>
            <p className="text-lg text-club-light opacity-80 max-w-3xl mx-auto">
              Барбершоп «Джентльмены культуры» находится в Нижнем Новгороде по адресу: Белозёрская улица, 4, 1 этаж. Мы работаем по записи, чтобы у каждого гостя было своё время без очередей и суеты.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== КОНТАКТЫ ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* ЛЕВ СТОЛБЕЦ: ИНФОРМАЦИЯ */}
            <div>
              <h2 className="text-3xl font-bold text-club-light mb-8">Контактная информация</h2>

              <div className="space-y-8">
                {/* АДРЕС */}
                <div>
                  <p className="text-club-gold text-sm font-bold mb-2">АДРЕС</p>
                  <p className="text-club-light text-lg">
                    Нижний Новгород,
                    <br />
                    Белозёрская, 4
                    <br />
                    1 этаж
                  </p>
                </div>

                {/* ВРЕМЯ */}
                <div>
                  <p className="text-club-gold text-sm font-bold mb-2">ЧАСЫ РАБОТЫ</p>
                  <p className="text-club-light text-lg">
                    10:00 – 22:00
                    <br />
                    Ежедневно
                  </p>
                  <p className="text-club-light opacity-60 text-sm mt-2">
                    Работаем по записи
                  </p>
                </div>

                {/* ТЕЛЕФОН */}
                <div>
                  <p className="text-club-gold text-sm font-bold mb-2">ТЕЛЕФОН</p>
                  <a href="tel:+78311234567" className="text-club-light text-lg hover:text-club-gold transition-colors">
                    +7 (831) 123-45-67
                  </a>
                </div>

                {/* МЕССЕНДЖЕРЫ */}
                <div>
                  <p className="text-club-gold text-sm font-bold mb-4">НАПИШИТЕ НАМ</p>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-3 text-club-light hover:text-club-gold transition-colors">
                      <span>✉</span>
                      <span>Telegram</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 text-club-light hover:text-club-gold transition-colors">
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* КНОПКИ */}
              <div className="mt-12 space-y-4">
                <button className="w-full btn btn-primary">Позвонить</button>
                <button className="w-full btn btn-secondary">Написать в Telegram</button>
                <button className="w-full btn btn-secondary">Записаться онлайн</button>
                <button className="w-full btn btn-secondary">Проложить маршрут</button>
              </div>
            </div>

            {/* ПРАВЫЙ СТОЛБЕЦ: КАРТА */}
            <div>
              <div className="bg-club-brown bg-opacity-20 rounded-lg p-8 border border-club-gold border-opacity-30 flex items-center justify-center h-full min-h-96">
                <div className="text-center">
                  <p className="text-4xl mb-4">📍</p>
                  <p className="text-club-light opacity-80 text-lg">
                    Карта будет здесь
                  </p>
                  <p className="text-club-light opacity-60 text-sm mt-4">
                    Нижний Новгород, Белозёрская, 4
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ЗАКРЫВАЮЩИЙ ТЕКСТ */}
          <div className="text-center mt-16 p-8 bg-club-brown bg-opacity-10 border border-club-gold border-opacity-30 rounded-lg">
            <p className="text-club-light opacity-80">
              Если не нашли удобное время в онлайн‑записи — напишите нам. Обязательно найдем решение.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== КАК ДОБРАТЬСЯ ==================== */}
      <section className="section bg-club-dark border-t border-club-gold border-opacity-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-club-light">Как добраться</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8 text-center">
              <p className="text-2xl mb-4">🚶</p>
              <h3 className="text-xl font-bold text-club-light mb-3">Пешком</h3>
              <p className="text-club-light opacity-80 text-sm">
                Ближайшая остановка транспорта в 300 метрах. Удобно припаркуешься рядом.
              </p>
            </div>

            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8 text-center">
              <p className="text-2xl mb-4">🚗</p>
              <h3 className="text-xl font-bold text-club-light mb-3">На машине</h3>
              <p className="text-club-light opacity-80 text-sm">
                Припаркуйтесь на улице Белозёрской или воспользуйтесь наш GPS код.
              </p>
            </div>

            <div className="bg-club-dark border border-club-gold border-opacity-30 rounded-lg p-8 text-center">
              <p className="text-2xl mb-4">🛕</p>
              <h3 className="text-xl font-bold text-club-light mb-3">Общественный транспорт</h3>
              <p className="text-club-light opacity-80 text-sm">
                Маршруты 1, 7, 14 идут мимо. Выходите и идите 2 минуты.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
