import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on User {
        id
        email
        airtableId
        firstName
        lastName
        confirmed
        companyName
        country {
          id
          name
        }
      }
      ... on Specialist {
        id
        email
        airtableId
        firstName
        lastName
        confirmed
      }
    }
  }
`;
