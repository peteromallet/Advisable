import { useMutation, useQuery } from "@apollo/client";
import NEW_AGREEMENT from "./newAgreement.gql";
import CREATE_AGREEMENT from "./createAgreement.gql";

export function useCreateAgreement() {
  return useMutation(CREATE_AGREEMENT);
}

export function useNewAgreement(id) {
  return useQuery(NEW_AGREEMENT, { variables: { id } });
}
