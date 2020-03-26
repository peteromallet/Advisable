import renderApp from "../../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_ACTIVE_APPLICATION from "../../Booking/getActiveApplication";
import GET_SETUP_DATA from "../getSetupData";
import { GET_PAYMENT_METHOD } from "../CardDetails";
import { GET_DATA } from "../../../components/InvoiceSettingsFields";
import UPDATE_PROJECT_PAYMENT_METHOD from "../updateProjectPaymentMethod";
import START_WORKING from "../startWorking";
import graphqlFields from "../../../__mocks__/graphqlFields";

jest.setTimeout(10000);

test("User can complete booking setup", async () => {
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
    route: "/book/rec1234",
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
              paymentMethod: "Card",
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
          query: GET_DATA,
        },
        result: {
          data: {
            countries: [graphqlFields.country()],
          },
        },
      },
      {
        request: {
          query: UPDATE_PROJECT_PAYMENT_METHOD,
          variables: {
            input: {
              invoiceSettings: {
                name: "Test Account",
                companyName: "Test Corp",
                billingEmail: "test@test.com",
                address: {
                  line1: "Bacon Street",
                  country: "IE",
                  city: "Test City",
                  state: "Test County",
                  postcode: "12345",
                },
                vatNumber: "12345",
              },
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
      {
        request: {
          query: UPDATE_PROJECT_PAYMENT_METHOD,
          variables: {
            input: {
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
                paymentsSetup: true,
                projectPaymentMethod: "Card",
              },
            },
          },
        },
      },
      {
        request: {
          query: START_WORKING,
          variables: {
            input: {
              application: "rec1234",
              projectType: "Fixed",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            startWorking: {
              __typename: "StartWorkingPayload",
              application: {
                ...application,
                projectType: "Fixed",
              },
            },
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
            viewer: {
              ...user,
            },
            application: {
              ...application,
              status: "Working",
              projectType: "Fixed",
            },
          },
        },
      },
    ],
  });

  await app.findByText(
    "It look’s like you haven’t added a project payment method yet"
  );
  let card = await app.getByLabelText("Payments with Card", { exact: false });
  fireEvent.click(card);
  let button = app.getByLabelText("Continue");
  fireEvent.click(button);
  button = await app.findByLabelText("Continue with this card");
  fireEvent.click(button);
  await app.findByText("Invoice Settings");
  const name = app.getByLabelText("Full Name");
  const company = app.getByLabelText("Company Name");
  const billing = app.getByLabelText("Billing Email");
  const addressLine1 = app.getByPlaceholderText("Line 1");
  const city = app.getByPlaceholderText("City");
  const county = app.getByPlaceholderText("County");
  const postcode = app.getByPlaceholderText("Postcode");
  const vat = app.getByPlaceholderText("VAT Number");
  fireEvent.change(name, { target: { value: "Test Account" } });
  fireEvent.change(company, { target: { value: "Test Corp" } });
  fireEvent.change(billing, { target: { value: "test@test.com" } });
  fireEvent.change(addressLine1, { target: { value: "Bacon Street" } });
  fireEvent.change(city, { target: { value: "Test City" } });
  fireEvent.change(county, { target: { value: "Test County" } });
  fireEvent.change(postcode, { target: { value: "12345" } });
  fireEvent.change(vat, { target: { value: "12345" } });
  button = await app.findByLabelText("Continue");
  fireEvent.click(button);

  await app.findByText("Payment Terms");
  let accept = app.getByLabelText("I accept these payment terms");
  fireEvent.click(accept);
  button = await app.findByLabelText("Continue");
  fireEvent.click(button);

  let fixed = await app.findByLabelText("Projects - Predefined Projects", {
    exact: false,
  });
  fireEvent.click(fixed);
  let checkbox = await app.findByLabelText("I accept to be", { exact: false });
  fireEvent.click(checkbox);
  button = await app.findByLabelText("Continue");
  fireEvent.click(button);

  const tab = await app.findByText("Active Projects");
  expect(tab).toBeInTheDocument();
});
