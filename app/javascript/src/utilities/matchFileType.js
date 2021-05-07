export default function matchFileType(files, accept) {
  const isMatch = files.every(({ name }) => {
    const type = name.split(".").pop();
    return accept.toLowerCase().includes(type?.toLowerCase());
  });
  return isMatch;
}
