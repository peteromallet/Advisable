import renderApp from "../../testHelpers/renderApp";
import generate from "nanoid/generate";
import { fireEvent, cleanup, wait } from "react-testing-library";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import CREATE_TASK from "../../graphql/mutations/createTask";
import FETCH_APPLICATION from "../../graphql/queries/freelancerActiveApplication";
import { updateTaskName as UPDATE_TASK_NAME } from "../../graphql/mutations/tasks";

jest.mock("nanoid/generate");
afterEach(cleanup);
jest.setTimeout(10000);

test("Freelancer can create a task", async () => {
  generate.mockReturnValue("abc");

  const user = generateTypes.user();
  const project = generateTypes.project({ user });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec1324",
    airtableId: "rec1234",
    project,
    specialist,
  });

  const { findByText, findByTestId, debug } = renderApp({
    route: "/clients/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: specialist,
          },
        },
      },
      {
        request: {
          query: FETCH_APPLICATION,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application,
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
              task: generateTypes.task({
                id: "tas_abc",
                application,
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
  const name = await findByTestId("nameField");
  // fireEvent.change(name, { target: { value: "Task name here" } });
  // fireEvent.blur(name);
  // expect(await findByText("Saving...")).toBeInTheDocument();
});
