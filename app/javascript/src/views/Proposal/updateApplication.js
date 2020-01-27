import gql from "graphql-tag";

export default gql`
  mutation updateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        id
        airtableId
        rate
        projectType
        monthlyLimit
        billingCycle
      }
      errors {
        code
      }
    }
  }
`;
