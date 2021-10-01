import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";
import SCHEMA_INTROSPECTION from "./introspectionQuery.graphql";
import { useResources } from "../resources";

export const SchemaContext = createContext();

export function useSchema() {
  return useContext(SchemaContext);
}

export default function SchemaIntrospection({ children }) {
  const resources = useResources();
  const { data, loading, error } = useQuery(SCHEMA_INTROSPECTION);

  // TODO: Remove resources from schema context value. I have included it for
  // now as it's expected in a lot of places.
  const value = useMemo(
    () => ({ schema: data?.__schema, resources }),
    [data, resources],
  );

  if (error) {
    return <>Failed to load schema</>;
  }

  if (loading) {
    return <>Loading schema...</>;
  }

  return (
    <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>
  );
}
