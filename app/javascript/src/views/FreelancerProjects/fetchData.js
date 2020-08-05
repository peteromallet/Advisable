import { gql } from "@apollo/client";

export default gql`
  {
    viewer {
      ... on Specialist {
        id
        applications(
          status: ["Working", "Stopped Working"]
          salesStatus: ["Open", "Won"]
        ) {
          id
          status
          airtableId
          tasks {
            id
          }
          project {
            id
            primarySkill {
              id
              name
            }
            user {
              id
              companyName
            }
          }
        }
      }
    }
  }
`;
