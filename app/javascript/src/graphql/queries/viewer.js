import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on User {
        id
        email
        name
        airtableId
        firstName
        lastName
        confirmed
        createdAt
        companyName
        country {
          id
          name
        }
      }
      ... on Specialist {
        id
        email
        name
        createdAt
        airtableId
        firstName
        lastName
        confirmed
      }
    }
  }
`;
