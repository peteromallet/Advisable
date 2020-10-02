export const lowerDashed = (str) => str.replace(/\s+/g, "-").toLowerCase();

export const getUrlParams = (search) => {
  const query = new URLSearchParams(search);
  return Object.fromEntries(query.entries());
};

export const omit = (obj, ...omit) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !omit.includes(key)),
  );
