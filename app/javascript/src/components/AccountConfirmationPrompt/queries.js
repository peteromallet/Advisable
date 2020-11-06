import { gql } from "@apollo/client";

export const RESEND_CONFIRMATION_EMAIL = gql`
  mutation ResendConfirmationEmail {
    resendConfirmationEmail(input: {}) {
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
