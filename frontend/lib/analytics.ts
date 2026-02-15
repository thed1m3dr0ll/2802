// lib/analytics.ts

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

const METRIKA_ID = 12345678; // заглушка, потом подставишь реальный ID

function ym(...args: any[]) {
  if (typeof window === "undefined" || typeof window.ym !== "function") return;
  window.ym(METRIKA_ID, ...args);
}

export function trackBookClick(location: string) {
  ym("reachGoal", "book_click", { location });
}

export function trackPhoneClick(location: string) {
  ym("reachGoal", "phone_click", { location });
}

export function trackBookingSuccess() {
  ym("reachGoal", "booking_success");
}
