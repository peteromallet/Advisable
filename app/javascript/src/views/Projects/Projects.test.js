import { screen } from "@testing-library/react";
import { mockData, renderRoute, mockQuery, mockViewer } from "test-utils";
import { GET_PROJECTS } from "./queries";
import { GET_APPLICATIONS } from "../Applications/queries";

test("Loads the clients projects", async () => {
  const skill = mockData.skill({ name: "Primary Skill" });
  const project = mockData.project({ primarySkill: skill, matches: [] });
  const user = mockData.user({
    industry: mockData.industry(),
  });
  const company = mockData.company({ projects: [project] });

  renderRoute({
    route: "/projects",
    graphQLMocks: [
      mockViewer(user),
      mockQuery(
        GET_PROJECTS,
        {},
        {
          viewer: user,
          currentCompany: company,
        },
      ),
    ],
  });

  await screen.findByText(skill.name);
});

test("Redirects to specialist dashboard if not logged in as a user", async () => {
  const specialist = mockData.specialist();

  renderRoute({
    route: "/projects",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_APPLICATIONS,
        {},
        {
          viewer: {
            ...specialist,
            invitations: [],
            applications: [],
          },
        },
      ),
    ],
  });

  await screen.findByText(/you have not applied to any projects/i);
});

test("Redirects to login page if not logged in", async () => {
  renderRoute({
    route: "/projects",
    graphQLMocks: [mockViewer(null)],
  });

  await screen.findByText(/welcome back/i);
});
