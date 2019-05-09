import { merge, uniqueId } from "lodash";
import { default as CREATE_TASK } from "../../../graphql/mutations/createTask";

// Testing mocks
export default config =>
  merge(
    {
      request: {
        query: CREATE_TASK,
      },
      result: {
        data: {
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
    config
  );
