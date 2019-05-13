import renderApp from "../testHelpers/renderApp";
import generate from "nanoid/generate";
import { fireEvent, cleanup } from "react-testing-library";
import viewer from "../__mocks__/graphql/queries/viewer";
import {
  createTask,
  updateTaskName,
} from "../__mocks__/graphql/mutations/tasks";
import { getActiveApplication } from "../__mocks__/graphql/queries/applications";

jest.mock("nanoid/generate");
afterEach(cleanup);
jest.setTimeout(10000);

test("Renders the manage view for a specialist", async () => {
  const { findByText } = renderApp({
    route: "/manage/rec1234",
    graphQLMocks: [
      viewer.asClient(),
      getActiveApplication({
        request: {
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: {
              airtableId: "rec1234",
              tasks: [
                {
                  name: "This is a test task",
                },
              ],
            },
          },
        },
      }),
    ],
  });

  expect(await findByText("This is a test task")).toBeInTheDocument();
});

test("The client can add a task", async () => {
  generate.mockReturnValue("abc");
  const { findByText, findByLabelText, getByTestId } = renderApp({
    route: "/manage/rec1234",
    graphQLMocks: [
      viewer.asClient(),
      getActiveApplication({
        request: {
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: {
              airtableId: "rec1234",
            },
          },
        },
      }),
      createTask({
        request: {
          variables: {
            input: {
              application: "rec1234",
              id: "tas_abc",
            },
          },
        },
      }),
      updateTaskName({
        request: {
          variables: {
            input: {
              id: "tas_abc",
              name: "This is a new task",
            },
          },
        },
        result: {
          data: {
            updateTask: {
              task: {
                id: "tas_abc",
                name: "This is a new task",
              },
            },
          },
        },
      }),
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
