import { fireEvent, cleanup } from "@testing-library/react";
import renderApp from "../../../testHelpers/renderApp";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_PROJECT from "../fetchProject";
import GET_PAYMENT_INTENT from "../Steps/Deposit/getPaymentIntent";
import UPDATE_CUSTOMER from "../../../components/PaymentMethodForm/updateCustomer";
import { GET_DEPOSIT } from "../Steps/Deposit/PaymentPending";

afterEach(cleanup);

test("User can complete deposit step", async () => {
  let user = generateTypes.user();
  let project = generateTypes.project({
    airtableId: "rec1234",
    status: "Brief Pending Confirmation",
    depositOwed: 25000,
    acceptedTerms: true,
  });

  const { debug, findByText, findByLabelText } = renderApp({
    route: "/project_setup/rec1234/deposit",
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
          query: GET_PROJECT,
          variables: {
            id: "rec1234",
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
          query: GET_PAYMENT_INTENT,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: user,
            project,
          },
        },
      },
      {
        request: {
          query: UPDATE_CUSTOMER,
          variables: {
            input: {
              name: "Test Corp",
              email: "test@test.com",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateCustomer: {
              __typename: "UpdateCustomerPayload",
              customer: user.customer,
            },
          },
        },
      },
      {
        request: {
          query: GET_DEPOSIT,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            project: {
              ...project,
              depositOwed: 0,
            },
          },
        },
      },
    ],
  });

  let companyName = await findByLabelText("Company Name");
  fireEvent.change(companyName, { target: { value: "Test Corp" } });
  let email = await findByLabelText("Email");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  let cardholder = await findByLabelText("Cardholder Name");
  fireEvent.change(cardholder, { target: { value: "John Doe" } });
  let complete = await findByLabelText("Complete Setup");
  fireEvent.click(complete);
  let text = await findByText("Please wait while", { exact: false });
  expect(text).toBeInTheDocument();
  let confirmText = await findByText("Setting up your project...");
  expect(confirmText).toBeInTheDocument();
});
