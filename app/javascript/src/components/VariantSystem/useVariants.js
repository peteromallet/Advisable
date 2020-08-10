import React from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { NUM_OF_VARIANTS, CURRENT_VARIANT } from "./index";

function useVariants(numOfVariants) {
  const { cache } = useApolloClient();
  const { data } = useQuery(CURRENT_VARIANT);
  useEffect(() => {
    cache.writeQuery({ query: NUM_OF_VARIANTS, data: { numOfVariants } });
  });

  return data?.variant;
}

export default useVariants;
