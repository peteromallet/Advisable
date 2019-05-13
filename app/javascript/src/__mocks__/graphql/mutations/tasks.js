import { merge, uniqueId } from "lodash";
import {
  createTask as CREATE_TASK,
  updateTaskName as UPDATE_TASK_NAME,
} from "../../../graphql/mutations/tasks";

// Testing mocks
export const createTask = config => {
  return merge(
    {
      request: {
        query: CREATE_TASK,
      },
      result: {
        data: {
          __typename: "Mutation",
          createTask: {
            __typename: "CreateTaskPayload",
            task: {
              __typename: "Task",
              id: uniqueId("task"),
              name: null,
              stage: "Not Assigned",
              dueDate: null,
              estimate: null,
              description: null,
              repeat: null,
              createdAt: new Date().toISOString(),
              application: {
                __typename: "Application",
                id: uniqueId("application"),
                rate: "75",
                airtableId: uniqueId("rec"),
                specialist: {
                  __typename: "Specialist",
                  id: uniqueId("specialist"),
                  firstName: "Test",
                },
                project: {
                  __typename: "Project",
                  id: uniqueId("project"),
                  currency: "USD",
                  user: {
                    __typename: "User",
                    id: uniqueId("user"),
                    companyName: "Test Corp",
                  },
                },
              },
            },
            errors: null,
          },
        },
      },
    },
    config
  );
};

export const updateTaskName = config => {
  return merge(
    {
      request: {
        query: UPDATE_TASK_NAME,
      },
      result: {
        data: {
          __typename: "Mutation",
          updateTask: {
            __typename: "UpdateTaskPayload",
            task: {
              __typename: "Task",
              id: uniqueId("task"),
              name: "Updated",
              stage: "Not Assigned",
              estimate: null,
            },
            errors: null,
          },
        },
      },
    },
    config
  );
};
