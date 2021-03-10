import { gql } from "@apollo/client";

export default gql`
  query application($id: ID!) {
    application(id: $id) {
      id
      invoiceRate
      status
      availability
      monthlyLimit
      projectType
      interview {
        id
        status
      }
      project {
        id
        primarySkill {
          id
          name
        }
        user {
          id
          firstName
          companyName
        }
      }
    }
  }
`;
