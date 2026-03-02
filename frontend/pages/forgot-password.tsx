// pages/forgot-password.tsx
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ForgotPasswordPage() {
  const pageTitle =
    "Восстановление доступа — Джентльмены Культуры";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Страница восстановления доступа в личный кабинет клуба «Джентльмены Культуры»."
        />
        <link
          rel="canonical"
          href="https://www.gentlemenbarber.ru/forgot-password"
        />
      </Head>

      <Header />

      <main className="section section-paper min-h-[calc(100dvh-140px)]">
        <div className="container-custom max-w-md">
          <div className="mb-6 text-center">
            <p className="label-small mb-2 text-[var(--text-muted)]">
              личный кабинет клуба
            </p>
            <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
              Восстановление доступа
            </h1>
            <p className="text-sm text-club-soft">
              Страница восстановления пароля находится в разработке.
              Если нужен доступ к кабинету, напишите администратору —
              поможем восстановить вход.
            </p>
          </div>

          <div className="card-paper space-y-4 p-5 text-sm">
            <p className="text-[13px] text-[var(--text-dark)]">
              Пока восстановление пароля не автоматизировано. Вы можете:
            </p>
            <ul className="list-disc pl-5 text-[13px] text-[var(--text-dark)] space-y-1">
              <li>
                позвонить администратору клуба по номеру{" "}
                <a
                  href="tel:+79877553000"
                  className="underline underline-offset-2"
                >
                  +7 987 755 30 00
                </a>
                ;
              </li>
              <li>
                написать в Telegram‑бот{" "}
                <a
                  href="https://t.me/gentlemen_barber_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  @gentlemen_barber_bot
                </a>
                ;
              </li>
            </ul>

            <p className="text-[13px] text-club-soft">
              После доработки функционала здесь появится форма для
              восстановления доступа по e‑mail.
            </p>

            <Link
              href="/cabinet/login"
              className="btn-secondary inline-flex justify-center"
            >
              Вернуться ко входу в кабинет
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
