import { gql, useQuery, useMutation } from "@apollo/client";

const interviewFields = gql`
  fragment InterviewFields on Interview {
    id
    status
    startsAt
    specialist {
      id
      firstName
      lastName
      avatar
      location
    }
    user {
      id
      firstName
      availability
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

export const REQUEST_INTERVEW_RESCHEDULE = gql`
  ${interviewFields}

  mutation requestInterviewReschedule(
    $input: RequestInterviewRescheduleInput!
  ) {
    requestInterviewReschedule(input: $input) {
      interview {
        ...InterviewFields
      }
    }
  }
`;

export function useRequestInterviewReschedule() {
  return useMutation(REQUEST_INTERVEW_RESCHEDULE);
}
