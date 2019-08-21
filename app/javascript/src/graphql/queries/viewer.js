import gql from "graphql-tag";

export const viewerFields = gql`
  fragment ViewerFields on ViewerUnion {
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
`;

export default gql`
  ${viewerFields}

  query {
    viewer {
      ...ViewerFields
    }
  }
`;
