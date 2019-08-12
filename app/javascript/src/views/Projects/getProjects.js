import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on User {
        id
        projects {
          id
          airtableId
          primarySkill
          status
          description
          applicationCount
        }
      }
    }
  }
`;
