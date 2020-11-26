import { gql, useQuery } from "@apollo/client";

export const GET_TEAM_MEMBERS = gql`
  query getTeamMembers {
    viewer {
      ... on User {
        id
        company {
          id
          users {
            id
            name
            email
            isTeamManager
          }
        }
      }
    }
  }
`;

export function useTeamMembers(opts = {}) {
  return useQuery(GET_TEAM_MEMBERS, opts);
}
