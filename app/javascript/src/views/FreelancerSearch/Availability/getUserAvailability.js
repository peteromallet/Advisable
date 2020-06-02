import gql from "graphql-tag";

export default gql`
  query getUserAvailability {
    viewer {
      ... on User {
        id
        timeZone
        availability
        interviews {
          id
          startsAt
          specialist {
            id
            firstName
          }
        }
      }
    }
  }
`;
