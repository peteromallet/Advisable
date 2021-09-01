export default function commaSeparated(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  const firsts = items.slice(0, items.length - 1);
  const last = items[items.length - 1];
  return firsts.join(", ") + " and " + last;
}
