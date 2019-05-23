import renderApp from "../../testHelpers/renderApp";
import generate from "nanoid/generate";
import wait from "waait";
import { fireEvent, cleanup } from "react-testing-library";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import CREATE_TASK from "../../graphql/mutations/createTask";
import FETCH_APPLICATION from "../../graphql/queries/freelancerActiveApplication";
import {
  updateTaskName as UPDATE_TASK_NAME,
  updateTaskEstimate as UPDATE_TASK_ESTIMATE,
  updateTaskDescription as UPDATE_TASK_DESCRIPTION,
} from "../../graphql/mutations/tasks";

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

  const {
    findByText,
    getByLabelText,
    getByPlaceholderText,
    getByText,
    findByTestId,
    debug,
  } = renderApp({
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
      {
        request: {
          query: UPDATE_TASK_NAME,
          variables: {
            input: {
              id: "tas_abc",
              name: "Task name here",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateTask: {
              __typename: "UpdateTaskPayload",
              task: generateTypes.task({
                id: "tas_abc",
                name: "Task name here",
              }),
              errors: null,
            },
          },
        },
      },
      {
        request: {
          query: UPDATE_TASK_ESTIMATE,
          variables: {
            input: {
              id: "tas_abc",
              estimate: 10,
              flexibleEstimate: 20,
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateTask: {
              __typename: "UpdateTaskPayload",
              task: generateTypes.task({
                id: "tas_abc",
                estimate: 10,
                flexibleEstimate: 20,
              }),
              errors: null,
            },
          },
        },
      },
      {
        request: {
          query: UPDATE_TASK_DESCRIPTION,
          variables: {
            input: {
              id: "tas_abc",
              description: "Description here",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateTask: {
              __typename: "UpdateTaskPayload",
              task: generateTypes.task({
                id: "tas_abc",
                name: "Task name here",
                description: "Description here",
                estimate: 10,
                flexibleEstimate: 20,
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
  fireEvent.change(name, { target: { value: "Task name here" } });
  fireEvent.blur(name);
  const estimate = getByLabelText("Estimate");
  fireEvent.click(estimate);
  const flexible = getByLabelText("Flexible");
  fireEvent.click(flexible);
  const from = getByLabelText("Hours Estimate");
  fireEvent.change(from, { target: { value: 10 } });
  const to = getByLabelText("Flexible Hours Estimate");
  fireEvent.change(to, { target: { value: 20 } });
  const save = getByLabelText("Save Estimate");
  fireEvent.click(save);
  const description = getByPlaceholderText("Add a description...");
  fireEvent.change(description, { target: { value: "Description here" } });
  fireEvent.blur(description);
  const close = getByLabelText("Close Drawer");
  fireEvent.click(close);
  const quote = await findByText("10-20 hours");
  expect(quote).toBeInTheDocument();
});
