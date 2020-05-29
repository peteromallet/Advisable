import gql from "graphql-tag";

export const GET_AVAILABILITY = gql`
  query application($id: ID!) {
    application(id: $id) {
      id
      project {
        id
        user {
          id
          availability
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
    }
  }
`;

export const REQUEST_INTRODUCTION = gql`
  mutation RequestIntroduction($input: RequestIntroductionInput!) {
    requestIntroduction(input: $input) {
      interview {
        id
        status
        application {
          id
          status
        }
      }
      errors
    }
  }
`;
