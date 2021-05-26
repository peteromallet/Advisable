import uniqueId from "lodash/uniqueId";
import { useState, useCallback } from "react";

export default function useFilters(initialFilters = []) {
  const [filters, setFilters] = useState(initialFilters);

  const addFilter = useCallback((filter) => {
    setFilters((existing) => [
      ...existing,
      {
        id: uniqueId("filter"),
        ...filter,
      },
    ]);
  }, []);

  const removeFilter = useCallback((id) => {
    setFilters((existing) => existing.filter((f) => f.id !== id));
  }, []);

  const updateFilter = useCallback((id, values) => {
    setFilters((existing) => {
      return existing.map((filter) => {
        if (filter.id !== id) return filter;
        return {
          ...filter,
          ...values,
        };
      });
    });
  }, []);

  return {
    filters,
    addFilter,
    removeFilter,
    updateFilter,
  };
}
