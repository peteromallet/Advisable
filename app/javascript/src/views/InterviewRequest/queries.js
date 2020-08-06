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
      application {
        id
        specialist {
          id
          phoneNumber
        }
      }
    }
  }
`;

export const ACCEPT_INTERVIEW_REQUEST = gql`
  mutation AcceptInterviewRequest($input: AcceptInterviewRequestInput!) {
    acceptInterviewRequest(input: $input) {
      interview {
        id
        status
        startsAt
      }
      errors
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
