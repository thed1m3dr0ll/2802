// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

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
            d="M0 20 Q 25 5 50 10 T 100 5 L 100 20 Z"
            fill="#05060a"
          />
        </svg>
      </div>

      {/* Сам футер */}
      <div className="bg-[#05060a] text-white pt-10 pb-8 border-t border-white/10">
        <div className="container-custom flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* О клубе */}
          <div className="space-y-3 max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.26em] text-white/40">
              закрытый барбершоп‑клуб
            </p>
            <p className="text-sm text-white/80">
              Место, куда приходят не подстричься по‑быстрому, а забрать свой
              час в спокойной атмосфере: свет, музыка, бар и люди, которым
              можно доверить голову.
            </p>
            <p className="text-[11px] text-white/40">
              © {year} Клуб на Белозёрской, 4.
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

          {/* Контакты и соцсети */}
          <div className="space-y-3 text-sm max-w-xs">
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
                  className="text-[var(--accent-gold-soft)] hover:text-[#ffd27a] transition-colors"
                >
                  +7 987 755 30 00
                </a>
              </p>
              <p className="text-white/60 text-xs">
                Запись по телефону, в мессенджерах и через личный кабинет.
              </p>
            </div>

            {/* Соцсети (иконки по аудиту) */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                мы на связи
              </p>
              <div className="social-links">
                <a
                  href="https://instagram.com/gentlemennn"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                >
                  {/* SVG Instagram */}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 7.3A4.7 4.7 0 1 0 16.7 12 4.71 4.71 0 0 0 12 7.3zm0 7.7A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm5-7.9a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1ZM21 7.5a6.33 6.33 0 0 0-1.6-4.5A6.33 6.33 0 0 0 15 1.4 40.32 40.32 0 0 0 9 1.4a6.33 6.33 0 0 0-4.5 1.6A6.33 6.33 0 0 0 2.9 7.5 40.32 40.32 0 0 0 2.9 13a6.33 6.33 0 0 0 1.6 4.5A6.33 6.33 0 0 0 9 19.1a40.32 40.32 0 0 0 6 0 6.33 6.33 0 0 0 4.5-1.6A6.33 6.33 0 0 0 21 13a40.32 40.32 0 0 0 0-5.5Zm-2 6.9a3.79 3.79 0 0 1-2.1 2.1 24.78 24.78 0 0 1-4.9.3 24.78 24.78 0 0 1-4.9-.3 3.79 3.79 0 0 1-2.1-2.1 24.78 24.78 0 0 1-.3-4.9 24.78 24.78 0 0 1 .3-4.9 3.79 3.79 0 0 1 2.1-2.1 24.78 24.78 0 0 1 4.9-.3 24.78 24.78 0 0 1 4.9.3 3.79 3.79 0 0 1 2.1 2.1 24.78 24.78 0 0 1 .3 4.9 24.78 24.78 0 0 1-.3 4.9Z" />
                  </svg>
                </a>
                <a
                  href="https://vk.com/gentlemennn"
                  target="_blank"
                  rel="noopener"
                  aria-label="VKontakte"
                >
                  {/* SVG VK */}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 7.2C3 6 4 5 5.2 5h13.6C20 5 21 6 21 7.2v9.6C21 18 20 19 18.8 19H5.2C4 19 3 18 3 16.8ZM6.4 8.2v7.6h2v-2.6h1.5c2.1 0 3.1-1.3 3.1-2.7 0-1.4-1-2.7-3.1-2.7Zm2 1.7h1.3c.9 0 1.4.6 1.4 1.3s-.5 1.3-1.4 1.3H8.4Zm7.2-.1c-.7 0-1.3.3-1.7.9v-0.8h-1.9v5.6h1.9v-3c0-.6.4-1 1-.1.2.2.4.6.5 1l.6 2.1H18l-.7-2.4c-.2-.6-.5-1.1-.9-1.4.5-.3.8-.9.8-1.5 0-1.1-.8-1.9-1.6-1.9Z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/gentlemennn"
                  target="_blank"
                  rel="noopener"
                  aria-label="Telegram"
                >
                  {/* SVG Telegram */}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.3 3.3 3.7 10.1c-1.1.5-1.1 1.3-.2 1.6l4.1 1.3 1.6 5c.2.4.1.5.5.5.3 0 .4-.1.6-.3l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.2-1.6Zm-2.1 3.1-8 7.4-.3 3.1-1.4-4.3 9.7-6.2Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Низ футера: политика / оферта */}
        <div className="container-custom mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[10px] text-white/40 max-w-md">
            Сайт носит информационный характер и не является публичной офертой.
            Нажимая кнопки записи, вы соглашаетесь на обработку персональных данных.
          </p>
          <div className="flex gap-4 text-[10px] text-white/50">
          <a href="/privacy" className="hover:text-white">
            Политика конфиденциальности
          </a>
          <a href="/terms" className="hover:text-white">
            Пользовательское соглашение
          </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
