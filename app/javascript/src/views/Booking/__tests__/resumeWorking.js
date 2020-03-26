import renderApp from "../../../testHelpers/renderApp";
import { waitFor, fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import { RESUME_WORKING } from "../StoppedWorkingNotice";

test("Client can resume working with specialist", async () => {
  let user = generateTypes.user();
  let project = generateTypes.project({ user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });

  let application = generateTypes.application({
    project,
    specialist,
    status: "Stopped Working",
  });

  const { getAllByLabelText, queryByText, findByLabelText } = renderApp({
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
          query: RESUME_WORKING,
          variables: {
            input: {
              application: application.airtableId,
              projectType: application.projectType,
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            startWorking: {
              __typename: "StartWorkingPayload",
              application: {
                ...application,
                status: "Working",
              },
            },
          },
        },
      },
    ],
  });

  const resumeWorking = await findByLabelText("Resume Project");
  fireEvent.click(resumeWorking);
  const confirm = getAllByLabelText("Resume Project")[1];
  fireEvent.click(confirm);
  await waitFor(() => {
    expect(queryByText("This project has ended")).not.toBeInTheDocument();
  });
});
