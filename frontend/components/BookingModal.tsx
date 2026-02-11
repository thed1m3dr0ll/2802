// components/BookingModal.tsx
import { useState, useEffect, useRef } from 'react';
import { openYclients } from '../lib/openYclients';

type BookingInitialContext = {
  masterName?: string;
  ritualName?: string;
} | null;

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: BookingInitialContext;
};

const SCENARIOS = [
  { id: 'collect_head', label: 'Собрать голову' },
  { id: 'collect_image', label: 'Собрать образ' },
  { id: 'clean_contour', label: 'Чистый контур' },
  {
    id: 'turn_off_head',
    label: 'Выключить голову (для гостей 5+ визитов)',
  },
  { id: 'unsure', label: 'Пока не знаю, подскажите' },
];

export default function BookingModal({
  isOpen,
  onClose,
  initialContext,
}: BookingModalProps) {
  const [scenario, setScenario] = useState<string>('collect_head');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [isSending, setIsSending] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const isNightScenario = scenario === 'turn_off_head';

  const masterName = initialContext?.masterName;
  const ritualName = initialContext?.ritualName;

  // автофокус на имени при открытии
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  // закрытие по Esc
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSending) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSending, onClose]);

  // сброс при закрытии
  useEffect(() => {
    if (!isOpen) {
      setScenario('collect_head');
      setDate('');
      setTime('');
      setName('');
      setPhone('');
      setComment('');
      setErrors({});
      setIsSending(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSending) {
      onClose();
    }
  };

  const validate = () => {
    const nextErrors: { name?: string; phone?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Минимум 2 символа';
    }

    const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    if (!phoneRegex.test(phone.trim())) {
      nextErrors.phone = 'Неверный формат телефона';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    try {
      const payload = {
        scenario,
        date,
        time,
        masterName,
        ritualName,
        name,
        phone,
        comment,
      };

      // 1. Отправляем заявку в свой бэкенд (можно обернуть в try/catch отдельно)
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/booking-intents/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          },
        );
      } catch (err) {
        console.error('Failed to send booking intent', err);
        // даже если бэкенд недоступен, всё равно даём открыть виджет
      }

      // 2. Открываем виджет YCLIENTS с контекстом
      console.log('Booking payload:', payload);
      openYclients(payload);
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  const commentPlaceholder =
    ritualName
      ? `Например: «хочу именно ритуал “${ritualName}”», «важно уложиться к началу встречи», «нужен поздний слот после 20:00».`
      : 'Например: «освежить стрижку», «собрать образ с бородой», «нужен поздний слот после 20:00».';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(43,31,26,0.85)] backdrop-blur-md px-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="booking-modal-panel modal-content p-6 md:p-7 relative">
        {/* Крестик */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--text-muted)] hover:text-[var(--text-dark)] text-xl leading-none"
          aria-label="Закрыть окно записи"
          disabled={isSending}
        >
          ×
        </button>

        <div className="booking-modal-body">
          {/* Заголовок */}
          <div className="mb-3">
            <p className="label-small text-[var(--text-muted)] mb-2">
              запись в клуб
            </p>
            <h2
              id="booking-modal-title"
              className="booking-modal-title text-2xl md:text-[26px] font-semibold leading-snug mb-2 max-w-xs"
            >
              Оставьте заявку — затем откроется онлайн‑запись
            </h2>

            {masterName && (
              <p className="text-xs text-[var(--text-muted)]">
                Предпочитаемый мастер:{' '}
                <span className="font-medium text-[var(--text-dark-strong)]">
                  {masterName}
                </span>
              </p>
            )}

            {ritualName && (
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Вы выбрали ритуал:{' '}
                <span className="font-medium text-[var(--text-dark-strong)]">
                  {ritualName}
                </span>
              </p>
            )}
          </div>

          {/* Выбор формата ритуала */}
          <div className="space-y-2 mb-3">
            <p className="booking-modal-label">Формат вечера</p>
            <select
              className="booking-input appearance-none cursor-pointer"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              aria-label="Выберите формат вечера"
            >
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>

            {isNightScenario && (
              <p className="text-[11px] text-[var(--text-muted)]">
                Ритуал «Выключить голову» — ночной формат для гостей с историей
                5+ визитов. Администратор проверит ваши посещения и предложит
                ночной слот или альтернативу.
              </p>
            )}
          </div>

          {/* Форма */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Контакты */}
            <div className="space-y-3">
              <div>
                <p className="booking-modal-label mb-1">Как к вам обращаться</p>
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  className={`booking-input ${
                    errors.name ? 'error' : ''
                  }`}
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="error-message">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <p className="booking-modal-label mb-1">Телефон</p>
                <input
                  type="tel"
                  name="phone"
                  className={`booking-input ${
                    errors.phone ? 'error' : ''
                  }`}
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }
                  }}
                  required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="error-message">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Дата / время (желательное) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="booking-modal-label mb-1">
                  Желаемая дата визита
                </p>
                <input
                  type="date"
                  className="booking-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <p className="booking-modal-label mb-1">Желаемое время</p>
                <input
                  type="time"
                  className="booking-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  min="10:00"
                  max="22:00"
                />
                <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                  Принимаем гостей с 10:00 до 22:00. Точное время вы выберете в
                  онлайн‑записи.
                </p>
              </div>
            </div>

            {/* Комментарий */}
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="booking-modal-label">
                  Кратко о задаче (необязательно)
                </p>
                <span
                  className="tooltip"
                  data-tooltip="Например: освежить стрижку, собрать образ с бородой, нужен поздний слот после 20:00"
                >
                  ℹ️
                </span>
              </div>
              <textarea
                className="booking-textarea"
                placeholder={commentPlaceholder}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="booking-modal-submit"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <span className="spinner-small mr-2" />
                    отправляем…
                  </>
                ) : (
                  'продолжить к онлайн‑записи'
                )}
              </button>
            </div>
          </form>

          <p className="booking-modal-footnote mt-2">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            Сначала заявка попадёт администратору клуба, после чего откроется
            окно онлайн‑записи YCLIENTS, где вы зафиксируете точное время
            визита.
          </p>
        </div>
      </div>
    </div>
  );
}
