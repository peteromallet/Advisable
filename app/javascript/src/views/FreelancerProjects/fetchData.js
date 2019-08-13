import gql from "graphql-tag";

export default gql`
  {
    viewer {
      ... on Specialist {
        id
        applications(status: ["Working"], salesStatus: ["Open", "Won"]) {
          id
          airtableId
          tasks {
            id
          }
          project {
            id
            primarySkill
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
