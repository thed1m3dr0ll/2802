/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // БАЗОВАЯ ПАЛИТРА КЛУБА
        'club-dark': '#080608',        // общий тёмный фон
        'club-dark-soft': '#12090b',   // мягкий бордовый фон
        'club-primary': '#bf2525',     // твой основной красный (фон логотипа)
        'club-primary-soft': '#ff4a4a',// более светлый акцент
        'club-gold': '#d4af37',        // золото для акцентов
        'club-brown': '#8b5a3c',       // тёплый коричневый
        'club-light': '#f5f5f5',       // основной светлый текст
        'club-muted': '#a6a6a6',       // приглушённый текст
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Sitka', 'Sitka Text', 'Sitka Subheading', 'Georgia', 'serif'],
      },
      spacing: {
        18: '4.5rem',
        128: '32rem',
      },
    },
  },
  plugins: [],
}
