export default (count, singular, plural) => {
  if (count === 1) return `1 ${singular}`
  return `${count} ${plural}`
}