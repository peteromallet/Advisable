import { sortBy } from "lodash";

const groupByPriceRange = results => {
  const n = Math.floor(results.length / 3);
  const sorted = sortBy(results, "hourlyRate");

  return [
    sorted.slice(0, n),
    sorted.slice(n, n + n),
    sorted.slice(n + n, sorted.length),
  ];
};

export default groupByPriceRange;
