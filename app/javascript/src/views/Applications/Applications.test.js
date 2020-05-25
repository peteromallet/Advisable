import {
  screen,
  renderRoute,
  mockViewer,
  mockQuery,
  mockData,
} from "test-utils";
import { GET_APPLICATIONS } from "./queries";
import { GET_APPLICATION } from "../JobListing/queries";
import { GET_SIMILAR_PROJECTS } from "./SimilarProjects/queries";

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
                  primarySkill: "Testing Invites",
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

test("Shows account on hold view if applicationStage is 'On Hold", async () => {
  const project = mockData.previousProject({
    specialist: mockData.specialist(),
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      GET_APPLICATIONS,
      {},
      {
        viewer: {
          ...specialist,
          applicationStage: "On Hold",
          applications: [],
        },
      },
    ),
    mockQuery(
      GET_SIMILAR_PROJECTS,
      {},
      {
        viewer: {
          ...specialist,
          similarPreviousProjects: [project],
        },
      },
    ),
  ];

  renderRoute({
    route: "/applications",
    graphQLMocks,
  });

  await screen.findByText("Your account is currently on hold");
  await screen.findByText(project.title);
});

test("Redirects to apply if account is on hold and has invitiation waiting", async () => {
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      GET_APPLICATIONS,
      {},
      {
        viewer: {
          ...specialist,
          applicationStage: "On Hold",
          applications: [
            mockData.application({
              id: "app_123",
              status: "Invited To Apply",
              project: mockData.project({
                primarySkill: "Testing Invites",
                user: mockData.user(),
              }),
              interview: null,
            }),
          ],
        },
      },
    ),
    mockQuery(
      GET_APPLICATION,
      {
        id: "app_123",
      },
      {
        application: mockData.application({
          specialist: mockData.specialist(),
          project: mockData.project({
            user: mockData.user({
              country: mockData.country(),
            }),
          }),
        }),
      },
    ),
  ];

  renderRoute({
    route: "/applications",
    graphQLMocks,
  });

  await screen.findByText(/you have been invited/i);
});

test("Redirects to apply if account stage is 'Full Application' and has invitiation waiting", async () => {
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      GET_APPLICATIONS,
      {},
      {
        viewer: {
          ...specialist,
          applicationStage: "Full Application",
          applications: [
            mockData.application({
              id: "app_123",
              status: "Invited To Apply",
              project: mockData.project({
                primarySkill: "Testing Invites",
                user: mockData.user(),
              }),
              interview: null,
            }),
          ],
        },
      },
    ),
    mockQuery(
      GET_APPLICATION,
      {
        id: "app_123",
      },
      {
        application: mockData.application({
          specialist: mockData.specialist(),
          project: mockData.project({
            user: mockData.user({
              country: mockData.country(),
            }),
          }),
        }),
      },
    ),
  ];

  renderRoute({
    route: "/applications",
    graphQLMocks,
  });

  await screen.findByText(/you have been invited/i);
});
