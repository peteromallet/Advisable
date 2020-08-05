import { gql } from "@apollo/client";

export default gql`
  mutation ResendConfirmationEmail {
    resendConfirmationEmail {
      user {
        id
      }
      errors {
        code
      }
    }
  }
`;
