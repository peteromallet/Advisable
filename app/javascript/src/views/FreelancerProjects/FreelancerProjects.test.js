import user from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderRoute, mockViewer, mockData, mockQuery } from "test-utils";
import GET_PROJECTS from "./fetchData";

test("Shows the freelancers active projects", async () => {
  const freelancer = mockData.specialist({
    applications: [
      mockData.application({
        tasks: [],
        status: "Working",
        project: mockData.project({
          primarySkill: "test project",
          user: mockData.user(),
        }),
      }),
    ],
  });

  renderRoute({
    route: "/clients",
    graphQLMocks: [
      mockViewer(freelancer),
      mockQuery(GET_PROJECTS, {}, { viewer: freelancer }),
    ],
  });

  await screen.findByText(/test project/i);
});

test("render empty state", async () => {
  const freelancer = mockData.specialist({
    applications: [],
  });

  renderRoute({
    route: "/clients",
    graphQLMocks: [
      mockViewer(freelancer),
      mockQuery(GET_PROJECTS, {}, { viewer: freelancer }),
    ],
  });

  await screen.findByText(/no active projects/i);
});

test("Shows the freelancers active projects", async () => {
  const freelancer = mockData.specialist({
    applications: [
      mockData.application({
        tasks: [],
        status: "Stopped Working",
        project: mockData.project({
          primarySkill: "test project",
          user: mockData.user(),
        }),
      }),
    ],
  });

  renderRoute({
    route: "/clients",
    graphQLMocks: [
      mockViewer(freelancer),
      mockQuery(GET_PROJECTS, {}, { viewer: freelancer }),
    ],
  });

  expect(screen.queryByText(/test project/i)).toBeNull();
  user.click(await screen.findByLabelText(/finished/i));
  screen.findByText(/test project/i);
});
