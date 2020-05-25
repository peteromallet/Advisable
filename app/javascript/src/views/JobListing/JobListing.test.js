import user from "@testing-library/user-event";
import { screen, within } from "@testing-library/react";
import {
  renderRoute,
  mockViewer,
  mockQuery,
  mockData,
  mockMutation,
} from "test-utils";
import { GET_APPLICATION, REJECT_INVITATION } from "./queries";

test("Renders the view for an application invitation", async () => {
  renderRoute({
    route: "/invites/rec1234",
    graphQLMocks: [
      mockViewer(null),
      mockQuery(
        GET_APPLICATION,
        { id: "rec1234" },
        {
          application: mockData.application({
            status: "Invited To Apply",
            specialist: mockData.specialist(),
            project: mockData.project({
              user: mockData.user({
                country: mockData.country(),
              }),
            }),
          }),
        },
      ),
    ],
  });

  await screen.findByText(/you have been invited/i);
});

test("specialist can reject the invitation", async () => {
  const application = mockData.application({
    status: "Invited To Apply",
    specialist: mockData.specialist(),
    project: mockData.project({
      user: mockData.user({
        country: mockData.country(),
      }),
    }),
  });

  renderRoute({
    route: "/invites/rec1234",
    graphQLMocks: [
      mockViewer(null),
      mockQuery(
        GET_APPLICATION,
        { id: "rec1234" },
        {
          application,
        },
      ),
      mockMutation(
        REJECT_INVITATION,
        {
          id: application.airtableId,
          reason: "No availability currently",
        },
        {
          rejectApplicationInvitation: {
            __typename: "RejectApplicationInvitationPayload",
            application: {
              ...application,
              status: "Invitation Rejected",
            },
          },
        },
      ),
    ],
  });

  const reject = await screen.findByRole("button", { name: /reject/i });
  user.click(reject);
  const reason = screen.getByRole("combobox", { name: /why are you/i });
  user.selectOptions(reason, "No availability currently");
  const modal = within(screen.getByRole("dialog", /reject application/i));
  user.click(modal.getByRole("button", { name: /reject/i }));
  await screen.findByText(/do you know anyone/i);
});

test("when the project is closed it renders the applications closed view", async () => {
  renderRoute({
    route: "/invites/rec1234",
    graphQLMocks: [
      mockViewer(null),
      mockQuery(
        GET_APPLICATION,
        { id: "rec1234" },
        {
          application: mockData.application({
            status: "Invited To Apply",
            specialist: mockData.specialist(),
            project: mockData.project({
              applicationsOpen: false,
              user: mockData.user({
                country: mockData.country(),
              }),
            }),
          }),
        },
      ),
    ],
  });

  await screen.findByText("projects.applicationsClosed.title");
});

test("Shows notice that the application will be used in advisable application", async () => {
  renderRoute({
    route: "/invites/rec1234",
    graphQLMocks: [
      mockViewer(null),
      mockQuery(
        GET_APPLICATION,
        { id: "rec1234" },
        {
          application: mockData.application({
            status: "Invited To Apply",
            specialist: mockData.specialist({
              applicationStage: "On Hold",
            }),
            project: mockData.project({
              user: mockData.user({
                country: mockData.country(),
              }),
            }),
          }),
        },
      ),
    ],
  });

  await screen.findByText(/used as part of your advisable application/i);
});
