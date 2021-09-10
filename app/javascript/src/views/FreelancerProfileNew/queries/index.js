import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import GET_PROFILE_DATA from "./getProfileData.gql";

export const useProfileData = () => {
  const params = useParams();
  const response = useQuery(GET_PROFILE_DATA, {
    variables: {
      id: params.specialist_id,
    },
  });
  return response;
};
