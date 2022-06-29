import { useMutation, useQuery } from "@apollo/client";
import AVAILABILITY from "./availability.gql";
import CREATE_CONVERSATION from "./createConversation.gql";
import UPDATE_AVAILABILITY from "./updateAvailability.gql";
import REQUEST_CALL from "./requestCall.gql";
import CREATE_CLIENT_ACCOUNT from "./createClientAccount.gql";
import CREATE_FREELANCER_ACCOUNT from "./createFreelancerAccount.gql";

export function useAvailability() {
  return useQuery(AVAILABILITY);
}

export function useUpdateAvailability() {
  return useMutation(UPDATE_AVAILABILITY);
}

export function useCreateConversation() {
  return useMutation(CREATE_CONVERSATION);
}

export function useRequestCall() {
  return useMutation(REQUEST_CALL);
}

export function useCreateClientAccount() {
  return useMutation(CREATE_CLIENT_ACCOUNT);
}

export function useCreateFreelancerAcccount() {
  return useMutation(CREATE_FREELANCER_ACCOUNT);
}
