import gql from "graphql-tag";

export default gql`
  mutation UpdateAvailability($input: UpdateAvailabilityInput!) {
    updateAvailability(input: $input) {
      user {
        id
        availability
      }
    }
  }
`;
