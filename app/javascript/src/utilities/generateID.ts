import generate from "nanoid/generate";
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default prefix => {
  const id = generate(CHARS, 15);
  return `${prefix}_${id}`
}