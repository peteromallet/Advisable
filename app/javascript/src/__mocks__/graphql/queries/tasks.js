import { merge, uniqueId } from "lodash";
import FETCH_TASK from "../../../graphql/queries/taskDetails";

export const getTaskDetails = config => {
  return merge(
    {
      request: {
        query: FETCH_TASK,
      },
      result: {
        data: {
          task: {
            __typename: "Task",
            id: uniqueId("task"),
            name: "This is a test task",
            stage: "Not Assigned",
            dueDate: null,
            estimate: null,
            description: null,
            createdAt: new Date().toISOString(),
            repeat: null,
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
        },
      },
    },
    config
  );
};
