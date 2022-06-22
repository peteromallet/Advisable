export const PAYABLE_STATUSES = ["pending", "approved"];

export function shouldShowPastDue(pr) {
  return pr.pastDue && PAYABLE_STATUSES.includes(pr.status);
}
