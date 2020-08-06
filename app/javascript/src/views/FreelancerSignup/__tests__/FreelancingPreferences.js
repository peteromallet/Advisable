import renderApp from "../../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_SPECIALIST from "../getProfile";
import UPDATE_PROFILE from "../updateProfile";
import { GET_COUNTRIES } from "../BuildProfile";

test("Continues to the build profile step", async () => {
  const viewer = generateTypes.specialist({
    applicationStage: "Started",
    invitations: [],
  });

  const { findByText, getByLabelText } = renderApp({
    route: `/freelancers/signup/preferences`,
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
              primarilyFreelance: true,
              numberOfProjects: "20+",
              hourlyRate: 4500,
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
          query: GET_COUNTRIES,
        },
        result: {
          data: {
            countries: [
              generateTypes.country({ label: "Ireland", value: "IE" }),
            ],
          },
        },
      },
    ],
  });

  await findByText("Freelancing Preferences");
  const radio = getByLabelText("Yes, freelancing is my primary occupation");
  fireEvent.click(radio);
  const numberOfProjects = getByLabelText("20+");
  fireEvent.click(numberOfProjects);
  const rate = getByLabelText("What is your typical hourly rate in USD?");
  fireEvent.change(rate, { target: { value: 45 } });
  const button = getByLabelText("Continue");
  fireEvent.click(button);
  const header = await findByText("Build your profile");
  expect(header).toBeInTheDocument();
});
