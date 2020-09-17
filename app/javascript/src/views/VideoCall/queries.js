import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";

const GET_VIDEO_CALL = gql`
  query videoCall($id: ID!) {
    videoCall(id: $id) {
      id
      name
      accessToken
    }
  }
`;

export function useVideoCall() {
  const { id } = useParams();
  return useQuery(GET_VIDEO_CALL, { variables: { id } });
}
