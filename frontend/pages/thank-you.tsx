// pages/thank-you.tsx
import Link from "next/link";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Спасибо за запись | Джентльмены Культуры</title>
        <meta
          name="description"
          content="Заявка на запись в клуб «Джентльмены Культуры» принята. Администратор свяжется с вами для подтверждения визита."
        />
        <meta property="og:title" content="Спасибо за запись" />
        <meta
          property="og:description"
          content="Мы получили вашу заявку и скоро свяжемся для уточнения деталей визита в клуб."
        />
        <link rel="canonical" href="https://gentlemenbarber.ru/thank-you" />
      </Head>

      <Header />

      <main className="section section-dark">
        <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(72,199,116,0.12)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
          </div>

          <p className="label-small text-club-muted mb-2">
            клубная запись оформлена
          </p>

          <h1 className="mb-3 text-[24px] font-semibold tracking-[0.04em] md:text-[30px]">
            Спасибо, заявка принята.
          </h1>

          <p className="mb-6 max-w-xl text-[13px] text-[var(--text-muted)] md:text-sm">
            Мы получили ваш запрос на запись в клуб «Джентльмены Культуры».
            Администратор свяжется с вами по телефону или в мессенджере, чтобы
            уточнить время визита и подтвердить ритуал.
          </p>

          <div className="mb-8 max-w-xl rounded-2xl border border-[rgba(245,239,230,0.16)] bg-[rgba(10,6,4,0.9)] px-4 py-3 text-[12px] text-[var(--text-muted-strong)]">
            Если вы оформили запись случайно или хотите внести изменения, просто
            напишите нам в{" "}
            <a
              href="https://t.me/barberRomanChernov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[rgba(255,255,255,0.32)] underline-offset-2 hover:text-[var(--accent-gold-soft)]"
            >
              Telegram
            </a>{" "}
            или позвоните по номеру{" "}
            <a
              href="tel:+79877553000"
              className="underline decoration-[rgba(255,255,255,0.32)] underline-offset-2 hover:text-[var(--accent-gold-soft)]"
            >
              +7 987 755‑30‑00
            </a>
            .
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(245,239,230,0.24)] bg-transparent px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--text-main)] transition-colors hover:border-[rgba(255,96,72,0.6)] hover:bg-[rgba(255,96,72,0.12)]"
          >
            вернуться на главную
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
