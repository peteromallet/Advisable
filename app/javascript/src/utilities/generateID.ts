import { customAlphabet } from "nanoid";
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const alphanumeric = (length = 15) => {
  const nanoid = customAlphabet(CHARS, length);
  return nanoid();
};

const generateID = (prefix) => {
  const id = alphanumeric();
  return `${prefix}_${id}`;
};

export default generateID;
