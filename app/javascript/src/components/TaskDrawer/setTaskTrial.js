import { gql } from "@apollo/client";

export default gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        trial
        application {
          id
          trialTask {
            id
            stage
          }
        }
      }
    }
  }
`;
