import renderApp from "../../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_SPECIALIST from "../getProfile";
import UPDATE_PROFILE from "../updateProfile";
import COMPLETE_SETUP from "../completeSetup";
import { GET_APPLICATIONS } from "../../Applications/queries";

test("Completes the setup", async () => {
  const viewer = generateTypes.specialist({
    applicationStage: "Started",
    invitations: [],
  });

  const { findByText, getByLabelText } = renderApp({
    route: `/freelancers/signup/work`,
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
          query: GET_SPECIALIST,
        },
        result: {
          data: {
            viewer,
          },
        },
      },
      {
        request: {
          query: UPDATE_PROFILE,
          variables: {
            input: {
              linkedin: "https://linkedin.com",
              website: "",
              resume: null,
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateProfile: {
              __typename: "UpdateProfilePayload",
              specialist: viewer,
            },
          },
        },
      },
      {
        request: {
          query: COMPLETE_SETUP,
          variables: {
            input: {},
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            completeSetup: {
              __typename: "CompleteSetupPayload",
              specialist: {
                ...viewer,
                applicationStage: "On Hold",
              },
            },
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
              applicationStage: "On Hold",
              invitations: [],
              applications: [],
            },
          },
        },
      },
    ],
  });

  await findByText("Work history");
  const linkedin = getByLabelText("Linkedin URL (Recommended)");
  fireEvent.change(linkedin, { target: { value: "https://linkedin.com" } });
  const button = getByLabelText("Complete Setup");
  fireEvent.click(button);
  const header = await findByText("You have not applied to any projects yet");
  expect(header).toBeInTheDocument();
});
