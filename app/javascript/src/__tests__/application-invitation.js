import renderApp from "../testHelpers/renderApp";
import viewer from "../graphql/queries/viewer";
import { getApplicationInvitation } from "../graphql/queries/applications";
import generateTypes from "../__mocks__/graphqlFields";

test("Renders the view for an application invitation", async () => {
  const { findByText } = renderApp({
    route: "/invites/rec1234",
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
          query: getApplicationInvitation,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: generateTypes.application({
              status: "Invited To Apply",
              project: generateTypes.project({
                user: generateTypes.user({
                  country: generateTypes.country(),
                }),
              }),
            }),
          },
        },
      },
    ],
  });

  expect(
    await findByText("You have been invited to apply for a new project")
  ).toBeInTheDocument();
});

test("when the project is closed it renders the applications closed view", async () => {
  const { findByText } = renderApp({
    route: "/invites/rec1234",
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
          query: getApplicationInvitation,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: generateTypes.application({
              status: "Invited To Apply",
              project: generateTypes.project({
                applicationsOpen: false,
                user: generateTypes.user({
                  country: generateTypes.country(),
                }),
              }),
            }),
          },
        },
      },
    ],
  });

  expect(
    await findByText("projects.applicationsClosed.title")
  ).toBeInTheDocument();
});
