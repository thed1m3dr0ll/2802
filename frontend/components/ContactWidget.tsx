// components/ContactWidget.tsx
'use client';

import { useState } from 'react';
import { Message01Icon, AiPhone01Icon, TelegramIcon } from 'hugeicons-react';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-40">
      <button
        type="button"
        className="
          flex h-11 w-11 items-center justify-center
          rounded-full bg-[var(--accent-red)] text-white
          shadow-lg shadow-black/40
          hover:bg-[var(--accent-red-hover)]
          transition
        "
        aria-label="Связаться с администратором"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Message01Icon size={20} />
      </button>

      <div
        className={`
          absolute bottom-14 right-0
          w-48 rounded-xl bg-[#05060a] border border-white/10
          shadow-lg shadow-black/40
          transition
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}
        `}
      >
        <a
          href="https://t.me/barberRomanChernov"
          className="flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:bg-white/5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon size={18} />
          <span>Telegram</span>
        </a>

        <a
          href="tel:+79877553000"
          className="flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:bg-white/5"
        >
          <AiPhone01Icon size={18} />
          <span>Позвонить</span>
        </a>
      </div>
    </div>
  );
}
