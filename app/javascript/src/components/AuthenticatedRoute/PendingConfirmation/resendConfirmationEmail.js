import gql from "graphql-tag";

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
