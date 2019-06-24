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
        talkSignature
        completedTutorials
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
        talkSignature
        completedTutorials
        image {
          url
        }
      }
    }
  }
`;
