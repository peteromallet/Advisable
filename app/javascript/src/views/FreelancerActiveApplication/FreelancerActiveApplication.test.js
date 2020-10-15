import { renderRoute } from "test-utils";
import generateID from "../../utilities/generateID";
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import CREATE_TASK from "../../graphql/mutations/createTask";
import GET_TASK from "../../graphql/queries/taskDetails";
import FETCH_APPLICATION from "./fetchApplication";
import SUBMIT_TASK from "../../components/TaskDrawer/submitTask";
import {
  updateTaskName as UPDATE_TASK_NAME,
  updateTaskDescription as UPDATE_TASK_DESCRIPTION,
} from "../../graphql/mutations/tasks";
import UPDATE_ESTIMATE from "../../components/TaskDrawer/QuoteInput/updateEstimate";

jest.mock("../../utilities/generateID");

test("Freelancer can create a task", async () => {
  generateID.mockReturnValue("tas_abc");

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
    getByText,
    findByText,
    getByLabelText,
    getByPlaceholderText,
    findByTestId,
  } = renderRoute({
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
          query: UPDATE_ESTIMATE,
          variables: {
            input: {
              id: "tas_abc",
              estimateType: "Hourly",
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

  const createButton = await findByText("Add a project");
  fireEvent.click(createButton);
  const name = await findByTestId("nameField");
  fireEvent.change(name, { target: { value: "Task name here" } });
  let saving = await screen.findByText(/saving.../i);
  await waitForElementToBeRemoved(saving);
  const estimate = getByText("Add estimate", { exact: false });
  fireEvent.click(estimate);
  const from = getByPlaceholderText("10");
  fireEvent.change(from, { target: { value: 10 } });
  const flexible = screen.getByText("Flexible hours");
  fireEvent.click(flexible);
  const to = await screen.findByPlaceholderText("20");
  fireEvent.change(to, { target: { value: 20 } });
  const save = getByLabelText("Save Quote");
  fireEvent.click(save);
  const description = getByPlaceholderText("Add a description...");
  fireEvent.change(description, { target: { value: "Description here" } });
  fireEvent.blur(description);
  saving = await screen.findByText(/saving.../i);
  await waitForElementToBeRemoved(saving);
  const close = getByLabelText("Close Drawer");
  fireEvent.click(close);
  const quote = await findByText("10 - 20 hours");
  expect(quote).toBeInTheDocument();
});

test("Freelancer can mark a task as complete", async () => {
  const user = generateTypes.user();
  const project = generateTypes.project({ user });
  const specialist = generateTypes.specialist();

  const task = generateTypes.task({
    id: "tas_1234",
    stage: "Working",
    estimate: 10,
    flexibleEstimate: 20,
    estimateType: "Hourly",
  });

  const application = generateTypes.application({
    id: "rec1324",
    airtableId: "rec1234",
    project,
    specialist,
    tasks: [task],
    rate: 50,
  });
  task.application = application;

  const { findByText, findByLabelText, getByLabelText } = renderRoute({
    route: "/clients/rec1234/tasks/tas_1234",
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
          query: GET_TASK,
          variables: {
            id: "tas_1234",
          },
        },
        result: {
          data: {
            task: {
              ...task,
              application,
            },
          },
        },
      },
      {
        request: {
          query: SUBMIT_TASK,
          variables: {
            input: {
              task: "tas_1234",
              finalCost: 90000,
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            submitTask: {
              __typename: "SubmitTaskPayload",
              errors: null,
              task: {
                ...task,
                stage: "Submitted",
                finalCost: 90000,
              },
            },
          },
        },
      },
    ],
  });

  const markAsComplete = await findByLabelText("Mark as complete");
  fireEvent.click(markAsComplete);
  const continueButton = getByLabelText("Continue");
  fireEvent.click(continueButton);
  const slider = getByLabelText("Hours Worked");
  fireEvent.change(slider, { target: { value: 18 } });
  const completeButton = getByLabelText("Complete");
  fireEvent.click(completeButton);
  const notice = await findByText(
    "tasks.stageDescriptions.specialist.submitted",
  );
  expect(notice).toBeInTheDocument();
});
