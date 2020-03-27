import { renderRoute, waitFor, fireEvent } from "test-utils";
import { mockViewer, mockQuery, mockMutation } from "apolloMocks";
import generateTypes from "../../../__mocks__/graphqlFields";
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

  const { getAllByLabelText, queryByText, findByLabelText } = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      mockViewer(user),
      mockQuery(
        GET_ACTIVE_APPLICATION,
        { id: "rec1234" },
        { viewer: user, application },
      ),
      mockMutation(
        RESUME_WORKING,
        {
          application: application.airtableId,
          projectType: application.projectType,
        },
        {
          startWorking: {
            __typename: "StartWorkingPayload",
            application: {
              ...application,
              status: "Working",
            },
          },
        },
      ),
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
