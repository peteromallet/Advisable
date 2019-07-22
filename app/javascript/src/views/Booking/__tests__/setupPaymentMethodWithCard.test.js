import renderApp from "../../../testHelpers/renderApp";
import { fireEvent, cleanup } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import { GET_PAYMENT_METHOD } from "../SetupPaymentMethod/CardDetails";
import {
  CREATE_SETUP_INTENT,
  GET_SETUP_INTENT_STATUS,
} from "../../../components/UpdatePaymentMethod";
import GET_CUSTOMER_DATA from "../../../components/PaymentMethodForm/getViewer";
import UPDATE_CUSTOMER from "../../../components/PaymentMethodForm/updateCustomer";
import UPDATE_PROJECT_PAYMENT_METHOD from "../SetupPaymentMethod/updateProjectPaymentMethod";

afterEach(cleanup);

test("User is redirected to setup without project payment method", async () => {
  let user = generateTypes.user({
    projectPaymentMethod: null,
    paymentMethod: null,
  });

  let project = generateTypes.project({ user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });
  let application = generateTypes.application({ project, specialist });

  const { findByText, findByPlaceholderText, findByLabelText } = renderApp({
    route: "/manage/rec1234",
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
          query: GET_ACTIVE_APPLICATION,
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
          query: GET_PAYMENT_METHOD,
        },
        result: {
          data: {
            viewer: user,
          },
        },
      },
      {
        request: {
          query: CREATE_SETUP_INTENT,
          variables: {},
        },
        result: {
          data: {
            __typename: "Mutation",
            createSetupIntent: {
              __typename: "CreateSetupIntentPayload",
              secret: "1234",
            },
          },
        },
      },
      {
        request: {
          query: GET_CUSTOMER_DATA,
        },
        result: {
          data: {
            viewer: user,
          },
        },
      },
      {
        request: {
          query: UPDATE_CUSTOMER,
          variables: {
            input: {
              name: "test",
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
          query: GET_SETUP_INTENT_STATUS,
        },
        result: {
          data: {
            viewer: {
              ...user,
              setupIntentStatus: "succeeded",
            },
          },
        },
      },
      {
        request: {
          query: UPDATE_PROJECT_PAYMENT_METHOD,
          variables: {
            input: {
              paymentMethod: "Card",
              acceptTerms: true,
              exceptionalTerms: "",
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
                projectPaymentMethod: "Card",
              },
            },
          },
        },
      },
    ],
  });

  await findByText(
    "It look’s like you haven’t added a project payment method yet"
  );
  let card = await findByText("Pay with card");
  fireEvent.click(card);
  let companyName = await findByPlaceholderText("Company Name");
  fireEvent.change(companyName, { target: { value: "test" } });
  let email = await findByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  let cardHolder = await findByPlaceholderText("Cardholder Name");
  fireEvent.change(cardHolder, { target: { value: "Test Persona" } });
  let button = await findByLabelText("Continue");
  fireEvent.click(button);
  let accept = await findByLabelText("I accept these payment terms");
  fireEvent.click(accept);
  let complete = await findByLabelText("Complete Setup");
  fireEvent.click(complete);
  let text = await findByText("Active Tasks");
  expect(text).toBeInTheDocument();
});
