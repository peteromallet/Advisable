import { fireEvent, cleanup, within } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import { mockQuery, mockMutation } from "../../testHelpers/apolloMocks";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_APPLICATION from "./fetchApplication";
import UPDATE_APPLICATION from "./updateApplication";
import SEND_PROPOSAL from "./sendProposal";
import GET_TASK from "../../graphql/queries/taskDetails";
import { UPDATE_TASK } from "../../components/TaskDrawer/MarkAsTrial";

jest.mock("nanoid/generate");
afterEach(cleanup);

test("Rate step continues to the project type step", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
    route: "/applications/rec123/proposal",
    graphQLMocks: [
      mockQuery(VIEWER, {}, { viewer: specialist }),
      mockQuery(GET_APPLICATION, { id: "rec123" }, { application }),
      mockMutation(
        UPDATE_APPLICATION,
        { id: "rec123", rate: 75 },
        {
          updateApplication: {
            __typename: "UpdateApplicationPayload",
            application: {
              ...application,
              rate: "75",
            },
            errors: null,
          },
        }
      ),
    ],
  });

  await app.findByText('Proposal for "Testing" with Test Inc');
  const rate = app.getByLabelText("Hourly Rate");
  fireEvent.change(rate, { target: { value: "75" } });
  let button = app.getByLabelText("Continue");
  fireEvent.click(button);
  const description = await app.findByText("How would you like to work", {
    exact: false,
  });
  expect(description).toBeInTheDocument();
});

test("Project type step continues to the tasks step for Fixed working type", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    projectType: null,
    monthlyLimit: null,
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
    route: "/applications/rec123/proposal/type",
    graphQLMocks: [
      mockQuery(VIEWER, {}, { viewer: specialist }),
      mockQuery(GET_APPLICATION, { id: "rec123" }, { application }),
      mockMutation(
        UPDATE_APPLICATION,
        { id: "rec123", projectType: "Fixed", monthlyLimit: null },
        {
          updateApplication: {
            __typename: "UpdateApplicationPayload",
            application: {
              ...application,
              projectType: "Fixed",
              monthlyLimit: null,
            },
            errors: null,
          },
        }
      ),
    ],
  });

  await app.findByText('Proposal for "Testing" with Test Inc');
  const option = await app.getByText("projectTypes.Fixed.label");
  fireEvent.click(option);
  const accept = app.getByText("I agree", { exact: false });
  fireEvent.click(accept);
  const cont = app.getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await app.findByText("Project Tasks");
  expect(el).toBeInTheDocument();
});

test("Project type step continues to the billing cycle for Flexible working type", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    projectType: null,
    monthlyLimit: null,
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
    route: "/applications/rec123/proposal/type",
    graphQLMocks: [
      mockQuery(VIEWER, {}, { viewer: specialist }),
      mockQuery(GET_APPLICATION, { id: "rec123" }, { application }),
      mockMutation(
        UPDATE_APPLICATION,
        { id: "rec123", projectType: "Flexible", monthlyLimit: 155 },
        {
          updateApplication: {
            __typename: "UpdateApplicationPayload",
            application: {
              ...application,
              projectType: "Flexible",
              monthlyLimit: 155,
            },
            errors: null,
          },
        }
      ),
    ],
  });

  await app.findByText('Proposal for "Testing" with Test Inc');
  const option = app.getByText("projectTypes.Flexible.label");
  fireEvent.click(option);
  const limit = app.getByLabelText(
    "Set suggested monthly hour cap (to 200-hour max)"
  );
  fireEvent.change(limit, { target: { value: "155" } });
  const accept = app.getByText("I agree", { exact: false });
  fireEvent.click(accept);
  const cont = app.getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await app.findByText("Please note that we only bill the client", {
    exact: false,
  });
  expect(el).toBeInTheDocument();
});

test("Freelancer can set billing cycle", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    projectType: "Flexible",
    monthlyLimit: 155,
    billingCycle: null,
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
    route: "/applications/rec123/proposal/billing_cycle",
    graphQLMocks: [
      mockQuery(VIEWER, {}, { viewer: specialist }),
      mockQuery(GET_APPLICATION, { id: "rec123" }, { application }),
      mockMutation(
        UPDATE_APPLICATION,
        {
          id: "rec123",
          billingCycle: "Monthly",
        },
        {
          updateApplication: {
            __typename: "UpdateApplicationPayload",
            application: {
              ...application,
              billing_cycle: "Monthly",
            },
            errors: null,
          },
        }
      ),
    ],
  });

  await app.findByText("Please note that we only bill the client", {
    exact: false,
  });
  const option = app.getByText("Monthly - Last Friday of every month");
  fireEvent.click(option);
  const accept = app.getByText("I accept", { exact: false });
  fireEvent.click(accept);
  const cont = app.getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await app.findByText("Include a short message");
  expect(el).toBeInTheDocument();
});

test("Freelancer can send the proposal", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    projectType: "Flexible",
    monthlyLimit: 155,
    billingCycle: "Monthly",
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
    route: "/applications/rec123/proposal/send",
    graphQLMocks: [
      mockQuery(VIEWER, {}, { viewer: specialist }),
      mockQuery(GET_APPLICATION, { id: "rec123" }, { application }),
      mockMutation(
        SEND_PROPOSAL,
        {
          application: "rec123",
          proposalComment: "This is a message",
        },
        {
          sendProposal: {
            __typename: "SendProposalPayload",
            application: {
              ...application,
              proposalComment: "This is a message",
            },
            errors: null,
          },
        }
      ),
    ],
  });

  const message = await app.findByLabelText("Include a short message");
  fireEvent.change(message, { target: { value: "This is a message" } });
  const cont = app.getByLabelText("Send Proposal");
  fireEvent.click(cont);
  const header = await app.findByText("Your proposal has been sent!");
  expect(header).toBeInTheDocument();
});

test("Freelancer can mark a task as a trial task", async () => {
  const specialist = generateTypes.specialist();
  const task = generateTypes.task({
    id: "task_1234",
    trial: false,
  });
  const application = generateTypes.application({
    id: "rec1324",
    airtableId: "rec1234",
    tasks: [task],
    trialTask: null,
    trialProgram: true,
    specialist,
    project: generateTypes.project({
      user: generateTypes.user(),
    }),
  });

  const API_MOCKS = [
    mockQuery(VIEWER, {}, { viewer: specialist }),
    mockQuery(GET_APPLICATION, { id: "rec1234" }, { application }),
    mockQuery(
      GET_TASK,
      { id: "task_1234" },
      {
        task: { ...task, application },
      }
    ),
    mockMutation(
      UPDATE_TASK,
      { id: "task_1234", trial: true },
      {
        updateTask: {
          __typename: "UpdateTaskPayload",
          task: {
            ...task,
            trial: true,
            application: {
              ...application,
              trialTask: task,
            },
          },
        },
      }
    ),
  ];

  const { findByText, findByLabelText } = renderApp({
    route: "/applications/rec1234/proposal/tasks/task_1234",
    graphQLMocks: API_MOCKS,
  });

  const markAsTrial = await findByLabelText("Set as trial task");
  fireEvent.click(markAsTrial);
  const notice = await findByText(
    "This task has been offered as a guaranteed trial"
  );
  expect(notice).toBeInTheDocument();
});

test("Freelancer can toggle the task trial via the task menu", async () => {
  const specialist = generateTypes.specialist();
  const task = generateTypes.task({
    id: "task_1234",
    trial: false,
  });
  const application = generateTypes.application({
    id: "rec1324",
    airtableId: "rec1234",
    tasks: [task],
    trialTask: null,
    trialProgram: true,
    specialist,
    project: generateTypes.project({
      user: generateTypes.user(),
    }),
  });

  const API_MOCKS = [
    mockQuery(VIEWER, {}, { viewer: specialist }),
    mockQuery(GET_APPLICATION, { id: "rec1234" }, { application }),
    mockQuery(
      GET_TASK,
      { id: "task_1234" },
      {
        task: { ...task, application },
      }
    ),
    mockMutation(
      UPDATE_TASK,
      { id: "task_1234", trial: true },
      {
        updateTask: {
          __typename: "UpdateTaskPayload",
          task: {
            ...task,
            trial: true,
            application: {
              ...application,
              trialTask: task,
            },
          },
        },
      }
    ),
  ];

  const { findByText, findByLabelText } = renderApp({
    route: "/applications/rec1234/proposal/tasks/task_1234",
    graphQLMocks: API_MOCKS,
  });

  const openMenu = await findByLabelText("Open task actions menu");
  fireEvent.click(openMenu);
  const menu = await findByLabelText("Task actions");
  const toggle = within(menu).getByText("actions.markTaskAsTrial");
  fireEvent.click(toggle);
  const notice = await findByText(
    "This task has been offered as a guaranteed trial"
  );
  expect(notice).toBeInTheDocument();
});
