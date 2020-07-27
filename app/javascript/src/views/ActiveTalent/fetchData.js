import gql from "graphql-tag";

export default gql`
  {
    viewer {
      ... on User {
        id
        applications(status: ["Working", "Stopped Working"]) {
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
          }
          specialist {
            id
            name
            image {
              url
            }
          }
        }
      }
    }
  }
`;
