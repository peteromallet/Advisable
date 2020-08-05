import { gql } from "@apollo/client";

export default gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      errors {
        code
      }
    }
  }
`;
