import { gql } from "@apollo/client";

export default gql`
  mutation updateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        id
        airtableId
        rate
        projectType
        monthlyLimit
      }
      errors {
        code
      }
    }
  }
`;
