import { useMutation, useQuery } from "@apollo/client";
import REVIEW_META from "./reviewMeta.gql";
import REVIEW_SPECIALIST from "./reviewSpecialist.gql";

export function useReviewMeta(id) {
  return useQuery(REVIEW_META, { variables: { id } });
}

export function useReviewSpecialist() {
  return useMutation(REVIEW_SPECIALIST);
}
