import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GET_PROFILE_DATA from "./getProfileData.gql";
import CASE_STUDY from "./getCaseStudy.gql";

export function useCaseStudy(id) {
  return useQuery(CASE_STUDY, {
    variables: {
      id,
    },
  });
}

export const useProfileData = () => {
  const params = useParams();
  const response = useQuery(GET_PROFILE_DATA, {
    variables: {
      id: params.id,
    },
  });
  return response;
};
