import generateID from "../utilities/generateID";
import {
  user as screenUser,
  renderRoute,
  fireEvent,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from "../testHelpers/test-utils";
import VIEWER from "../graphql/queries/getViewer.graphql";
import { mockData, mockViewer, mockQuery, mockMutation } from "test-utils";
import GET_ACTIVE_APPLICATION from "../views/Booking/getActiveApplication";
import {
  createTask as CREATE_TASK,
  updateTaskName as UPDATE_TASK_NAME,
} from "../graphql/mutations/tasks";
import SET_PROJECT_TYPE from "../views/Booking/ProjectTypeModal/setProjectType";

jest.mock("../utilities/generateID");

test("Renders the manage view for a specialist", async () => {
  let viewer = mockData.user();
  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      mockViewer(viewer),
      mockQuery(
        GET_ACTIVE_APPLICATION,
        { id: "rec1234" },
        {
          viewer,
          application: mockData.application({
            id: "rec1234",
            projectType: "Flexible",
            tasks: [mockData.task({ name: "This is a test task" })],
            project: mockData.project({
              user: mockData.user(),
            }),
            specialist: mockData.specialist({
              account: mockData.account(),
            }),
          }),
        },
      ),
    ],
  });

  await app.findByText(/test task/i);
});

test("Renders a tutorial video if it's the first time viewing", async () => {
  const viewer = mockData.user();
  const { findByText } = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      mockViewer(viewer),
      {
        request: {
          query: GET_ACTIVE_APPLICATION,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer,
            application: mockData.application({
              id: "rec1234",
              projectType: "Flexible",
              tasks: [mockData.task({ name: "This is a test task" })],
              project: mockData.project({
                user: mockData.user(),
              }),
              specialist: mockData.specialist({
                account: mockData.account(),
              }),
            }),
          },
        },
      },
    ],
  });

  await findByText(/flexible_projects.heading/i);
});

test("Does not render a tutorial video if the user has completed it", async () => {
  const viewer = mockData.user({
    completedTutorials: ["flexible_projects"],
  });

  const { findByText, queryByText } = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer,
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
            viewer,
            application: mockData.application({
              id: "rec1234",
              projectType: "Flexible",
              tasks: [mockData.task({ name: "This is a test task" })],
              project: mockData.project({
                user: mockData.user(),
              }),
              specialist: mockData.specialist({
                account: mockData.account(),
              }),
            }),
          },
        },
      },
    ],
  });

  await findByText("Active Projects"); // wait for page to load
  expect(queryByText("tutorials.flexible_projects.heading")).toBeNull();
});

test("The client can change the project type", async () => {
  const viewer = mockData.user({
    completedTutorials: ["fixed_projects"],
  });

  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      mockViewer(viewer),
      mockQuery(
        GET_ACTIVE_APPLICATION,
        {
          id: "rec1234",
        },
        {
          viewer,
          application: mockData.application({
            id: "rec1234",
            projectType: "Fixed",
            tasks: [mockData.task({ name: "This is a test task" })],
            project: mockData.project({
              isOwner: true,
              user: mockData.user(),
            }),
            specialist: mockData.specialist({
              account: mockData.account(),
            }),
          }),
        },
      ),
      mockMutation(
        SET_PROJECT_TYPE,
        {
          application: "rec1234",
          projectType: "Flexible",
          monthlyLimit: 100,
        },
        {
          setTypeForProject: {
            __typename: "SetTypeForProjectPayload",
            application: mockData.application({
              id: "rec1234",
              projectType: "Flexible",
              monthlyLimit: 100,
            }),
          },
        },
      ),
    ],
  });

  const button = await app.findByLabelText("Edit project type");
  fireEvent.click(button);
  const flexible = app.getByTestId("flexible");
  fireEvent.click(flexible);
  const limit = app.getByLabelText("Set a monthly hour cap (to 200-hour max)");
  fireEvent.change(limit, { target: { value: "100" } });
  let checkbox = app.getByLabelText(
    "I accept that I will be charged 50% of the monthly limit immediately",
  );
  fireEvent.click(checkbox);
  checkbox = app.getByLabelText(
    "I consent to being charged for all hours I approve within the monthly limit I have specified, until I stop working with Test",
  );
  fireEvent.click(checkbox);
  const submit = app.getByLabelText("Update Project Type");
  fireEvent.click(submit);
  await waitForElementToBeRemoved(checkbox);
  const projectType = app.getByTestId("projectType");
  await waitFor(() => expect(projectType).toHaveTextContent("Flexible"));
});

test("The client can add a task", async () => {
  generateID.mockReturnValue("tas_abc");

  const user = mockData.user();
  const project = mockData.project({ user });
  const specialist = mockData.specialist({
    account: mockData.account(),
  });
  const application = mockData.application({
    id: "rec1234",
    projectType: "Flexible",
    project,
    specialist,
  });

  let viewer = mockData.user();

  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer,
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
            viewer,
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
              task: mockData.task({
                id: "tas_abc",
                application,
              }),
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
              task: mockData.task({
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

  const createButton = await app.findByText("Add a project");
  fireEvent.click(createButton);
  const name = app.getByTestId("nameField");
  screenUser.type(name, "This is a new task");
  const saving = await screen.findByText(/saving.../i);
  await waitForElementToBeRemoved(saving);
  const close = app.getByLabelText("Close Drawer");
  fireEvent.click(close);
  await app.findByText("This is a new task");
});
