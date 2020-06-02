import gql from "graphql-tag";

export const GET_DATA = gql`
  query data($id: ID!) {
    viewer {
      ... on User {
        id
        interviews {
          id
          startsAt
          specialist {
            id
            firstName
          }
        }
      }
    }
    interview(id: $id) {
      id
      timeZone
      user {
        id
        airtableId
        availability
      }
      application {
        id
        specialist {
          id
          name
        }
      }
    }
  }
`;

export const RESEND_INTERVIEW_REQUEST = gql`
  mutation ResendInterviewRequest($input: ResendInterviewRequestInput!) {
    resendInterviewRequest(input: $input) {
      interview {
        user {
          id
          availability
        }
      }
    }
  }
`;
