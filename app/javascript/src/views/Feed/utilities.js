export function extractResult(result) {
  if (typeof result === "string") {
    return result;
  }

  return result?.context;
}
