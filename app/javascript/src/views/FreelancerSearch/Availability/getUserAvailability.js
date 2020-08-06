import { gql } from "@apollo/client";

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
