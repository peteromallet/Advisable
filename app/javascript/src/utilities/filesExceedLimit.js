export default function filesWithinLimit(files, maxSizeInMB) {
  const maxSizeInBytes = maxSizeInMB * 1048576;
  const isExceededSize = files.some(({ size }) => size > maxSizeInBytes);
  return isExceededSize;
}
