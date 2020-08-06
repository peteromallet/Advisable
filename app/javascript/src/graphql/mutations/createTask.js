import { gql } from "@apollo/client";
import taskDetailFields from "../fragments/taskDetailFields";

export default gql`
  ${taskDetailFields}

  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      task {
        ...TaskDetailFields
      }
      errors {
        code
      }
    }
  }
`;
