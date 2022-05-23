export function forwardClassName(classes, className) {
  if (!className) return classes;
  return `${classes} ${className}`;
}
