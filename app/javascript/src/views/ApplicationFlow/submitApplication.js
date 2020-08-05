import { gql } from "@apollo/client";

export default gql`
  mutation SubmitApplication($input: SubmitApplicationInput!) {
    submitApplication(input: $input) {
      application {
        id
        status
      }
      errors {
        code
      }
    }
  }
`;
