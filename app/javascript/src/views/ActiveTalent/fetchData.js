import { gql } from "@apollo/client";

export default gql`
  query ActiveTalent {
    viewer {
      ... on User {
        id
        applications(status: ["Working", "Stopped Working"]) {
          id
          status
          tasks {
            id
          }
          project {
            id
            primarySkill {
              id
              name
            }
          }
          specialist {
            id
            name
            avatar
          }
        }
      }
    }
  }
`;
