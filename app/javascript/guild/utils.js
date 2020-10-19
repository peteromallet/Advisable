import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const lowerDashed = (str) => str.replace(/\s+/g, "-").toLowerCase();

export const getUrlParams = (search) => {
  const query = new URLSearchParams(search);
  return Object.fromEntries(query.entries());
};

export const omit = (obj, ...omit) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !omit.includes(key)),
  );

export const relativeDate = (date) => dayjs().from(date, true);
