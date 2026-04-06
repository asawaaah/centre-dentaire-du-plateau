declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function gtmEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}
