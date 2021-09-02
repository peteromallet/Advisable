import { useMemo, useState } from "react";

export default function useSort() {
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortBy, setSortBy] = useState("created_at");

  const sortState = useMemo(() => {
    return {
      sortOrder,
      setSortOrder,
      sortBy,
      setSortBy,
    };
  }, [sortOrder, setSortOrder, sortBy, setSortBy]);

  return sortState;
}
