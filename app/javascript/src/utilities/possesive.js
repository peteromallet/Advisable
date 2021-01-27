export default function possessive(string) {
  if (string == "") {
    return string;
  }
  var lastChar = string.slice(-1);
  var endOfWord = lastChar.toLowerCase() == "s" ? "’" : `’s`;
  return `${string}${endOfWord}`;
}
