import { gql } from "@apollo/client";

export const LOGOUT = gql`
  mutation logout($input: LogoutInput!) {
    logout(input: $input) {
      success
    }
  }
`;
