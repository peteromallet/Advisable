import { cleanup, fireEvent } from "react-testing-library";
import renderApp from "../testHelpers/renderApp";
import viewer from "../graphql/queries/viewer";
import generateTypes from "../__mocks__/graphqlFields";
import getApplications from "../views/Candidates/graphql/fetchProject";

afterEach(cleanup);

test("Renders the candidates", async () => {
  const { findByText } = renderApp({
    route: "/projects/rec1234/applied",
    graphQLMocks: [
      {
        request: {
          query: viewer,
        },
        result: {
          data: {
            viewer: generateTypes.user(),
          },
        },
      },
      {
        request: {
          query: getApplications,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            project: generateTypes.project({
              id: "rec1233",
              applications: [
                generateTypes.application({
                  specialist: generateTypes.specialist({
                    name: "Test Account",
                  }),
                }),
                generateTypes.application({
                  specialist: generateTypes.specialist(),
                }),
              ],
            }),
          },
        },
      },
    ],
  });

  expect(await findByText("Test Account")).toBeInTheDocument();
});
