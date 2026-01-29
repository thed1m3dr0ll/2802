export default function Footer() {
  return (
    <footer className="bg-club-dark border-t border-club-gold border-opacity-20 py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* О КЛУБЕ */}
          <div>
            <h4 className="text-club-gold font-bold mb-4">Джентльмены культуры</h4>
            <p className="text-club-light text-sm opacity-80">
              Барбершоп, в котором есть душа и своя история.
            </p>
          </div>

          {/* ССЫЛКИ */}
          <div>
            <h4 className="text-club-gold font-bold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-club-light hover:text-club-gold transition-colors">Ритуалы</a></li>
              <li><a href="#" className="text-club-light hover:text-club-gold transition-colors">Мастера</a></li>
              <li><a href="#" className="text-club-light hover:text-club-gold transition-colors">Медиа</a></li>
            </ul>
          </div>

          {/* КОНТАКТЫ */}
          <div>
            <h4 className="text-club-gold font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-club-light opacity-80">+7 (831) XXX-XX-XX</li>
              <li><a href="#" className="text-club-gold hover:text-club-light transition-colors">Написать нам</a></li>
            </ul>
          </div>

          {/* РЕЖИМ */}
          <div>
            <h4 className="text-club-gold font-bold mb-4">Часы работы</h4>
            <ul className="space-y-2 text-sm text-club-light opacity-80">
              <li>10:00 – 22:00</li>
              <li>Ежедневно</li>
              <li className="pt-2">Работаем по записи</li>
            </ul>
          </div>
        </div>

        {/* РАЗДЕЛИТЕЛЬ */}
        <div className="border-t border-club-gold border-opacity-20 pt-8">
          <p className="text-center text-sm text-club-light opacity-60">
            © 2026 Джентльмены культуры. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
