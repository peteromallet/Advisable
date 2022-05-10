export function trackEvent(name, payload) {
  if (!window.analytics) return;

  window.analytics.track(name, payload);
}

export function resetAnalytics() {
  if (!window.analytics) return;

  window.analytics.reset();
}
