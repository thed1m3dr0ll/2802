import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type Mode = "login" | "register";

export default function CabinetAuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageTitle =
    mode === "login"
      ? "Вход в личный кабинет — Джентльмены Культуры"
      : "Регистрация в личном кабинете — Джентльмены Культуры";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "register" && password !== passwordConfirm) {
      setError("Пароли не совпадают. Проверьте ввод.");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          mode === "login"
            ? { email, password }
            : { email, password, name: name || undefined },
        ),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          (data?.detail as string) ||
            "Не удалось выполнить запрос. Попробуйте ещё раз.",
        );
        return;
      }
      await Router.push("/cabinet");
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Вход и регистрация в личный кабинет клуба «Джентльмены Культуры» в Нижнем Новгороде."
        />
        <link
          rel="canonical"
          href="https://www.gentlemenbarber.ru/cabinet/login"
        />
      </Head>

      <Header onBookClick={() => Router.push("/#booking")} />

      <main className="section section-paper min-h-[calc(100dvh-140px)]">
        <div className="container-custom max-w-md">
          <div className="mb-6 text-center">
            <p className="label-small mb-2 text-[var(--text-muted)]">
              личный кабинет клуба
            </p>
            <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
              {mode === "login"
                ? "Войти в личный кабинет"
                : "Создать кабинет гостя"}
            </h1>
            <p className="text-sm text-club-soft">
              Используйте e‑mail и пароль. Позже вы сможете добавить телефон
              для истории визитов из клуба.
            </p>
          </div>

          {/* Ценность кабинета */}
          <div className="mb-5 rounded-lg border border-black/5 bg-black/[0.02] p-4 text-xs text-[var(--text-dark)] md:text-sm">
            <p className="mb-2 font-semibold">
              Зачем вам личный кабинет клуба:
            </p>
            <ul className="space-y-1">
              <li>• история визитов и записей в одном месте;</li>
              <li>• закреплённый мастер и привычные ритуалы;</li>
              <li>• рекомендации по уходу после визитов;</li>
              <li>• закрытые предложения и новости клуба.</li>
            </ul>
          </div>

          <div className="mb-4 flex gap-2 text-xs uppercase tracking-[0.18em]">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`flex-1 rounded-md border px-3 py-2 ${
                mode === "login"
                  ? "bg-[var(--text-dark)] text-white border-[var(--text-dark)]"
                  : "bg-white text-[var(--text-dark)] border-black/10 hover:bg-black/5"
              }`}
            >
              вход
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              className={`flex-1 rounded-md border px-3 py-2 ${
                mode === "register"
                  ? "bg-[var(--text-dark)] text-white border-[var(--text-dark)]"
                  : "bg-white text-[var(--text-dark)] border-black/10 hover:bg-black/5"
              }`}
            >
              регистрация
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="card-paper space-y-4 p-5 text-sm"
          >
            {mode === "register" && (
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  как к вам обращаться
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-red)]"
                  placeholder="Имя"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                e‑mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-red)]"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                пароль
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-red)]"
                placeholder="Минимум 6 символов"
              />
            </div>

            {mode === "register" && (
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  повторите пароль
                </label>
                <input
                  type="password"
                  required
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-red)]"
                  placeholder="Повторите пароль"
                />
              </div>
            )}

            {error && (
              <p className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60"
            >
              {isSubmitting
                ? mode === "login"
                  ? "Входим…"
                  : "Создаём кабинет…"
                : mode === "login"
                ? "Войти"
                : "Зарегистрироваться"}
            </button>

            {mode === "login" && (
              <p className="mt-2 text-center text-[11px] text-club-soft">
                <Link
                  href="/forgot-password"
                  className="underline underline-offset-4 hover:text-[var(--accent-red)]"
                >
                  Забыл пароль?
                </Link>
              </p>
            )}

            <p className="mt-2 text-[11px] text-club-soft">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-2 hover:text-[var(--accent-red)]"
              >
                политикой обработки персональных данных
              </Link>{" "}
              и{" "}
              <Link
                href="/terms-of-service"
                className="underline underline-offset-2 hover:text-[var(--accent-red)]"
              >
                правилами клуба
              </Link>
              .
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
