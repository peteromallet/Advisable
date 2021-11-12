import { useMutation } from "@apollo/client";
import POST_COLLABORATION_REQUEST from "./postCollaborationRequest.gql";
import COLLABORATION_REQUESTS from "../../FreelancerDashboard/queries/collaborationRequests.gql";

export function usePostCollaborationRequest() {
  return useMutation(POST_COLLABORATION_REQUEST, {
    update(cache, { data: { postCollaborationRequest } }) {
      const existing = cache.readQuery({ query: COLLABORATION_REQUESTS });
      if (existing) {
        cache.writeQuery({
          query: COLLABORATION_REQUESTS,
          data: {
            collaborationRequests: {
              ...existing.collaborationRequests,
              edges: [
                { node: postCollaborationRequest.post },
                ...existing.collaborationRequests.edges,
              ],
            },
          },
        });
      }
    },
  });
}
