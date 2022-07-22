import { useMutation } from "@apollo/client";
import SEARCH from "./search.gql";

export function useCreateSearch() {
  return useMutation(SEARCH);
}
