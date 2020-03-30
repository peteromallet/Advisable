import { customAlphabet } from "nanoid";
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(CHARS, 15);

const generateID = (prefix) => {
  const id = nanoid();
  return `${prefix}_${id}`;
};

export default generateID;
