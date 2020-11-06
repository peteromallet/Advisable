import fields from "../../__mocks__/graphqlFields";
import { screen } from "@testing-library/react";
import { renderRoute, mockQuery, mockViewer } from "test-utils";
import { GET_PROJECTS } from "./queries";
import { GET_APPLICATIONS } from "../Applications/queries";

test("Loads the clients projects", async () => {
  const skill = fields.skill({ name: "Primary Skill" });
  const project = fields.project({ primarySkill: skill, matches: [] });
  const user = fields.user({ projects: [project] });

  renderRoute({
    route: "/projects",
    graphQLMocks: [
      mockViewer(user),
      mockQuery(GET_PROJECTS, {}, { viewer: user }),
    ],
  });

  await screen.findByText(skill.name);
});

test("Redirects to specialist dashboard if not logged in as a user", async () => {
  const specialist = fields.specialist();

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

test("Renders a account confirmation prompt", async () => {
  const user = fields.user({ confirmed: false, projects: [] });

  renderRoute({
    route: "/projects",
    graphQLMocks: [
      mockViewer(user),
      mockQuery(GET_PROJECTS, {}, { viewer: user }),
    ],
  });

  await screen.findByText(/please confirm your account/i);
});
