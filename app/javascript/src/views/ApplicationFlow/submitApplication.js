import gql from "graphql-tag";

export default gql`
  mutation SubmitApplication($input: SubmitApplicationInput!) {
    submitApplication(input: $input) {
      application {
        id
        status
      }
      errors
    }
  }
`;
