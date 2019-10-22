import { sortBy } from "lodash";

// We want to keep the ordering that the API gives us so we first create three
// pricing tiers based on the hourlyRate and then filter out the originally
// sorted results based on these tiers.
const groupByPriceRange = results => {
  const n = Math.floor(results.length / 3);
  const sorted = sortBy(results, "hourlyRate");
  const a = sorted.slice(0, n).map(s => s.id);
  const b = sorted.slice(n, n + n).map(s => s.id);
  const c = sorted.slice(n + n, sorted.length).map(s => s.id);

  return [
    results.filter(s => a.indexOf(s.id) > -1),
    results.filter(s => b.indexOf(s.id) > -1),
    results.filter(s => c.indexOf(s.id) > -1),
  ];
};

export default groupByPriceRange;
