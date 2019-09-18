import gql from "graphql-tag";

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
