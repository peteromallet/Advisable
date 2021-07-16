import {
  screen,
  renderRoute,
  mockViewer,
  mockQuery,
  mockData,
} from "../../testHelpers/test-utils";
import { GET_APPLICATIONS } from "./queries";

const specialist = mockData.specialist();

test("Shows application invites", async () => {
  const app = renderRoute({
    route: "/applications",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_APPLICATIONS,
        {},
        {
          viewer: {
            ...specialist,
            applications: [
              mockData.application({
                status: "Invited To Apply",
                project: mockData.project({
                  primarySkill: mockData.skill({
                    name: "Testing Invites",
                  }),
                  user: mockData.user(),
                }),
                interview: null,
              }),
            ],
          },
        },
      ),
    ],
  });

  await app.findByText(/Good news/i);
  const skill = app.getByText("Testing Invites");
  expect(skill).toBeInTheDocument();
});

test("Renders a account confirmation prompt", async () => {
  renderRoute({
    route: "/projects",
    graphQLMocks: [
      mockViewer({ ...specialist, confirmed: false }),
      mockQuery(
        GET_APPLICATIONS,
        {},
        {
          viewer: {
            ...specialist,
            applications: [],
          },
        },
      ),
    ],
  });

  await screen.findByText(/please confirm your account/i);
});
