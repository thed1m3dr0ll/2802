// components/Header.tsx
import Link from 'next/link'

const navItems = [
  { href: '/rituals', label: 'Ритуалы' },
  { href: '/masters', label: 'Мастера' },
  { href: '/stories', label: 'Истории' },
  { href: '/cabinet', label: 'Кабинет' },
]

export default function Header() {
  return (
    <header className="relative z-30">
      <div className="relative bg-[#05060a] text-white">
        <div className="container-custom flex items-center justify-between py-5">
          {/* ЛОГОТИП С ПРОЖЕКТОРОМ, СМЕЩЁН ВЛЕВО */}
          <Link href="/" className="flex items-center gap-3 mr-auto">
            <div className="relative z-30">
              <div className="absolute inset-0 rounded-full bg-[#ff3232] blur-xl opacity-95 scale-110" />
              <img
                src="/images/Logotip-bez-fona.svg"
                alt="Barbershop Club"
                className="relative h-24 w-auto scale-150"
              />
            </div>
          </Link>

          {/* НАВИГАЦИЯ */}
          <nav className="hidden md:flex items-center gap-6 text-sm z-30">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* КНОПКА И ТЕЛЕФОН, ПРИЖАТЫ ВПРАВО */}
          <div className="flex items-center gap-4 z-30 ml-auto">
            <a
              href="tel:+79877553000"
              className="hidden md:inline text-xs text-[#f1b44c] hover:text-[#ffd27a] transition-colors"
            >
              +7 987 755 30 00
            </a>
            <button className="rounded-full bg-[#e84545] text-white text-xs font-semibold px-4 py-2 shadow-md hover:bg-[#ff5555] transition">
              Записаться
            </button>
          </div>
        </div>

        {/* НАКЛОНЁННЫЙ НИЗ: СПРАВА ПОЧТИ РОВНО, СЛЕВА ГЛУБОКО */}
        <div className="pointer-events-none absolute bottom-[-18px] left-0 w-full overflow-hidden leading-[0] z-10">
          <svg
            className="block w-full h-[36px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 100 20"
          >
            {/* RIGHT_Y = 12 (под кнопкой почти ровно), LEFT_Y = 20 (под логотипом глубже) */}
            <polygon
              fill="#05060a"
              points="0,0 100,0 100,12 0,20"
            />
          </svg>
        </div>
      </div>
    </header>
  )
}
