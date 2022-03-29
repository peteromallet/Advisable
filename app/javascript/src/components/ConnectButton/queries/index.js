import { useMutation, useQuery } from "@apollo/client";
import AVAILABILITY from "./availability.gql";
import UPDATE_AVAILABILITY from "./updateAvailability.gql";
import CREATE_CONVERSATION from "./createConversation.gql";
import REQUEST_INTERVIEW from "./requestInterview.gql";
import CREATE_CLIENT_ACCOUNT from "./createClientAccount.gql";
import CREATE_FREELANCER_ACCOUNT from "./createFreelancerAccount.gql";

export function useAvailability() {
  return useQuery(AVAILABILITY);
}

export function useUpdateAvailability() {
  return useMutation(UPDATE_AVAILABILITY);
}

export function useRequestInterview() {
  return useMutation(REQUEST_INTERVIEW);
}

export function useCreateClientAccount() {
  return useMutation(CREATE_CLIENT_ACCOUNT);
}

export function useCreateFreelancerAcccount() {
  return useMutation(CREATE_FREELANCER_ACCOUNT);
}
export function useCreateConversation() {
  return useMutation(CREATE_CONVERSATION);
}
