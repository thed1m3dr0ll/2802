// components/ContactWidget.tsx
"use client";

import { useState, type MouseEventHandler } from "react";
import { Message01Icon, AiPhone01Icon, TelegramIcon } from "hugeicons-react";
import { trackPhoneClick, trackBookClick } from "../lib/analytics";

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

  const handleToggle: MouseEventHandler<HTMLButtonElement> = () => {
    setOpen((v) => !v);
  };

  const handleTelegramClick: MouseEventHandler<HTMLAnchorElement> = () => {
    trackBookClick("contact_widget_telegram");
    setOpen(false);
  };

  const handlePhoneClick: MouseEventHandler<HTMLAnchorElement> = () => {
    trackPhoneClick("contact_widget");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 md:bottom-6 md:right-6">
      <button
        type="button"
        className="
          flex h-11 w-11 items-center justify-center
          rounded-full bg-[var(--accent-red)] text-white
          shadow-lg shadow-black/40
          hover:bg-[var(--accent-red-dark)]
          transition
        "
        aria-label="Связаться с администратором"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <Message01Icon size={20} />
      </button>

      <div
        className={`absolute bottom-14 right-0 w-52 rounded-2xl border border-white/10 bg-[#05060a] p-1 shadow-lg shadow-black/40 transition ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <p className="px-3 pt-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
          быстрый контакт
        </p>

        <a
          href="https://t.me/barberRomanChernov"
          className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] text-white/90 transition hover:bg-white/5"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTelegramClick}
        >
          <TelegramIcon size={18} />
          <span>Написать в Telegram</span>
        </a>

        <a
          href="tel:+79877553000"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] text-white/90 transition hover:bg-white/5"
          onClick={handlePhoneClick}
        >
          <AiPhone01Icon size={18} />
          <span>Позвонить в клуб</span>
        </a>

        <p className="px-3 pb-2 pt-1 text-[10px] leading-snug text-white/40">
          Администратор ответит в рабочее время клуба или перезвонит, если вы
          оставите пропущенный.
        </p>
      </div>
    </div>
  );
}
