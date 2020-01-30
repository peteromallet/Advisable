import { fireEvent, cleanup } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_APPLICATION from "./fetchApplication";
import UPDATE_APPLICATION from "./updateApplication";

jest.mock("nanoid/generate");
afterEach(cleanup);

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

  const app = renderApp({
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

  await app.findByText('Proposal for "Testing" with Test Inc');
  const rate = app.getByLabelText("Hourly Rate");
  fireEvent.change(rate, { target: { value: "75" } });
  let button = app.getByLabelText("Continue");
  fireEvent.click(button);
  const description = await app.findByText("How would you like to work", {
    exact: false,
  });
  expect(description).toBeInTheDocument();
});

test("Project type step continues to the tasks step for Fixed working type", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    projectType: null,
    monthlyLimit: null,
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
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
              projectType: "Fixed",
              monthlyLimit: null,
            },
          },
        },
        result: {
          data: {
            updateApplication: {
              __typename: "UpdateApplicationPayload",
              application: {
                ...application,
                projectType: "Fixed",
                monthlyLimit: null,
              },
              errors: null,
            },
          },
        },
      },
    ],
  });

  await app.findByText('Proposal for "Testing" with Test Inc');
  const option = await app.getByText("projectTypes.Fixed.label");
  fireEvent.click(option);
  const accept = app.getByText("I agree", { exact: false });
  fireEvent.click(accept);
  const cont = app.getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await app.findByText("Project Tasks");
  expect(el).toBeInTheDocument();
});

test("Project type step continues to the billing cycle for Flexible working type", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    projectType: null,
    monthlyLimit: null,
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
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

  await app.findByText('Proposal for "Testing" with Test Inc');
  const option = app.getByText("projectTypes.Flexible.label");
  fireEvent.click(option);
  const limit = app.getByLabelText(
    "Set suggested monthly hour cap (to 200-hour max)"
  );
  fireEvent.change(limit, { target: { value: "155" } });
  const accept = app.getByText("I agree", { exact: false });
  fireEvent.click(accept);
  const cont = app.getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await app.findByText("Please note that we only bill the client", {
    exact: false,
  });
  expect(el).toBeInTheDocument();
});

test("Freelancer can set billing cycle", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    projectType: "Flexible",
    monthlyLimit: 155,
    billingCycle: null,
    tasks: [],
    project,
    specialist,
  });

  const app = renderApp({
    route: "/applications/rec123/proposal/billing_cycle",
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
              billingCycle: "Monthly",
            },
          },
        },
        result: {
          data: {
            updateApplication: {
              __typename: "UpdateApplicationPayload",
              application: {
                ...application,
                billing_cycle: "Monthly",
              },
              errors: null,
            },
          },
        },
      },
    ],
  });

  await app.findByText("Please note that we only bill the client", {
    exact: false,
  });
  const option = app.getByText("Monthly - Last Friday of every month");
  fireEvent.click(option);
  const accept = app.getByText("I accept", { exact: false });
  fireEvent.click(accept);
  const cont = app.getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await app.findByText("Include a short message");
  expect(el).toBeInTheDocument();
});
