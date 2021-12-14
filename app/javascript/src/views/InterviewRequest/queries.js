import { gql } from "@apollo/client";

export const FETCH_INTERVIEW = gql`
  query interview($id: ID!) {
    interview(id: $id) {
      id
      status
      startsAt
      timeZone
      user {
        id
        companyName
        availability(excludeConflicts: true)
      }
    }
  }
`;

export const SCHEDULE_INTERVIEW = gql`
  mutation scheduleInterview($input: ScheduleInterviewInput!) {
    scheduleInterview(input: $input) {
      interview {
        id
        status
        startsAt
      }
    }
  }
`;

export const REQUEST_MORE_TIMES = gql`
  mutation RequestMoreInterviewTimes($input: RequestMoreInterviewTimesInput!) {
    requestMoreInterviewTimes(input: $input) {
      interview {
        id
        status
      }
    }
  }
`;
