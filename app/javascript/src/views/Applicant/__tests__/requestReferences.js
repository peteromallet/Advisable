import { fireEvent, cleanup, within } from "@testing-library/react";
import renderApp from "../../../testHelpers/renderApp";
import VIEWER from "../../../graphql/queries/viewer";
import graphql from "../../../__mocks__/graphqlFields";
import GET_APPLICATION from "../fetchApplication";
import REQUEST_REFERENCES from "../../../components/RequestReferences/requestReferences.graphql";

afterEach(cleanup);

test("Requesting references", async () => {
  // setup mock data
  const user = graphql.user();
  const specialist = graphql.specialist();
  const application = graphql.application({
    status: "Application Accepted",
    referencesRequested: false,
    specialist,
  });
  const project = graphql.project({
    application,
  });

  const graphQLMocks = [
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
        query: GET_APPLICATION,
        variables: {
          projectID: "rec123",
          applicationID: "app123",
        },
      },
      result: {
        data: {
          project,
        },
      },
    },
    {
      request: {
        query: REQUEST_REFERENCES,
        variables: {
          input: {
            id: application.airtableId,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          requestReferences: {
            __typename: "RequestReferencesPayload",
            application: {
              ...application,
              referencesRequested: true,
            },
          },
        },
      },
    },
  ];

  const { findByText, findByLabelText, getByRole } = renderApp({
    route: "/projects/rec123/applications/app123",
    graphQLMocks,
  });

  const button = await findByLabelText("Request References");
  fireEvent.click(button);
  const modal = getByRole("dialog");
  const confirm = within(modal).getByLabelText("Request References");
  fireEvent.click(confirm);
  const notice = await findByText("We have requested references", {
    exact: false,
  });
  expect(notice).toBeInTheDocument();
});
