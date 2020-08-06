import { gql } from "@apollo/client";

export default gql`
  mutation UpdateAvailability($input: UpdateAvailabilityInput!) {
    updateAvailability(input: $input) {
      user {
        id
        timeZone
        availability
      }
    }
  }
`;
