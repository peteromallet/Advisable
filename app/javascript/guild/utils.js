export const lowerDashed = (str) => str.replace(/\s+/g, "-").toLowerCase();

export const getUrlParams = (search) => {
  const query = new URLSearchParams(search);
  return Object.fromEntries(query.entries());
};
