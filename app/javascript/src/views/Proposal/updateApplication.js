import { gql } from "@apollo/client";

export default gql`
  mutation updateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        id
        invoiceRate
        projectType
        monthlyLimit
      }
    }
  }
`;
