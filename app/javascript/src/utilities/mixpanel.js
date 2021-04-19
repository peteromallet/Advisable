export function track(name, data = {}) {
  if (!window.mixpanel) return;
  window.mixpanel.track(name, data);
}
