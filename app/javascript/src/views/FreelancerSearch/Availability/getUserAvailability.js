import gql from "graphql-tag";

export default gql`
  query getUserAvailability {
    viewer {
      ... on User {
        id
        availability
      }
    }
  }
`;
