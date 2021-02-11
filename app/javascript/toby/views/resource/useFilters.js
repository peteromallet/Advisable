import { uniqueId } from "lodash-es";
import { useState, useCallback } from "react";

export default function useFilters() {
  const [filters, setFilters] = useState([]);

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

  const updateFilter = useCallback((id, key, value) => {
    setFilters((existing) => {
      return existing.map((filter) => {
        if (filter.id !== id) return filter;
        return {
          ...filter,
          [key]: value,
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
