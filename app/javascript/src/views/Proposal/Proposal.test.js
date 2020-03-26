import { fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_APPLICATION from "./fetchApplication";
import UPDATE_APPLICATION from "./updateApplication";

jest.mock("nanoid/generate");

test("Rate step continues to the project type step", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    tasks: [],
    project,
    specialist,
  });

  const { findByText, getByLabelText } = renderApp({
    route: "/applications/rec123/proposal",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: specialist,
          },
        },
      },
      {
        request: {
          query: GET_APPLICATION,
          variables: {
            id: "rec123",
          },
        },
        result: {
          data: {
            application,
          },
        },
      },
      {
        request: {
          query: UPDATE_APPLICATION,
          variables: {
            input: {
              id: "rec123",
              rate: 75,
            },
          },
        },
        result: {
          data: {
            updateApplication: {
              __typename: "UpdateApplicationPayload",
              application: {
                ...application,
                rate: "75",
              },
              errors: null,
            },
          },
        },
      },
    ],
  });

  await findByText('Proposal for "Testing" with Test Inc');
  const rate = getByLabelText("Hourly Rate");
  fireEvent.change(rate, { target: { value: "75" } });
  let button = getByLabelText("Continue");
  fireEvent.click(button);
  const flexible = await findByText("Project Type");
  expect(flexible).toBeInTheDocument();
});

test("Project type step continues to the tasks step", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    tasks: [],
    project,
    specialist,
  });

  const { findByText, findByTestId, getByLabelText } = renderApp({
    route: "/applications/rec123/proposal/type",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: specialist,
          },
        },
      },
      {
        request: {
          query: GET_APPLICATION,
          variables: {
            id: "rec123",
          },
        },
        result: {
          data: {
            application,
          },
        },
      },
      {
        request: {
          query: UPDATE_APPLICATION,
          variables: {
            input: {
              id: "rec123",
              projectType: "Flexible",
              monthlyLimit: 155,
            },
          },
        },
        result: {
          data: {
            updateApplication: {
              __typename: "UpdateApplicationPayload",
              application: {
                ...application,
                projectType: "Flexible",
                monthlyLimit: 155,
              },
              errors: null,
            },
          },
        },
      },
    ],
  });

  await findByText('Proposal for "Testing" with Test Inc');
  const flexible = await findByTestId("flexible");
  fireEvent.click(flexible);
  const limit = getByLabelText(
    "Set suggested monthly hour cap (to 200-hour max)"
  );
  fireEvent.change(limit, { target: { value: "155" } });
  const accept = getByLabelText("I agree", { exact: false });
  fireEvent.click(accept);
  const cont = getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await findByText("Project Tasks");
  expect(el).toBeInTheDocument();
});
