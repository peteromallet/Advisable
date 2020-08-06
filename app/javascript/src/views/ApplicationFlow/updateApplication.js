import { gql } from "@apollo/client";
import applicationFields from "./applicationFields";

export default gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        ...ApplicationFields
      }
      errors {
        code
      }
    }
  }
  ${applicationFields}
`;
