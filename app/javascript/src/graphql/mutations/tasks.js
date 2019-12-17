import gql from "graphql-tag";
import taskDetailFields from "../fragments/taskDetailFields";

// Mutation to create a task
export const createTask = gql`
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

// The update mutations are separated out so that only what is changed will be
// updated in the cache. This prevents strange race conditions. e.g If the user
// edits the name of a task and then immediately edits the description of a task
// one of those responses has the possibility of overriding the other inside of
// the client side cache.
export const updateTaskName = gql`
  mutation updateTaskName($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        name
        stage # changing the name can cause the stage to update
        estimate # changing the name can cause the estimate to be removed
        flexibleEstimate
      }
      errors {
        code
      }
    }
  }
`;

export const updateTaskDueDate = gql`
  mutation updateTaskDueDate($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        dueDate
        stage # changing the due date can cause the stage to change
        estimate # changing the due date can cause the estimate to be removed
        flexibleEstimate
      }
      errors {
        code
      }
    }
  }
`;

export const updateTaskEstimate = gql`
  mutation updateTaskEstimate($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        estimate
        pricingType
        flexibleEstimate
        stage # changing the estimate can change the stage
      }
      errors {
        code
      }
    }
  }
`;

export const updateTaskDescription = gql`
  mutation updateTaskDescription($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        description
        stage # changing the description can change the stage
        estimate # changing the description can change the estimate
        flexibleEstimate
      }
      errors {
        code
      }
    }
  }
`;

// Delete a task
export const deleteTask = gql`
  mutation deleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      task {
        id
      }
      errors {
        code
      }
    }
  }
`;
