import { useQuery } from "@apollo/client";
import SEARCH from "./search.gql";

export function useSearch(term) {
  return useQuery(SEARCH, {
    notifyOnNetworkStatusChange: true,
    variables: {
      term,
    },
  });
}
