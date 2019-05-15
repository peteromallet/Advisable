import wait from "waait";
import { cleanup, prettyDOM } from "react-testing-library";
import renderApp from "../testHelpers/renderApp";
import viewer from "../graphql/queries/viewer";
import getApplication from "../views/ApplicationFlow/fetchApplication";
import generateTypes from "../__mocks__/graphqlFields";

afterEach(cleanup);

test("when the project is closed it renders the applications closed view", async () => {
  const { findByText, container } = renderApp({
    route: "/invites/rec1234/apply",
    graphQLMocks: [
      {
        request: {
          query: viewer,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      {
        request: {
          query: getApplication,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: generateTypes.application({
              status: "Invited To Apply",
              specialist: generateTypes.specialist(),
              project: generateTypes.project({
                applicationsOpen: false,
              }),
            }),
          },
        },
      },
    ],
  });

  const title = await findByText("projects.applicationsClosed.title");
  expect(title).toBeInTheDocument();
});
