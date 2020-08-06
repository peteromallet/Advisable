import { gql } from "@apollo/client";

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
