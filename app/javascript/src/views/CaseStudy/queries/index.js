import { useQuery } from "@apollo/client";
import CASE_STUDY from "./getCaseStudy.gql";

export function useCaseStudy(opts) {
  return useQuery(CASE_STUDY, opts);
}
