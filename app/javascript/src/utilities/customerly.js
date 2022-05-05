// Tracks a customerly event and calls update to trigger any surverys.
export function customerlyEvent(name) {
  if (!window.customerly) return;

  window.customerly.event(name);
  window.customerly.update({ timestamp: new Date().getTime() });
}

export function updateCustomerlyAttribute(key, value) {
  if (!window.customerly) return;

  window.customerly.attribute(key, value);
  window.customerly.update({ timestamp: new Date().getTime() });
}
