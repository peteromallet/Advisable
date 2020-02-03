import generate from "nanoid/generate";
import renderApp from "../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import mockData from "../../__mocks__/graphqlFields";
import GET_ACTIVE_APPLICATION from "./getActiveApplication";
import CREATE_TASK from "../../graphql/mutations/createTask";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";
import { updateTaskName as UPDATE_TASK_NAME } from "../../graphql/mutations/tasks";

jest.mock("nanoid/generate");
generate.mockReturnValue("abc");

test("Client can create a task", async () => {
  const user = mockData.user();
  const project = mockData.project({ user });
  const specialist = mockData.specialist();

  const application = mockData.application({
    project,
    specialist,
    airtableId: "rec1234",
    projectType: "Fixed",
    status: "Working",
  });

  const graphQLMocks = [
    mockViewer(user),
    mockQuery(
      GET_ACTIVE_APPLICATION,
      { id: "rec1234" },
      { viewer: user, application }
    ),
    mockMutation(
      CREATE_TASK,
      {
        application: "rec1234",
        id: "tas_abc",
      },
      {
        createTask: {
          __typename: "CreateTaskPayload",
          task: mockData.task({
            id: "tas_abc",
            application,
          }),
          errors: null,
        },
      }
    ),
    mockMutation(
      UPDATE_TASK_NAME,
      {
        id: "tas_abc",
        name: "Task name here",
      },
      {
        updateTask: {
          __typename: "UpdateTaskPayload",
          task: mockData.task({
            id: "tas_abc",
            name: "Task name here",
          }),
          errors: null,
        },
      }
    ),
  ];

  const app = renderApp({ route: "/manage/rec1234", graphQLMocks });
  const createTaskBtn = await app.findByLabelText("Add a task");
  fireEvent.click(createTaskBtn);
  const name = await app.findByTestId("nameField");
  expect(name).toBeInTheDocument();
  fireEvent.change(name, { target: { value: "Task name here" } });
});
