import { gql } from "@apollo/client";

export default gql`
  mutation updateTaskEstimate($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        estimate
        estimateType
        flexibleEstimate
        stage # changing the estimate can change the stage
      }
    }
  }
`;
