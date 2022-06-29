export function updateTraits(traits) {
  if (!window.analytics || window.__ADMIN) return;

  window.analytics.identify(traits);
}

export function trackEvent(name, payload) {
  if (!window.analytics || window.__ADMIN) return;

  window.analytics.track(name, payload);
}

export function resetAnalytics() {
  if (!window.analytics) return;

  window.analytics.reset();
}
