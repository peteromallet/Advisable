import { fireEvent } from "@testing-library/react";
import { renderRoute } from "test-utils";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_APPLICATION from "../fetchApplication";
import GET_TASK from "../../../graphql/queries/taskDetails";
import { UPDATE_TASK } from "../../../components/TaskDrawer/MarkAsTrial";

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
