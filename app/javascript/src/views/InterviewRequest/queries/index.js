import { useMutation, useQuery } from "@apollo/client";
import AVAILABILITY from "./availability.gql";
import FETCH_INTERVIEW from "./fetchInterview.gql";
import SCHEDULE_INTERVIEW from "./scheduleInterview.gql";
import REQUEST_MORE_TIMES from "./requestMoreInterviewTimes.gql";

export function useAvailability() {
  return useQuery(AVAILABILITY);
}

export function useFetchInterview(id) {
  return useQuery(FETCH_INTERVIEW, {
    variables: { id },
  });
}

export function useScheduleInterview() {
  return useMutation(SCHEDULE_INTERVIEW);
}

export function useRequestMoreTimes() {
  return useMutation(REQUEST_MORE_TIMES);
}
