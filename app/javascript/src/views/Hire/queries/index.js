import { useQuery, useMutation } from "@apollo/client";
import CANDIDATES from "./candidates.gql";
import REJECT from "./rejectApplication.gql";

export function useCandidates() {
  return useQuery(CANDIDATES);
}

export function useRejectApplication() {
  return useMutation(REJECT, {
    update(cache, { data }) {
      const existing = cache.readQuery({ query: CANDIDATES });
      cache.writeQuery({
        query: CANDIDATES,
        data: {
          currentCompany: {
            ...existing.currentCompany,
            candidates: {
              ...existing.currentCompany.candidates,
              nodes: existing.currentCompany.candidates.nodes.filter((n) => {
                return n.id !== data.rejectApplication.application.id;
              }),
            },
          },
        },
      });
    },
  });
}
