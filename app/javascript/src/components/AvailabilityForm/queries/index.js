import { useMutation } from "@apollo/client";
import UPDATE_AVAILABILITY from "./updateAvailability.gql";

export function useUpdateAvailability() {
  return useMutation(UPDATE_AVAILABILITY);
}
