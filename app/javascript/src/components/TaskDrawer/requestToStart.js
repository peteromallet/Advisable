import { gql } from "@apollo/client";

export default gql`
  mutation requestToStart($input: RequestToStartInput!) {
    requestToStart(input: $input) {
      task {
        id
        stage
      }
      errors {
        code
      }
    }
  }
`;
