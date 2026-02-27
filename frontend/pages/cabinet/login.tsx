// pages/cabinet/login.tsx
import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type Mode = "login" | "register";

export default function CabinetAuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageTitle =
    mode === "login"
      ? "Вход в личный кабинет — Gentlemen Barbershop Club"
      : "Регистрация в личном кабинете — Gentlemen Barbershop Club";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (err) {
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
          content="Вход и регистрация в личный кабинет Gentlemen Barbershop Club."
        />
        <link
          rel="canonical"
          href="https://gentlemenbarber.ru/cabinet/login"
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

            <p className="mt-2 text-[11px] text-club-soft">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              и правилами клуба.
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
