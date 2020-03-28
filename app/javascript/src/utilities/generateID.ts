import { customAlphabet } from "nanoid";
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default (prefix) => {
  const id = customAlphabet(CHARS, 15);
  return `${prefix}_${id}`;
};
