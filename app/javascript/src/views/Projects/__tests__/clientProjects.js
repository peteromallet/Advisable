import { cleanup } from "@testing-library/react";
import fields from "../../../__mocks__/graphqlFields";
import renderApp from "../../../testHelpers/renderApp";
import VIEWER from "../../../graphql/queries/viewer";
import PROJECTS from "../getProjects";

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
