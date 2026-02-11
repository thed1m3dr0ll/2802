import { useEffect, useState } from 'react';

type ReviewSource = 'yandex' | '2gis' | 'site';

interface Review {
  id: number;
  author: string;
  source: ReviewSource;
  rating: number;
  text: string;
  date: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getSourceLabel(source: ReviewSource) {
  if (source === 'yandex') return 'Яндекс Карты';
  if (source === '2gis') return '2ГИС';
  return 'Сайт клуба';
}

export default function AdminReviewsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [author, setAuthor] = useState('');
  const [source, setSource] = useState<ReviewSource>('yandex');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  // пробуем восстановить токен из localStorage при монтировании
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('gentlemen_admin_token');
    if (saved) {
      setAuthToken(saved);
      (async () => {
        try {
          const res = await fetch(`${API_URL}/admin/auth`, {
            method: 'POST',
            headers: {
              'X-Admin-Token': saved,
            },
          });
          if (res.ok) {
            setIsAdmin(true);
          }
        } catch {
          // игнорим
        }
      })();
    }
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/reviews/?offset=0&limit=50`);
      if (!res.ok) throw new Error('Не удалось загрузить отзывы');
      const data = (await res.json()) as Review[];
      setReviews(data);
    } catch (e: any) {
      setError(e.message || 'Ошибка при загрузке отзывов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadReviews();
    }
  }, [isAdmin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!authToken) {
      setAuthError('Введите код администратора');
      return;
    }
    try {
      setAuthLoading(true);
      const res = await fetch(`${API_URL}/admin/auth`, {
        method: 'POST',
        headers: {
          'X-Admin-Token': authToken,
        },
      });
      if (!res.ok) {
        throw new Error('Неверный код администратора');
      }
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('gentlemen_admin_token', authToken);
      }
    } catch (e: any) {
      setAuthError(e.message || 'Ошибка авторизации');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAuthToken('');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('gentlemen_admin_token');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken) {
      setError('Нет кода администратора');
      return;
    }
    try {
      setSubmitting(true);
      setError(null);

      const today = new Date().toISOString().slice(0, 10);
      const payload = {
        author,
        source,
        rating,
        text,
        date: date || today,
      };

      const res = await fetch(`${API_URL}/admin/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': authToken,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.detail
            ? `Ошибка: ${body.detail}`
            : `Ошибка сохранения (${res.status})`
        );
      }

      const created = (await res.json()) as Review;
      setReviews((prev) => [created, ...prev]);

      setAuthor('');
      setText('');
      setRating(5);
      setSource('yandex');
      setDate('');
    } catch (e: any) {
      setError(e.message || 'Ошибка при сохранении отзыва');
    } finally {
      setSubmitting(false);
    }
  };

  // Экран входа
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-red-900 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/10 border border-white/15 shadow-2xl backdrop-blur-xl px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold tracking-wide text-white">
              Админ · отзывы
            </h1>
          </div>

          <p className="text-sm text-white/70 mb-4">
            Введите код администратора, чтобы получить доступ к управлению отзывами клуба.
          </p>

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-white/70 mb-2">
                Код администратора
              </label>
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-600/70 focus:border-transparent"
                placeholder="••••••••••"
              />
            </div>

            {authError && (
              <div className="text-xs text-red-300 bg-red-900/40 border border-red-500/40 rounded-lg px-3 py-2">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-900/50 transition hover:bg-red-600 disabled:opacity-60"
            >
              {authLoading ? 'Проверяем…' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Админ-интерфейс
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-red-900 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide text-white drop-shadow">
              Админ · отзывы
            </h1>
            <p className="mt-1 text-xs text-white/60">
              Закрытая зона для команды клуба. Здесь вы вручную добавляете проверенные отзывы с Яндекса, 2ГИС и сайта.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-[11px] uppercase tracking-wide text-white/60 hover:text-white/90 transition underline underline-offset-4"
          >
            выйти
          </button>
        </div>

        {/* Карта формы */}
        <div className="rounded-2xl bg-white/10 border border-white/15 shadow-2xl backdrop-blur-xl px-6 py-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-medium text-white mb-2">
              Добавить отзыв
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-white/70 mb-2">
                  Имя
                </label>
                <input
                  className="w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-red-600/70 focus:border-transparent"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Тестовый гость"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-white/70 mb-2">
                  Источник
                </label>
                <select
                  className="w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600/70 focus:border-transparent"
                  value={source}
                  onChange={(e) => setSource(e.target.value as ReviewSource)}
                >
                  <option value="yandex">Яндекс Карты</option>
                  <option value="2gis">2ГИС</option>
                  <option value="site">Сайт клуба</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-white/70 mb-2">
                  Рейтинг
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="w-24 rounded-lg border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600/70 focus:border-transparent"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-white/70 mb-2">
                  Дата
                </label>
                <input
                  type="date"
                  className="w-full md:w-auto rounded-lg border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600/70 focus:border-transparent"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <p className="mt-1 text-[11px] text-white/40">
                  Если оставить пустым — подставится сегодняшняя дата.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-white/70 mb-2">
                Текст отзыва
              </label>
              <textarea
                className="w-full rounded-lg border border-white/20 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-red-600/70 focus:border-transparent"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Очень крутая атмосфера, вернусь ещё."
                required
              />
            </div>

            {error && (
              <div className="text-xs text-red-200 bg-red-900/40 border border-red-500/40 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-900/50 transition hover:bg-red-600 disabled:opacity-60"
              >
                {submitting ? 'Сохраняю…' : 'Сохранить отзыв'}
              </button>
              <p className="text-[11px] text-white/40">
                Отзывы отсюда отображаются на главной странице клуба.
              </p>
            </div>
          </form>
        </div>

        {/* Список отзывов */}
        <div className="rounded-2xl bg-black/30 border border-white/10 shadow-xl backdrop-blur-xl px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">
              Последние отзывы
            </h2>
            <button
              className="text-xs text-white/60 hover:text-white/90 underline underline-offset-4"
              onClick={loadReviews}
              disabled={loading}
            >
              {loading ? 'Обновляю…' : 'Обновить'}
            </button>
          </div>

          {error && (
            <div className="mb-3 text-xs text-red-200 bg-red-900/40 border border-red-500/40 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="rounded-xl bg-white/95 border border-white/70 shadow-md px-4 py-3 text-sm"
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <div className="font-medium text-neutral-900">
                      {r.author}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {getSourceLabel(r.source)} ·{' '}
                      {new Date(r.date).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div className="text-xs text-red-700 font-semibold">
                    {'★'.repeat(r.rating)}
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-neutral-800 whitespace-pre-line">
                  {r.text}
                </p>
              </div>
            ))}

            {!loading && reviews.length === 0 && (
              <div className="text-sm text-white/60">
                Отзывов пока нет — добавьте первый выше.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
