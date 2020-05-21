import {
  screen,
  renderRoute,
  mockViewer,
  mockQuery,
  mockData,
} from "test-utils";
import GET_DATA from "./fetchData";
import { GET_SIMILAR_PROJECTS } from "./SimilarProjects/queries";

const specialist = mockData.specialist();

test("Shows application invites", async () => {
  const app = renderRoute({
    route: "/applications",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_DATA,
        {},
        {
          viewer: {
            ...specialist,
            invitations: [
              mockData.application({
                status: "Invited To Apply",
                project: mockData.project({
                  primarySkill: "Testing Invites",
                }),
              }),
            ],
            applications: [],
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
      GET_DATA,
      {},
      {
        viewer: {
          ...specialist,
          applicationStage: "On Hold",
          invitations: [],
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
