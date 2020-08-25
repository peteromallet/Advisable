import { gql } from "@apollo/client";

export default gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      viewer {
        ... on User {
          id
        }
        ... on Specialist {
          id
        }
      }
    }
  }
`;
