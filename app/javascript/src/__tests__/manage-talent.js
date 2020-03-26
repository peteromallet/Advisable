import generate from "nanoid/generate";
import wait from "waait";
import { fireEvent } from "@testing-library/react";
import VIEWER from "../graphql/queries/viewer";
import renderApp from "../testHelpers/renderApp";
import generateType from "../__mocks__/graphqlFields";
import GET_ACTIVE_APPLICATION from "../views/Booking/getActiveApplication";
import {
  createTask as CREATE_TASK,
  updateTaskName as UPDATE_TASK_NAME,
} from "../graphql/mutations/tasks";
import SET_PROJECT_TYPE from "../views/Booking/ProjectTypeModal/setProjectType";

jest.mock("nanoid/generate");
jest.setTimeout(10000);

test("Renders the manage view for a specialist", async () => {
  let viewer = generateType.user();
  const { findByText } = renderApp({
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

test("Renders a tutorial video if it's the first time viewing", async () => {
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
            viewer: generateType.user(),
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              projecType: "Fixed",
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

  expect(
    await findByText("tutorials.fixedProjects.heading")
  ).toBeInTheDocument();
});

test("Does not render a tutorial video if the user has completed it", async () => {
  const { findByText, queryByText } = renderApp({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: generateType.user({
              completedTutorials: ["fixedProjects"],
            }),
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
            viewer: generateType.user(),
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              projecType: "Fixed",
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

  await findByText("Active Projects"); // wait for page to load
  expect(queryByText("tutorials.fixedProjects.heading")).toBeNull();
});

test("The client can change the project type", async () => {
  const { findByText, getByText, getByLabelText, getByTestId } = renderApp({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: generateType.user({
              completedTutorials: ["fixedProjects"],
            }),
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
            viewer: generateType.user(),
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              projecType: "Fixed",
              tasks: [generateType.task({ name: "This is a test task" })],
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
          query: SET_PROJECT_TYPE,
          variables: {
            input: {
              application: "rec1234",
              projectType: "Flexible",
              monthlyLimit: 100,
            },
          },
        },
        result: {
          data: {
            setTypeForProject: {
              __typename: "SetTypeForProjectPayload",
              application: generateType.application({
                id: "rec1234",
                airtableId: "rec1234",
                projectType: "Flexible",
                monthlyLimit: 100,
              }),
            },
          },
        },
      },
    ],
  });

  await findByText("Active Projects"); // wait for page to load
  const button = getByLabelText("Edit project type");
  fireEvent.click(button);
  const flexible = getByTestId("flexible");
  fireEvent.click(flexible);
  const limit = getByLabelText("Set a monthly hour cap (to 200-hour max)");
  fireEvent.change(limit, { target: { value: "100" } });
  let checkbox = getByLabelText(
    "I accept that I will be charged 50% of the monthly limit immediately"
  );
  fireEvent.click(checkbox);
  checkbox = getByLabelText(
    "I consent to being charged for all hours I approve within the monthly limit I have specified, until I stop working with Test"
  );
  fireEvent.click(checkbox);
  const submit = getByLabelText("Update Project Type");
  fireEvent.click(submit);
  await wait(0);
  await wait(0);
  expect(getByText("100 hours")).toBeInTheDocument();
  expect(getByTestId("projectType")).toHaveTextContent("Flexible");
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

  let viewer = generateType.user();

  const { findByText, findByLabelText, getByTestId } = renderApp({
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

  const createButton = await findByText("Add a project");
  fireEvent.click(createButton);
  const name = getByTestId("nameField");
  fireEvent.change(name, { target: { value: "This is a new task" } });
  const close = await findByLabelText("Close Drawer");
  fireEvent.click(close);
  expect(await findByText("This is a new task")).toBeInTheDocument();
});
