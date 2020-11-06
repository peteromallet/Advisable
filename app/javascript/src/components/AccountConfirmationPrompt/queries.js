import { gql } from "@apollo/client";

export const RESEND_CONFIRMATION_EMAIL = gql`
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
