import { useQuery } from "@apollo/client";
import CANDIDATES from "./candidates.gql";

export function useCandidates() {
  return useQuery(CANDIDATES);
}
