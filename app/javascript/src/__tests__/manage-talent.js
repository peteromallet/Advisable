import renderApp from "../testHelpers/renderApp";
import generate from "nanoid/generate";
import { fireEvent, cleanup } from "react-testing-library";
import viewer from "../__mocks__/graphql/queries/viewer";
import createTask from "../__mocks__/graphql/mutations/createTask";
import { getActiveApplication } from "../__mocks__/graphql/queries/applications";

jest.mock("nanoid/generate");
afterEach(cleanup);

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
  const { findByText, findByLabelText, findByPlaceholderText } = renderApp({
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
    ],
  });

  const createButton = await findByText("Add a task");
  fireEvent.click(createButton);
  // const name = await findByPlaceholderText("Add a task name...");
  // fireEvent.change(name, { target: { value: "A new task" } });
  const close = await findByLabelText("Close Drawer");
  fireEvent.click(close);
  await findByText("Untitled");
});
