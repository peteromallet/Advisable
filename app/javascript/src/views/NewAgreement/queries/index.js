import { useMutation } from "@apollo/client";
import CREATE_AGREEMENT from "./createAgreement.gql";

export function useCreateAgreement() {
  return useMutation(CREATE_AGREEMENT);
}
