import { useMutation } from "@apollo/client";
import POST_COLLABORATION_REQUEST from "./postCollaborationRequest.gql";

export function usePostCollaborationRequest() {
  return useMutation(POST_COLLABORATION_REQUEST);
}
