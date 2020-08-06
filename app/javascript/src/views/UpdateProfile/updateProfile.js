import { gql } from "@apollo/client";

export default gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        id
        bio
        city
        remote
        country {
          id
          name
        }
        skills {
          name
        }
      }
    }
  }
`;
