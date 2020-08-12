import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      status
    }
  }
`;

export const GET_MATCHES = gql`
  query getMatches($id: ID!) {
    project(id: $id) {
      id
      matches: applications(status: ["Applied"]) {
        id
        rate
        introduction
        availability
        specialist {
          id
          name
          firstName
          avatar
          location
        }
      }
    }
  }
`;
