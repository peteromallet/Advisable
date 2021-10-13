import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GET_CASE_STUDY from "./getCaseStudy.gql";
import CREATE_CASE_STUDY_REVIEW from "./createCaseStudyReview.gql";

export const useCaseStudy = () => {
  const params = useParams();
  const { id, article_id } = params;
  return useQuery(GET_CASE_STUDY, { variables: { id, article_id } });
};

export const useCreateReview = () => {
  return useMutation(CREATE_CASE_STUDY_REVIEW);
};
