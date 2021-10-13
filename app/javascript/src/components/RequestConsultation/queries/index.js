import { useMutation, useQuery } from "@apollo/client";
import AVAILABILITY from "./availability.gql";
import UPDATE_AVAILABILITY from "./updateAvailability.gql";
import REQUEST_CONSULTATION from "./requestConsultation.gql";

export function useAvailability() {
  return useQuery(AVAILABILITY);
}

export function useUpdateAvailability() {
  return useMutation(UPDATE_AVAILABILITY);
}

export function useRequestConsultation() {
  return useMutation(REQUEST_CONSULTATION);
}
