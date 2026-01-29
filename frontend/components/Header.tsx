export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-club-dark bg-opacity-95 backdrop-blur border-b border-club-gold border-opacity-20">
      <div className="container-custom py-4 flex justify-between items-center">
        {/* ЛОГОТИП */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-club-gold rounded-md flex items-center justify-center">
            <span className="text-club-dark font-bold text-sm">GC</span>
          </div>
          <div>
            <p className="text-sm text-club-gold font-bold leading-none">Джентльмены</p>
            <p className="text-sm text-club-light font-bold leading-none">культуры</p>
          </div>
        </div>

        {/* МЕНЮ */}
        <nav className="hidden md:flex gap-8">
          <a href="#rituals" className="text-club-light hover:text-club-gold transition-colors">Ритуалы</a>
          <a href="#masters" className="text-club-light hover:text-club-gold transition-colors">Мастера</a>
          <a href="#club" className="text-club-light hover:text-club-gold transition-colors">Клуб</a>
          <a href="#media" className="text-club-light hover:text-club-gold transition-colors">Медиа</a>
          <a href="#contacts" className="text-club-light hover:text-club-gold transition-colors">Контакты</a>
        </nav>

        {/* КНОПКА */}
        <button className="btn btn-primary">
          Записаться
        </button>
      </div>
    </header>
  )
}
