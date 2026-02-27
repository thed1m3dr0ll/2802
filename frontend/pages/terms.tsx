// pages/terms.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="section section-paper">
      <div className="container-custom max-w-3xl">
        {/* Хлебные крошки */}
        <nav
          className="mb-4 text-[12px] text-[var(--text-muted)]"
          aria-label="Хлебные крошки"
        >
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link
                href="/"
                className="hover:underline underline-offset-4 text-[var(--text-dark-strong)]"
              >
                Главная
              </Link>
            </li>
            <li className="text-[var(--text-muted)]">/</li>
            <li className="text-[var(--text-muted)]">
              Пользовательское соглашение
            </li>
          </ol>
        </nav>

        <h1 className="mb-4 text-2xl font-semibold text-[var(--text-dark-strong)] md:text-3xl">
          Пользовательское соглашение
        </h1>

        <p className="mb-4 text-sm text-[var(--text-dark)]">
          Настоящее соглашение регулирует использование сайта Gentlemen
          Barbershop Club и онлайн‑форм записи в клуб на Белозёрской, 4.
        </p>

        <div className="space-y-3 text-sm text-[var(--text-dark)]">
          <p>
            1. Сайт носит информационный характер и не является публичной
            офертой. Окончательная стоимость услуг, состав ритуалов и
            доступность мастеров подтверждаются администратором клуба при записи.
          </p>

          <p>
            2. Оставляя заявку через форму на сайте, мессенджеры или по
            телефону, вы передаёте свои контактные данные для связи по вопросам
            записи, изменения или отмены визита.
          </p>

          <p>
            3. Администрация клуба оставляет за собой право изменять
            расписание, состав команды и перечень услуг. Обо всех существенных
            изменениях для уже подтверждённых визитов мы уведомляем по
            указанным контактам.
          </p>

          <p>
            4. Использование материалов сайта (тексты, фотографии, фирменный
            стиль) без согласия владельца клуба не допускается.
          </p>

          <p>
            Продолжая пользоваться сайтом и оставляя заявки на услуги клуба, вы
            подтверждаете согласие с условиями данного соглашения.
          </p>
        </div>
      </div>
    </main>
  );
}
