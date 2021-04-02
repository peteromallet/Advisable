const OFFSET = 127397;

export default function isoToEmoji(iso) {
  const chars = Array.from(iso.toUpperCase()).map(
    (char) => char.charCodeAt(0) + OFFSET,
  );
  return String.fromCodePoint(...chars);
}
