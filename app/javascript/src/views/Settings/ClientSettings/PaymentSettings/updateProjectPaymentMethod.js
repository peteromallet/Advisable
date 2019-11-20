import gql from "graphql-tag";

export default gql`
  mutation updateProjectPaymentMethod(
    $input: UpdateProjectPaymentMethodInput!
  ) {
    updateProjectPaymentMethod(input: $input) {
      user {
        id
        projectPaymentMethod
      }
    }
  }
`;
