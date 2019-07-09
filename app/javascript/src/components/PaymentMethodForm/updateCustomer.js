import gql from "graphql-tag";

export default gql`
  mutation updateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        id
        name
        email
      }
    }
  }
`;
