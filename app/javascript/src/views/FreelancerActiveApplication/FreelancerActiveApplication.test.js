import renderApp from "../../testHelpers/renderApp";
import generate from "nanoid/generate";
import { fireEvent, cleanup } from "@testing-library/react";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import CREATE_TASK from "../../graphql/mutations/createTask";
import GET_TASK from "../../graphql/queries/taskDetails";
import FETCH_APPLICATION from "./fetchApplication";
import SUBMIT_TASK from "../../components/TaskDrawer/submitTask";
import UPDATE_BILLING_CYCLE from "../../components/BillingCycleSelection/updateBillingCycle";
import {
  updateTaskName as UPDATE_TASK_NAME,
  updateTaskEstimate as UPDATE_TASK_ESTIMATE,
  updateTaskDescription as UPDATE_TASK_DESCRIPTION,
} from "../../graphql/mutations/tasks";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";

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
    getByText,
    findByText,
    getByLabelText,
    getByPlaceholderText,
    findByTestId,
  } = renderApp({
    route: "/clients/rec1234",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(FETCH_APPLICATION, { id: "rec1234" }, { application }),
      mockMutation(
        CREATE_TASK,
        {
          application: "rec1234",
          id: "tas_abc",
        },
        {
          createTask: {
            __typename: "CreateTaskPayload",
            task: generateTypes.task({
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
            task: generateTypes.task({
              id: "tas_abc",
              name: "Task name here",
            }),
            errors: null,
          },
        }
      ),
      mockMutation(
        UPDATE_TASK_ESTIMATE,
        {
          id: "tas_abc",
          estimate: 10,
          flexibleEstimate: 20,
        },
        {
          updateTask: {
            __typename: "UpdateTaskPayload",
            task: generateTypes.task({
              id: "tas_abc",
              estimate: 10,
              flexibleEstimate: 20,
            }),
            errors: null,
          },
        }
      ),
      mockMutation(
        UPDATE_TASK_DESCRIPTION,
        {
          id: "tas_abc",
          description: "Description here",
        },
        {
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
        }
      ),
    ],
  });

  const createButton = await findByText("Add a project");
  fireEvent.click(createButton);
  const name = await findByTestId("nameField");
  fireEvent.change(name, { target: { value: "Task name here" } });
  const estimate = getByText("Add estimate", { exact: false });
  fireEvent.click(estimate);
  const flexible = getByLabelText("Flexible", { exact: false });
  fireEvent.click(flexible);
  const from = getByPlaceholderText("10 Hours");
  fireEvent.change(from, { target: { value: 10 } });
  const to = getByPlaceholderText("20 Hours");
  fireEvent.change(to, { target: { value: 20 } });
  const save = getByLabelText("Save Quote");
  fireEvent.click(save);
  const description = getByPlaceholderText("Add a description...");
  fireEvent.change(description, { target: { value: "Description here" } });
  fireEvent.blur(description);
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
    name: "This is a test task",
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

  const { findByText, findByLabelText, getByLabelText } = renderApp({
    route: "/clients/rec1234",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(FETCH_APPLICATION, { id: "rec1234" }, { application }),
      mockQuery(
        GET_TASK,
        { id: "tas_1234" },
        { task: { ...task, application } }
      ),
      mockMutation(
        SUBMIT_TASK,
        {
          task: "tas_1234",
          finalCost: 90000,
        },
        {
          submitTask: {
            __typename: "SubmitTaskPayload",
            errors: null,
            task: {
              ...task,
              stage: "Submitted",
              finalCost: 90000,
            },
          },
        }
      ),
    ],
  });

  const taskName = await findByText(task.name);
  fireEvent.click(taskName);
  const markAsComplete = await findByLabelText("Mark as complete");
  fireEvent.click(markAsComplete);
  const continueButton = getByLabelText("Continue");
  fireEvent.click(continueButton);
  const slider = getByLabelText("Hours Worked");
  fireEvent.change(slider, { target: { value: 18 } });
  const completeButton = getByLabelText("Complete");
  fireEvent.click(completeButton);
  const notice = await findByText(
    "tasks.stageDescriptions.specialist.submitted"
  );
  expect(notice).toBeInTheDocument();
});

test("Freelancer can change their billing type from weekly to monthly", async () => {
  const user = generateTypes.user();
  const project = generateTypes.project({ user });
  const specialist = generateTypes.specialist();

  const application = generateTypes.application({
    id: "rec1324",
    rate: 50,
    tasks: [],
    airtableId: "rec1234",
    projectType: "Flexible",
    billingCycle: "Weekly",
    project,
    specialist,
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(FETCH_APPLICATION, { id: "rec1234" }, { application }),
    mockMutation(
      UPDATE_BILLING_CYCLE,
      {
        id: "rec123",
        billingCycle: "Monthly",
      },
      {
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          application: {
            ...application,
            billingCycle: "Monthly",
          },
        },
      }
    ),
  ];

  const app = renderApp({
    route: "/clients/rec1234/tasks/tas_1234",
    graphQLMocks,
  });

  const btn = await app.findByLabelText("Change billing cycle");
  fireEvent.click(btn);
  const monthly = app.getByLabelText("Monthly - Last Friday of every month", {
    exact: false,
  });
  fireEvent.click(monthly);
  fireEvent.click(app.getByLabelText("Save Changes"));
});

test("Shows notice if stopped working", async () => {
  const user = generateTypes.user();
  const project = generateTypes.project({ user });
  const specialist = generateTypes.specialist();

  const application = generateTypes.application({
    id: "rec1324",
    rate: 50,
    tasks: [],
    airtableId: "rec1234",
    projectType: "Flexible",
    billingCycle: "Weekly",
    status: "Stopped Working",
    project,
    specialist,
  });

  const graphQLMocks = [
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
  ];

  const app = renderApp({
    route: "/clients/rec1234/tasks/tas_1234",
    graphQLMocks,
  });

  const notice = await app.findByText("You have stopped working with", {
    exact: false,
  });
  expect(notice).toBeInTheDocument();
});

test("Freelancer can view completed tasks", async () => {
  const user = generateTypes.user();
  const project = generateTypes.project({ user });
  const specialist = generateTypes.specialist();

  const task = generateTypes.task({
    id: "tas_1234",
    stage: "Approved",
    name: "A completed task",
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

  const app = renderApp({
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
    ],
  });

  const taskName = await app.findByText("A completed task");
  expect(taskName).not.toBeVisible();
  const tab = app.getByText("Completed Tasks");
  fireEvent.click(tab);
  expect(app.getByText("A completed task")).toBeVisible();
});
