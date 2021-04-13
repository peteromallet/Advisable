import { renderRoute, mockData } from "test-utils";
import userEvent from "@testing-library/user-event";
import { fireEvent, screen } from "@testing-library/react";
import VIEWER from "../../../graphql/queries/getViewer.graphql";
import GET_SETUP_DATA from "../getSetupData";
import { ACCEPT_PROJECT_PAYMENT_TERMS } from "../queries";

test("User can request custom terms", async () => {
  const company = mockData.company();

  let user = mockData.user({
    company,
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

  let project = mockData.project({ projectType: null, user });
  let specialist = mockData.specialist({ firstName: "Dennis" });
  let application = mockData.application({
    status: "Applied",
    id: "rec1234",
    project,
    specialist,
  });

  renderRoute({
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
            currentCompany: company,
            viewer: user,
            application,
          },
        },
      },
      {
        request: {
          query: ACCEPT_PROJECT_PAYMENT_TERMS,
          variables: {
            input: {
              exceptionalTerms: "Exceptional terms",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            acceptProjectPaymentTerms: {
              __typename: "AcceptProjectPaymentTermsPayload",
              user: {
                ...user,
                paymentsSetup: true,
              },
            },
          },
        },
      },
    ],
  });

  await screen.findByText("Payment Terms");
  let accept = screen.getByLabelText(/exceptional payment terms/i);
  userEvent.click(accept);
  let exceptionalTerms = screen.getByLabelText(/What payment terms do you/i);
  userEvent.type(exceptionalTerms, "Exceptional terms");
  let button = await screen.getByLabelText("Continue");
  fireEvent.click(button);
  await screen.findByText(/how would you like to work with/i);
});
