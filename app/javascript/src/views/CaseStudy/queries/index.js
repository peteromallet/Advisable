import { useQuery } from "@apollo/client";
import CASE_STUDY from "./getCaseStudy.gql";

export function useCaseStudy(id) {
  return useQuery(CASE_STUDY, {
    variables: {
      id,
    },
  });
}
