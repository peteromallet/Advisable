import { gql } from "@apollo/client";

export default gql`
  query FreelancerProjects {
    viewer {
      ... on Specialist {
        id
        applications(
          status: ["Working", "Stopped Working"]
          salesStatus: ["Open", "Won"]
        ) {
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
