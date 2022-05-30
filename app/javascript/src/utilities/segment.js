export function trackEvent(name, payload) {
  if (!window.analytics || window.__ADMIN) return;

  window.analytics.track(name, payload);
}

export function resetAnalytics() {
  if (!window.analytics) return;

  window.analytics.reset();
}
