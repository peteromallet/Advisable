import { useMutation, useQuery } from "@apollo/client";
import ACCOUNT_DETAILS from "./accountDetails.gql";
import UPDATE_ACCOUNT from "./updateAccount.gql";

export function useAccountDetails() {
  return useQuery(ACCOUNT_DETAILS);
}

export function useUpdateAccount() {
  return useMutation(UPDATE_ACCOUNT);
}
