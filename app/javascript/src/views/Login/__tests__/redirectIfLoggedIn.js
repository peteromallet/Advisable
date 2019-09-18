import { fireEvent, cleanup } from "@testing-library/react";
import renderApp from "../../../testHelpers/renderApp";
import fields from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import PROJECTS from "../../Projects/getProjects";

afterEach(cleanup);

test("User can login", async () => {
  let user = fields.user({ projects: [] });

  let { findByText } = renderApp({
    route: "/login",
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

  let text = await findByText("Your projects");
  expect(text).toBeInTheDocument();
});
