import React, { createContext, useEffect, useContext } from "react";
import { relayStylePagination } from "@apollo/client/utilities";
import { useQuery, useApolloClient } from "@apollo/client";
import RESOURCES from "./resources.graphql";

export const ResourcesContext = createContext();

export function useResources() {
  return useContext(ResourcesContext);
}

function buildTypePolicies(data) {
  const typePolicies = {
    Query: {
      fields: {},
    },
  };

  data.resources.forEach((resource) => {
    typePolicies.Query.fields[resource.queryNameCollection] =
      relayStylePagination();
  });

  return typePolicies;
}

export default function Resources({ children }) {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(RESOURCES);

  // when the reosurces info has been fetched we need to build the type policies
  // for each resource.
  useEffect(() => {
    if (data) {
      client.cache.policies.addTypePolicies(buildTypePolicies(data));
    }
  }, [data, client.cache.policies]);

  if (error) return <>Failed to load resources</>;
  if (loading) return <>loading resources...</>;

  return (
    <ResourcesContext.Provider value={data.resources}>
      {children}
    </ResourcesContext.Provider>
  );
}
