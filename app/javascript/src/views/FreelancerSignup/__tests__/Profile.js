import renderApp from "../../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_SPECIALIST from "../getProfile";
import UPDATE_PROFILE from "../updateProfile";
import { GET_COUNTRIES } from "../BuildProfile";

test("Continues to the work history step", async () => {
  const viewer = generateTypes.specialist({
    applicationStage: "Started",
    invitations: [],
  });

  const {
    findByText,
    getByPlaceholderText,
    getByLabelText,
    getByTestId,
  } = renderApp({
    route: `/freelancers/signup/profile`,
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
      {
        request: {
          query: UPDATE_PROFILE,
          variables: {
            input: {
              bio: "Bio",
              city: "Dublin",
              country: "IE",
              publicUse: true,
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
    ],
  });

  await findByText("Build your profile");
  const bio = getByLabelText("Add a short bio");
  fireEvent.change(bio, { target: { value: "Bio" } });
  const city = getByPlaceholderText("City");
  fireEvent.change(city, { target: { value: "Dublin" } });
  const country = getByTestId("country");
  fireEvent.change(country, { target: { value: "IE" } });
  const button = getByLabelText("Continue");
  fireEvent.click(button);
  const header = await findByText("Work history");
  expect(header).toBeInTheDocument();
});
