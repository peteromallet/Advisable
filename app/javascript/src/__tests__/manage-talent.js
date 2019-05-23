import generate from "nanoid/generate";
import { fireEvent, cleanup } from "react-testing-library";
import VIEWER from "../graphql/queries/viewer";
import renderApp from "../testHelpers/renderApp";
import generateType from "../__mocks__/graphqlFields";
import { getActiveApplication as GET_ACTIVE_APPLICATION } from "../graphql/queries/applications";
import {
  createTask as CREATE_TASK,
  updateTaskName as UPDATE_TASK_NAME,
} from "../graphql/mutations/tasks";

jest.mock("nanoid/generate");
afterEach(cleanup);
jest.setTimeout(10000);

test("Renders the manage view for a specialist", async () => {
  const { findByText } = renderApp({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: generateType.user(),
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
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              tasks: [generateType.task({ name: "This is a test task" })],
              project: generateType.project({
                user: generateType.user(),
              }),
              specialist: generateType.specialist(),
            }),
          },
        },
      },
    ],
  });

  expect(await findByText("This is a test task")).toBeInTheDocument();
});

test("The client can add a task", async () => {
  generate.mockReturnValue("abc");

  const user = generateType.user();
  const project = generateType.project({ user });
  const specialist = generateType.specialist();
  const application = generateType.application({
    id: "rec1324",
    airtableId: "rec1234",
    project,
    specialist,
  });

  const { findByText, findByLabelText, getByTestId } = renderApp({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: generateType.user(),
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
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              project: generateType.project({
                user: generateType.user(),
              }),
              specialist: generateType.specialist(),
            }),
          },
        },
      },
      {
        request: {
          query: CREATE_TASK,
          variables: {
            input: {
              application: "rec1234",
              id: "tas_abc",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            createTask: {
              __typename: "CreateTaskPayload",
              task: generateType.task({
                id: "tas_abc",
                application,
              }),
              errors: null,
            },
          },
        },
      },
      {
        request: {
          query: UPDATE_TASK_NAME,
          variables: {
            input: {
              id: "tas_abc",
              name: "This is a new task",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateTask: {
              __typename: "UpdateTaskPayload",
              task: generateType.task({
                id: "tas_abc",
                name: "This is a new task",
              }),
              errors: null,
            },
          },
        },
      },
    ],
  });

  const createButton = await findByText("Add a task");
  fireEvent.click(createButton);
  const name = getByTestId("nameField");
  fireEvent.change(name, { target: { value: "This is a new task" } });
  fireEvent.blur(name);
  const close = await findByLabelText("Close Drawer");
  fireEvent.click(close);
  expect(await findByText("This is a new task")).toBeInTheDocument();
});
