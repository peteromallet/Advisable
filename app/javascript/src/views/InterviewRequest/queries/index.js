import { useMutation, useQuery } from "@apollo/client";
import REQUEST_CALL from "./requestCall.gql";
import AVAILABILITY from "./availability.gql";
import FETCH_INTERVIEW from "./fetchInterview.gql";
import SCHEDULE_INTERVIEW from "./scheduleInterview.gql";
import REQUEST_MORE_TIMES from "./requestMoreInterviewTimes.gql";
import UPDATE_AVAILABILITY from "./updateAvailability.gql";
import DECLINE_INTERVIEW from "./declineInterview.gql";

export function useAvailability() {
  return useQuery(AVAILABILITY);
}

export function useRequestCall() {
  return useMutation(REQUEST_CALL);
}

export function useUpdateAvailability() {
  return useMutation(UPDATE_AVAILABILITY);
}

export function useFetchInterview(id) {
  return useQuery(FETCH_INTERVIEW, {
    variables: { id },
  });
}

export function useScheduleInterview() {
  return useMutation(SCHEDULE_INTERVIEW);
}

export function useDeclineInterview() {
  return useMutation(DECLINE_INTERVIEW);
}

export function useRequestMoreTimes() {
  return useMutation(REQUEST_MORE_TIMES);
}
