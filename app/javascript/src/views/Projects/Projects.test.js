import fields from "../../__mocks__/graphqlFields";
import { renderRoute } from "test-utils";
import VIEWER from "../../graphql/queries/viewer";
import { GET_PROJECTS } from "./queries";
import { GET_APPLICATIONS } from "../Applications/queries";

test("Loads the clients projects", async () => {
  const skill = fields.skill({ name: "Primary Skill" });
  const project = fields.project({ primarySkill: skill, matches: [] });
  const user = fields.user({ projects: [project] });

  let { findByText } = renderRoute({
    route: "/projects",
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
          query: GET_PROJECTS,
        },
        result: {
          data: {
            viewer: user,
          },
        },
      },
    ],
  });

  let projectTitle = await findByText(skill.name);
  expect(projectTitle).toBeInTheDocument();
});

test("Redirects to specialist dashboard if not logged in as a user", async () => {
  const specialist = fields.specialist();

  const app = renderRoute({
    route: "/projects",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: specialist,
          },
        },
      },
      {
        request: {
          query: GET_APPLICATIONS,
        },
        result: {
          data: {
            viewer: {
              ...specialist,
              invitations: [],
              applications: [],
            },
          },
        },
      },
    ],
  });

  const header = await app.findByText(
    "You have not applied to any projects yet",
  );
  expect(header).toBeInTheDocument();
});

test("Redirects to login page if not logged in", async () => {
  const app = renderRoute({
    route: "/projects",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
    ],
  });

  const header = await app.findByText(/Welcome back/i);
  expect(header).toBeInTheDocument();
});
