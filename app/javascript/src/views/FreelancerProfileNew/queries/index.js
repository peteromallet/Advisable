import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GET_PROFILE_DATA from "./getProfileData.gql";
import CASE_STUDY from "./getCaseStudy.gql";
import UPDATE_PROFILE from "./updateProfileMutation.gql";
import SET_COVER_PHOTO from "./setCoverPhoto.gql";

export function useCaseStudy(id) {
  return useQuery(CASE_STUDY, {
    variables: {
      id,
    },
  });
}

export const useProfileData = (props) => {
  const params = useParams();
  const response = useQuery(GET_PROFILE_DATA, {
    variables: {
      id: params.id,
    },
    ...props,
  });
  return response;
};

export const useUpdateProfile = () => {
  const response = useMutation(UPDATE_PROFILE);
  return response;
};

export const useSetCoverPhoto = () => {
  const response = useMutation(SET_COVER_PHOTO);
  return response;
};
