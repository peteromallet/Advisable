import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";
import TOBY_QUERY from "./tobyQuery.graphql";

export const TobyContext = createContext();

export function useToby() {
  return useContext(TobyContext);
}

export default function TobyProvider({ children }) {
  const { data, loading, error } = useQuery(TOBY_QUERY);

  const value = useMemo(
    () => ({
      schema: data?.__schema,
      resources: data.resources,
    }),
    [data],
  );

  if (error) {
    return <>Failed to load schema</>;
  }

  if (loading) {
    return <>Loading schema...</>;
  }

  return <TobyContext.Provider value={value}>{children}</TobyContext.Provider>;
}
