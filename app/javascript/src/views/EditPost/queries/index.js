import { useQuery, useMutation } from "@apollo/client";
import GET_POST from "./getPost.gql";
import UPDATE_POST from "./updatePost.gql";

export function usePost(id) {
  return useQuery(GET_POST, {
    variables: { id },
  });
}

export function useUpdatePost() {
  return useMutation(UPDATE_POST);
}
