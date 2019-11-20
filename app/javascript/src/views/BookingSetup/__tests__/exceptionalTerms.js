import renderApp from "../../../testHelpers/renderApp";
import { fireEvent, cleanup } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_SETUP_DATA from "../getSetupData";
import UPDATE_PROJECT_PAYMENT_METHOD from "../updateProjectPaymentMethod";

afterEach(cleanup);
jest.setTimeout(10000);

test("User can request custom terms", async () => {
  let user = generateTypes.user({
    paymentsSetup: false,
    projectPaymentMethod: null,
    paymentMethod: {
      __typename: "PaymentMethod",
      last4: "4444",
      brand: "visa",
      expMonth: "05",
      expYear: "2025",
    },
  });

  let project = generateTypes.project({ projectType: null, user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });
  let application = generateTypes.application({
    status: "Applied",
    airtableId: "rec1234",
    project,
    specialist,
  });

  const app = renderApp({
    route: "/book/rec1234/payment_terms",
    graphQLMocks: [
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
          query: GET_SETUP_DATA,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: user,
            application,
          },
        },
      },
      {
        request: {
          query: UPDATE_PROJECT_PAYMENT_METHOD,
          variables: {
            input: {
              acceptTerms: false,
              exceptionalTerms: "Exceptional terms",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateProjectPaymentMethod: {
              __typename: "UpdateProjectPaymentMethodPayload",
              user: {
                ...user,
                paymentsSetup: true,
                projectPaymentMethod: "Card",
              },
            },
          },
        },
      },
    ],
  });

  await app.findByText("Payment Terms");
  let accept = app.getByLabelText("exceptional payment terms", {
    exact: false,
  });
  fireEvent.click(accept);
  let exceptionalTerms = app.getByLabelText(
    "What payment terms do you suggest?"
  );
  fireEvent.change(exceptionalTerms, {
    target: { value: "Exceptional terms" },
  });
  let button = await app.findByLabelText("Continue");
  fireEvent.click(button);
  let header = await app.findByText("How do you want to work with", {
    exact: false,
  });
  expect(header).toBeInTheDocument();
});
