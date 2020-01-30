import { cleanup } from "@testing-library/react";
import fields from "../../__mocks__/graphqlFields";
import renderApp from "../../testHelpers/renderApp";
import VIEWER from "../../graphql/queries/viewer";
import PROJECTS from "./getProjects";
import FREELANCER_APPLICATIONS from "../Applications/fetchData";

afterEach(cleanup);

test("Loads the clients projects", async () => {
  const project = fields.project({ primarySkill: "Test Primary Skill" });
  const user = fields.user({ projects: [project] });

  let { findByText } = renderApp({
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
          query: PROJECTS,
        },
        result: {
          data: {
            viewer: user,
          },
        },
      },
    ],
  });

  let projectTitle = await findByText("Test Primary Skill");
  expect(projectTitle).toBeInTheDocument();
});

test("Redirects to specialist dashboard if not logged in as a user", async () => {
  const specialist = fields.specialist();

  const app = renderApp({
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
          query: FREELANCER_APPLICATIONS,
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
    "You have not applied to any projects yet"
  );
  expect(header).toBeInTheDocument();
});

test("Redirects to login page if not logged in", async () => {
  const app = renderApp({
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

  const header = await app.findByText("Welcome back!");
  expect(header).toBeInTheDocument();
});
