// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 relative">
      {/* Волнистый верх футера */}
      <div className="pointer-events-none absolute top-[-32px] left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="block w-full h-[40px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 20"
        >
          <path
            // цвет волны = фон футера
            d="M0 20 Q 25 5 50 10 T 100 5 L 100 20 Z"
            fill="#05060a"
          />
        </svg>
      </div>

      {/* Сам футер в твоей палитре */}
      <div className="bg-[#05060a] text-white pt-10 pb-8 border-t border-white/10">
        <div className="container-custom flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* О клубе */}
          <div className="space-y-3 max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.26em] text-white/40">
              закрытый барбершоп‑клуб
            </p>
            <p className="text-sm text-white/80">
              Место, куда приходят не «подстричься по‑быстрому», а забрать
              свой час в спокойной атмосфере: свет, музыка, бар и люди,
              которым можно доверить голову.
            </p>
            <p className="text-[11px] text-white/40">
              © {new Date().getFullYear()} Клуб на Белозёрской, 4.
            </p>
          </div>

          {/* Навигация */}
          <nav className="space-y-3 text-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              навигация
            </p>
            <ul className="space-y-1">
              <li>
                <a href="/" className="text-white/80 hover:text-white">
                  Главная
                </a>
              </li>
              <li>
                <a href="/rituals" className="text-white/80 hover:text-white">
                  Ритуалы клуба
                </a>
              </li>
              <li>
                <a href="/stories" className="text-white/80 hover:text-white">
                  Истории гостей
                </a>
              </li>
              <li>
                <a href="/masters" className="text-white/80 hover:text-white">
                  Мастера клуба
                </a>
              </li>
              <li>
                <a href="/cabinet" className="text-white/80 hover:text-white">
                  Личный кабинет
                </a>
              </li>
            </ul>
          </nav>

          {/* Контакты */}
          <div className="space-y-3 text-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              контакты клуба
            </p>
            <div className="space-y-1">
              <p className="text-white/80">
                Нижний Новгород,
                <br />
                ул. Белозёрская, 4
              </p>
              <p>
                <a
                  href="tel:+79877553000"
                  className="text-[#f1b44c] hover:text-[#ffd27a] transition-colors"
                >
                  +7 987 755 30 00
                </a>
              </p>
              <p className="text-white/60 text-xs">
                Запись по телефону, в мессенджерах и через личный кабинет.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
