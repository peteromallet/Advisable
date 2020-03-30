import renderApp from "../../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_APPLICATIONS from "../../Applications/fetchData";

test("Display account on hold notice when account is on hold", async () => {
  const viewer = generateTypes.specialist({ applicationStage: "On Hold" });

  const { findByText } = renderApp({
    route: "/applications",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer,
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
              ...viewer,
              invitations: [],
              applications: [],
            },
          },
        },
      },
    ],
  });

  const notice = await findByText("Your account is currently on hold");
  expect(notice).toBeInTheDocument();
});
