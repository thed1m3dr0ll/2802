// pages/privacy.tsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  const pageTitle = "Политика конфиденциальности — Gentlemen Barbershop Club";
  const pageDescription =
    "Политика конфиденциальности барбершоп‑клуба «Джентльмены Культуры» в Нижнем Новгороде: как мы обрабатываем и защищаем персональные данные гостей.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://gentlemenbarber.ru/privacy" />
      </Head>

      <Header />

      <main className="section section-paper">
        <div className="container-custom max-w-3xl">
          <h1 className="mb-4 text-2xl font-semibold text-[var(--text-dark)] md:text-3xl">
            Политика конфиденциальности
          </h1>

          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Эта политика описывает, какие данные гости барбершоп‑клуба
            «Джентльмены Культуры» передают через сайт, формы записи и
            мессенджеры, и как мы с ними обращаемся.
          </p>

          <h2 className="mb-2 text-lg font-semibold text-[var(--text-dark)]">
            1. Какие данные мы получаем
          </h2>
          <p className="mb-2 text-sm text-[var(--text-muted)]">
            Мы можем получать следующие данные:
          </p>
          <ul className="mb-4 list-disc pl-5 text-sm text-[var(--text-muted)]">
            <li>имя или псевдоним;</li>
            <li>номер телефона и ссылки на мессенджеры;</li>
            <li>предпочтительные дата и время визита, выбранный мастер и ритуал;</li>
            <li>комментарии к записи и пожелания по визиту;</li>
            <li>технические данные: cookie‑файлы, данные Метрики и других систем аналитики.</li>
          </ul>

          <h2 className="mb-2 text-lg font-semibold text-[var(--text-dark)]">
            2. Зачем мы используем эти данные
          </h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Данные используются для:
          </p>
          <ul className="mb-4 list-disc pl-5 text-sm text-[var(--text-muted)]">
            <li>создания и подтверждения записи в клуб;</li>
            <li>связи по вопросам изменения или отмены визита;</li>
            <li>улучшения сервиса и планирования работы клуба;</li>
            <li>анонимной статистики посещаемости сайта.</li>
          </ul>

          <h2 className="mb-2 text-lg font-semibold text-[var(--text-dark)]">
            3. Передача третьим лицам
          </h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Мы не продаём и не передаём ваши контакты третьим лицам для их
            маркетинговых рассылок. Данные могут обрабатываться сервисами, которые
            помогают нам работать (система онлайн‑записи, аналитика, хостинг),
            на условиях конфиденциальности.
          </p>

          <h2 className="mb-2 text-lg font-semibold text-[var(--text-dark)]">
            4. Срок хранения и удаление
          </h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Контактные данные и история записей хранятся столько, сколько это
            необходимо для работы клуба и ведения истории визитов. Вы можете
            обратиться к администратору клуба с запросом на уточнение или
            удаление ваших данных в системе записи.
          </p>

          <h2 className="mb-2 text-lg font-semibold text-[var(--text-dark)]">
            5. Cookies и аналитика
          </h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            На сайте используются cookie‑файлы и инструменты веб‑аналитики
            (например, Яндекс Метрика) для оценки посещаемости и эффективности
            рекламы. Вы можете ограничить использование cookies в настройках
            своего браузера.
          </p>

          <h2 className="mb-2 text-lg font-semibold text-[var(--text-dark)]">
            6. Контакты по вопросам данных
          </h2>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            По вопросам обработки персональных данных вы можете обратиться к
            администратору клуба через телефон{" "}
            <a
              href="tel:+79877553000"
              className="text-[var(--accent-gold-soft)] hover:opacity-80"
            >
              +7 987 755 30 00
            </a>{" "}
            или в Telegram клуба.
          </p>

          <p className="mt-6 text-sm text-[var(--text-muted)]">
            Продолжая пользоваться сайтом и оставляя заявки, вы подтверждаете
            согласие с настоящей политикой конфиденциальности.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
