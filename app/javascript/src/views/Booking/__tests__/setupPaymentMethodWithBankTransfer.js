import renderApp from "../../../testHelpers/renderApp";
import { fireEvent, cleanup } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import { GET_DATA } from "../SetupPaymentMethod/InvoiceSettings";
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

  const {
    findByText,
    findByPlaceholderText,
    findByLabelText,
    getByTestId,
  } = renderApp({
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
          query: GET_DATA,
        },
        result: {
          data: {
            countries: [generateTypes.country()],
            viewer: user,
          },
        },
      },
      {
        request: {
          query: UPDATE_PROJECT_PAYMENT_METHOD,
          variables: {
            input: {
              paymentMethod: "Bank Transfer",
              invoiceSettings: {
                name: "Test Account",
                companyName: "Test Corp",
                vatNumber: "12345",
                address: {
                  line1: "House Name",
                  line2: "",
                  city: "Test City",
                  state: "Dublin",
                  country: "IE",
                  postcode: "",
                },
              },
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
                projectPaymentMethod: "Bank Transfer",
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
  let card = await findByText("Pay via bank transfer");
  fireEvent.click(card);
  let line1 = await findByPlaceholderText("Line 1");
  fireEvent.change(line1, { target: { value: "House Name" } });
  let city = await findByPlaceholderText("City");
  fireEvent.change(city, { target: { value: "Test City" } });
  let country = getByTestId("country-select");
  fireEvent.change(country, { target: { value: "IE" } });
  let vat = await findByPlaceholderText("VAT Number");
  fireEvent.change(vat, { target: { value: "12345" } });
  let button = await findByLabelText("Continue");
  fireEvent.click(button);
  let accept = await findByLabelText("I accept these payment terms");
  fireEvent.click(accept);
  let complete = await findByLabelText("Complete Setup");
  fireEvent.click(complete);
  let text = await findByText("Active Tasks");
  expect(text).toBeInTheDocument();
});
