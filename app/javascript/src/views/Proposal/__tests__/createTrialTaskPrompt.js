import { fireEvent } from "@testing-library/react";
import { renderRoute, mockData } from "test-utils";
import VIEWER from "../../../graphql/queries/getViewer.graphql";
import GET_APPLICATION from "../fetchApplication";
import GET_TASK from "../../../graphql/queries/taskDetails";
import { UPDATE_TASK } from "../../../components/TaskDrawer/MarkAsTrial";

test("Freelancer can mark a task as a trial task", async () => {
  const specialist = mockData.specialist();
  const task = mockData.task({
    id: "task_1234",
    trial: false,
  });
  const application = mockData.application({
    id: "rec1234",
    tasks: [task],
    trialTask: null,
    trialProgram: true,
    specialist,
    project: mockData.project({
      user: mockData.user(),
    }),
  });

  const API_MOCKS = [
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
        query: GET_APPLICATION,
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
          id: "task_1234",
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
        query: UPDATE_TASK,
        variables: {
          input: {
            id: "task_1234",
            trial: true,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
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
        },
      },
    },
  ];

  const { findByText, findByLabelText } = renderRoute({
    route: "/applications/rec1234/proposal/tasks/task_1234",
    graphQLMocks: API_MOCKS,
  });

  const markAsTrial = await findByLabelText("Set as trial task");
  fireEvent.click(markAsTrial);
  const notice = await findByText(
    "This task has been offered as a guaranteed trial",
  );
  expect(notice).toBeInTheDocument();
});
