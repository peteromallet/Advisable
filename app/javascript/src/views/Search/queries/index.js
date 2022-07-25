import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import SEARCH from "./search.gql";

export function useSearch() {
  const location = useLocation();
  const { search } = location?.state?.backgroundLocation || location;
  const term = queryString.parse(search).q;

  return useQuery(SEARCH, {
    notifyOnNetworkStatusChange: true,
    variables: {
      term,
    },
  });
}
