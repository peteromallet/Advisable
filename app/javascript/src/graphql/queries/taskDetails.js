import { gql } from "@apollo/client";
import taskDetailFields from "../fragments/taskDetailFields";

export default gql`
  ${taskDetailFields}

  query task($id: ID!) {
    task(id: $id) {
      ...TaskDetailFields
    }
  }
`;
