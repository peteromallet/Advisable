import renderApp from "../../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import FETCH_TASK from "../../../graphql/queries/taskDetails";

jest.setTimeout(10000);

test("User can view an active task", async () => {
  let user = generateTypes.user();
  let task = generateTypes.task({ name: "This is a test task" });
  let project = generateTypes.project({ user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });

  let application = generateTypes.application({
    project,
    specialist,
    airtableId: "rec1234",
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

  const app = renderApp({
    route: "/manage/rec1234",
    graphQLMocks,
  });

  const taskName = await app.findByText(task.name);
  fireEvent.click(taskName);
  const nameInput = await app.findByPlaceholderText("Add a task name...");

  expect(nameInput).toBeInTheDocument();
});
