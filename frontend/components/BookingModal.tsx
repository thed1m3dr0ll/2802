// components/BookingModal.tsx
import { type ReactNode } from 'react'

type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
  masterName?: string
}

export default function BookingModal({ isOpen, onClose, masterName }: BookingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative">
        {/* Крестик */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--color-muted)] hover:text-[var(--color-dark)] text-xl leading-none"
          aria-label="Закрыть окно записи"
        >
          ×
        </button>

        <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)] mb-2">
          запись в клуб
        </p>
        <h2 className="text-xl font-semibold mb-3 text-[var(--color-dark)]">
          Оставьте заявку, администратор свяжется с вами.
        </h2>

        {masterName && (
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Предпочитаемый мастер:{' '}
            <span className="font-medium text-[var(--color-dark)]">{masterName}</span>
          </p>
        )}

        <form className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">
              Как к вам обращаться
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-strong)] focus:ring-1 focus:ring-[var(--color-accent-strong)]"
              placeholder="Имя"
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">
              Телефон
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-strong)] focus:ring-1 focus:ring-[var(--color-accent-strong)]"
              placeholder="+7 ..."
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--color-muted)] mb-1">
              Комментарий (необязательно)
            </label>
            <textarea
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent-strong)] focus:ring-1 focus:ring-[var(--color-accent-strong)] min-h-[80px]"
              placeholder="Удобное время, пожелания по образу или мастеру"
            />
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary text-sm py-3 mt-2"
          >
            Отправить заявку
          </button>
        </form>

        <p className="mt-3 text-[10px] text-[var(--color-muted)]">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Сейчас форма
          отправляет данные только администратору клуба.
        </p>
      </div>
    </div>
  )
}
