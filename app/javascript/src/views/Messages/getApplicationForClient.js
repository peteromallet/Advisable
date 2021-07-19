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
      project {
        id
      }
      specialist {
        id
        name
        city
        avatar
        firstName
        linkedin
        country {
          id
          name
        }
      }
    }
  }
`;
