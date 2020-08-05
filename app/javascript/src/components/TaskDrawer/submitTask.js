import { gql } from "@apollo/client";

export default gql`
  mutation submitTask($input: SubmitTaskInput!) {
    submitTask(input: $input) {
      task {
        id
        stage
        finalCost
      }
      errors {
        code
      }
    }
  }
`;
