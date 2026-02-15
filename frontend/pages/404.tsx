// pages/404.tsx
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Страница не найдена | Джентльмены Культуры</title>
        <meta
          name="description"
          content="Похоже, вы свернули не в тот переулок. Но клуб «Джентльмены Культуры» по‑прежнему на связи."
        />
      </Head>

      <Header onBookClick={() => {}} />

      <main className="section section-dark min-h-[60vh] flex items-center">
        <div className="container-custom max-w-2xl text-center space-y-5">
          <p className="label-small text-club-muted">ошибка 404</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Похоже, этот уголок города ещё не открыт
          </h1>
          <p className="text-club-soft text-[14px] md:text-[15px]">
            Страница, на которую вы попали, не живёт в структуре сайта. Зато живёт
            клуб на Белозёрской, 4 — с ритуалами, мастерами и атмосферой, ради
            которой сюда заходят.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Link
              href="/"
              className="btn-primary-dark inline-flex items-center justify-center"
            >
              вернуться на главную
            </Link>
            <Link
              href="/rituals"
              className="btn-secondary-dark inline-flex items-center justify-center"
            >
              посмотреть ритуалы
            </Link>
          </div>

          <div className="mt-5 space-y-1 text-[13px] text-club-soft">
            <p>Если что-то пошло не так — администратор всегда на связи:</p>
            <p>
              Телефон{' '}
              <a
                href="tel:+79877553000"
                className="text-[var(--accent-gold-soft)] hover:opacity-80 transition-colors"
              >
                +7 987 755 30 00
              </a>
            </p>
            <p>
              Telegram{' '}
              <a
                href="https://t.me/barberRomanChernov" 
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent-gold-soft)] hover:opacity-80 transition-colors"
              >
                написать в клуб
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
