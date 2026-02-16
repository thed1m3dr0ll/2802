// components/Footer.tsx
import Link from "next/link";
import { trackPhoneClick } from "../lib/analytics";

const socialLinks = {
  instagram: "https://instagram.com/",
  vk: "https://vk.ru/barbershop_gentlemen",
  telegram: "https://t.me/roman_chernof",
};

export default function Footer() {
  const year = new Date().getFullYear();

  const handlePhoneClick = () => {
    trackPhoneClick("footer");
  };

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
                <Link href="/" className="text-white/80 hover:text-white">
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-white/80 hover:text-white"
                >
                  О клубе
                </Link>
              </li>
              <li>
                <Link
                  href="/rituals"
                  className="text-white/80 hover:text-white"
                >
                  Ритуалы клуба
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="text-white/80 hover:text-white"
                >
                  Истории гостей
                </Link>
              </li>
              <li>
                <Link
                  href="/masters"
                  className="text-white/80 hover:text-white"
                >
                  Мастера клуба
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-white/80 hover:text-white"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  href="/cabinet"
                  className="text-white/80 hover:text-white"
                >
                  Личный кабинет
                </Link>
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
                  onClick={handlePhoneClick}
                  className="text-[var(--accent-gold-soft)] hover:text-[#ffd27a] transition-colors"
                >
                  +7 987 755 30 00
                </a>
              </p>
              <p className="text-white/60 text-xs">
                Запись по телефону, в мессенджерах и через личный кабинет.
              </p>
            </div>

            {/* Соцсети */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                мы на связи
              </p>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4 fill-current text-white"
                  >
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 2.5A4.5 4.5 0 1 0 16.5 11 4.51 4.51 0 0 0 12 6.5zm0 2A2.5 2.5 0 1 1 9.5 11 2.5 2.5 0 0 1 12 8.5zM17.75 6a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 17.75 6z" />
                  </svg>
                </a>

                {/* VK */}
                <a
                  href={socialLinks.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VKontakte"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4 fill-current text-white"
                  >
                    <path d="M4 5c-.7 0-1 .5-1 1.2C3 13.4 7.1 19 13 19h2.2c.6 0 .9-.4.9-1v-1.6c0-.7.3-.8.7-.8.4 0 1.6.8 1.9 1.2.3.4.6.5 1 .5h1.5c.7 0 1-.4.9-1.1-.2-1-.9-1.9-1.9-2.7-.5-.5-1.3-.9-1.5-1.1-.3-.2-.2-.3 0-.6 0 0 2.6-3.6 2.8-4.8.1-.4 0-.7-.6-.7h-2.1c-.5 0-.7.2-.8.5-.5 1.4-1.8 3.3-2.3 3.7-.3.3-.5.2-.5-.2V6.3c0-.6-.2-1.1-.9-1.1H9.9c-.5 0-.8.3-.8.6 0 .6.9.7 1 2.3v2.6c0 .6-.3.7-.6.4C8.7 10 7.3 7.9 6.7 6.3 6.5 5.8 6.3 5.5 5.7 5.5z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4 fill-current text-white"
                  >
                    <path d="M21.5 4.2c-.2-.2-.5-.3-.8-.2L3.4 10.3c-.4.1-.7.4-.7.8-.1.4.2.8.5.9l4.3 1.5 1.7 5.3c.1.4.4.7.8.7h.1c.4 0 .7-.2.9-.5l2.4-2.8 4.3 3.1c.2.2.5.3.8.3h.1c.4-.1.8-.4.9-.8l2.6-13.7c.1-.4-.1-.8-.3-1zm-3.7 2.6-8.2 7.3c-.1.1-.2.3-.2.5l-.3 2.7-1.3-4.1 9.9-6.4z" />
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
            Нажимая кнопки записи, вы соглашаетесь на обработку персональных
            данных.
          </p>
          <div className="flex gap-4 text-[10px] text-white/50">
            <Link href="/privacy" className="hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-white">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
