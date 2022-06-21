import { gql } from "@apollo/client";

export const GET_AVAILABILITY = gql`
  query GetAvailability {
    viewer {
      id
      availability
      interviews {
        id
        startsAt
        participants {
          id
          firstName
        }
      }
    }
  }
`;

export const UPDATE_AVAILABILITY = gql`
  mutation UpdateAvailability($input: UpdateAvailabilityInput!) {
    updateAvailability(input: $input) {
      viewer {
        id
        availability
      }
    }
  }
`;
