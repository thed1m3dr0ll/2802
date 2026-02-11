// lib/openYclients.ts
export type YclientsContext = {
  scenario?: string;
  masterName?: string;
  ritualName?: string | null;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  comment?: string;
};

declare global {
  interface Window {
    yWidget?: {
      show: () => void;
      hide: () => void;
    };
  }
}

export function openYclients(context?: YclientsContext) {
  if (typeof window === 'undefined') return;

  if (context) {
    console.log('YCLIENTS context:', context);

    // пример: можно повесить свои кастомные события для аналитики
    // window.dataLayer?.push({ event: 'yclients_open', ...context });
  }

  if (window.yWidget && typeof window.yWidget.show === 'function') {
    window.yWidget.show();
  } else {
    console.warn('yWidget.show() not available on window');
  }
}
