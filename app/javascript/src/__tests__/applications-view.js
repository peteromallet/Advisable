import { cleanup } from "react-testing-library";
import renderApp from "../testHelpers/renderApp";
import viewer from "../graphql/queries/viewer";
import generateTypes from "../__mocks__/graphqlFields";
import getApplications from "../views/Project/fetchProject";

afterEach(cleanup);

describe("Viewing 'Applied'", () => {
  const render = () =>
    renderApp({
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
                    status: "Applied",
                    specialist: generateTypes.specialist({
                      name: "Test Account",
                    }),
                  }),
                  generateTypes.application({
                    status: "Application Rejected",
                    specialist: generateTypes.specialist({
                      name: "Mr Rejected",
                    }),
                  }),
                ],
              }),
            },
          },
        },
      ],
    });

  test("includes applications with a status of 'Applied'", async () => {
    const { findByText } = render();
    expect(await findByText("Test Account")).toBeInTheDocument();
  });

  test("excludes applications without a status of 'Applied'", async () => {
    const { findByText, queryByText } = render();
    await findByText("Test Account");
    expect(queryByText("Mr Rejected")).not.toBeInTheDocument();
  });
});
