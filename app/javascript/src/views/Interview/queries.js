import { gql, useQuery, useMutation } from "@apollo/client";

const interviewFields = gql`
  fragment InterviewFields on Interview {
    id
    status
    startsAt
    timeZone
    conversation {
      id
    }
    specialist {
      id
      firstName
      lastName
      avatar
      location
    }
    accounts {
      id
      firstName
    }
    user {
      id
      firstName
    }
  }
`;

export const GET_INTERVIEW = gql`
  ${interviewFields}

  query getInterview($id: ID!) {
    interview(id: $id) {
      ...InterviewFields
    }
  }
`;

export function useInterview(opts = {}) {
  return useQuery(GET_INTERVIEW, opts);
}

export const RESCHEDULE_INTERVIEW = gql`
  ${interviewFields}

  mutation rescheduleInterview($input: RescheduleInterviewInput!) {
    rescheduleInterview(input: $input) {
      interview {
        ...InterviewFields
      }
    }
  }
`;

export function useRescheduleInterview() {
  return useMutation(RESCHEDULE_INTERVIEW);
}
