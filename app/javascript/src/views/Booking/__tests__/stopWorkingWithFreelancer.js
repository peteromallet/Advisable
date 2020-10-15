import { renderRoute } from "test-utils";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import { STOP_WORKING } from "../StopWorkingModal";

test("Client can stop working with specialist", async () => {
  let user = generateTypes.user();
  let project = generateTypes.project({ user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });

  let application = generateTypes.application({
    project,
    specialist,
    status: "Working",
  });

  const { getAllByLabelText, findByText, findByLabelText } = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: user,
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
            viewer: user,
            application,
          },
        },
      },
      {
        request: {
          query: STOP_WORKING,
          variables: {
            input: {
              application: application.id,
              reason: "Because",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            stopWorking: {
              __typename: "StopWorkingPayload",
              application: {
                ...application,
                status: "Stopped Working",
              },
            },
          },
        },
      },
    ],
  });

  const stopWorkingButton = await findByLabelText("Stop Working");
  fireEvent.click(stopWorkingButton);
  const reason = await findByLabelText(
    "Let us know why you are stopping this work",
  );
  fireEvent.change(reason, { target: { value: "Because" } });
  const confirm = getAllByLabelText("Stop Working")[1];
  fireEvent.click(confirm);
  const notice = await findByText("This project has ended");
  expect(notice).toBeInTheDocument();
});
