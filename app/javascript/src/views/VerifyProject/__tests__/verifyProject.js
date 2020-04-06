import { fireEvent } from "@testing-library/react";
import viewer from "../../../graphql/queries/viewer";
import renderApp from "../../../testHelpers/renderApp";
import generateTypes from "../../../__mocks__/graphqlFields";
import GET_DATA from "../getData";
import VALIDATE_PROJECT from "../validateProject";

test("Starts the verification process", async () => {
  const specialist = generateTypes.specialist();
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();
  const previousProject = generateTypes.previousProject({
    primarySkill: skill,
    primaryIndustry: industry,
    skills: [skill],
    industries: [industry],
    specialist,
  });

  const apiMocks = [
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
        query: GET_DATA,
        variables: {
          id: "opp_1234",
        },
      },
      result: {
        data: {
          previousProject,
        },
      },
    },
    {
      request: {
        query: VALIDATE_PROJECT,
        variables: {
          input: {
            id: "opp_1234",
            email: "hello@test.com",
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          verifyPreviousProject: {
            __typename: "VerifyPreviousProjectPayload",
            previousProject: {
              ...previousProject,
              validationStatus: "In Progress",
              contactEmail: "hello@test.com",
            },
          },
        },
      },
    },
  ];

  const { findByText, getByLabelText } = renderApp({
    route: "/verify_project/opp_1234",
    graphQLMocks: apiMocks,
  });

  await findByText("To validate this project", { exact: false });
  const email = getByLabelText("Email Address");
  fireEvent.change(email, { target: { value: "hello@test.com" } });
  const accept = getByLabelText(
    "I consent to be contacted to verify this project at the above email address.",
    { exact: false },
  );
  fireEvent.click(accept);
  const button = getByLabelText("Send verification details");
  fireEvent.click(button);
  const notice = await findByText("An email has been sent", { exact: false });
  expect(notice).toBeInTheDocument();
});
