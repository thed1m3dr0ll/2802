// components/ContactWidget.tsx
'use client';

import { useState } from 'react';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="contact-widget">
      <button
        type="button"
        className="widget-toggle"
        aria-label="Связаться с администратором"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        💬
      </button>
      <div className={`widget-menu ${open ? 'open' : ''}`}>
        <a
          href="https://wa.me/79877553000"
          className="widget-item whatsapp"
          target="_blank"
          rel="noopener"
        >
          WhatsApp
        </a>
        <a
          href="https://t.me/gentlemennn"
          className="widget-item telegram"
          target="_blank"
          rel="noopener"
        >
          Telegram
        </a>
        <a href="tel:+79877553000" className="widget-item phone">
          Позвонить
        </a>
      </div>
    </div>
  );
}
