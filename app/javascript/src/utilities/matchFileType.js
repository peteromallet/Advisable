export default function matchFileType(files, accept) {
  const isMatch = files.every(({ name }) => {
    const type = name.split(".").pop();
    return accept.includes(type);
  });
  return isMatch;
}
