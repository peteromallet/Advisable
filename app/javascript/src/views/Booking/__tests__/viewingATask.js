import { renderRoute, fireEvent, mockData } from "test-utils";
import VIEWER from "../../../graphql/queries/getViewer.graphql";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import FETCH_TASK from "../../../graphql/queries/taskDetails";

test("User can view an active task", async () => {
  let user = mockData.user();
  let task = mockData.task({ name: "This is a test task" });
  let project = mockData.project({ user });
  let specialist = mockData.specialist({ firstName: "Dennis" });

  let application = mockData.application({
    project,
    specialist,
    id: "rec1234",
    projectType: "Flexible",
    monthlyLimit: 50,
    status: "Working",
    tasks: [task],
  });

  const graphQLMocks = [
    {
      request: {
        query: VIEWER,
      },
      result: {
        data: {
          viewer: user,
        },
      },
    },
    {
      request: {
        query: GET_ACTIVE_APPLICATION,
        variables: {
          id: "rec1234",
        },
      },
      result: {
        data: {
          viewer: user,
          application,
        },
      },
    },
    {
      request: {
        query: FETCH_TASK,
        variables: {
          id: task.id,
        },
      },
      result: {
        data: {
          task: {
            ...task,
            application: {
              ...application,
              specialist,
              trialTask: null,
              project: {
                ...project,
                user,
              },
            },
          },
        },
      },
    },
  ];

  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks,
  });

  const taskName = await app.findByText(task.name);
  fireEvent.click(taskName);
  const nameInput = await app.findByPlaceholderText("Add a task name...");
  expect(nameInput).toBeInTheDocument();
});
