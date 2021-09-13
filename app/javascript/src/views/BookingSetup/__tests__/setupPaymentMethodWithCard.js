import screenUser from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { mockData } from "test-utils";
import { renderRoute } from "../../../testHelpers/test-utils";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../../testHelpers/apolloMocks";
import GET_ACTIVE_APPLICATION from "../../Booking/getActiveApplication";
import GET_SETUP_DATA from "../getSetupData";
import { GET_DATA } from "../../../components/InvoiceSettingsFields";
import {
  UPDATE_INVOICE_SETTINGS,
  ACCEPT_PROJECT_PAYMENT_TERMS,
} from "../queries";
import START_WORKING from "../startWorking";

test("User can complete booking setup", async () => {
  const company = mockData.company({
    bankTransfersEnabled: true,
  });

  let user = mockData.user({
    company,
    paymentsSetup: false,
    paymentMethod: {
      __typename: "PaymentMethod",
      last4: "4444",
      brand: "visa",
      expMonth: "05",
      expYear: "2025",
    },
  });

  let project = mockData.project({ projectType: null, user });
  let specialist = mockData.specialist({
    firstName: "Dennis",
    account: mockData.account(),
  });
  let application = mockData.application({
    status: "Applied",
    id: "rec1234",
    project,
    specialist,
  });

  renderRoute({
    route: "/book/rec1234",
    graphQLMocks: [
      mockViewer(user),
      mockQuery(
        GET_SETUP_DATA,
        { id: "rec1234" },
        {
          viewer: user,
          application,
          currentCompany: company,
        },
      ),
      mockQuery(
        GET_DATA,
        {},
        {
          countries: [
            mockData.country({ code: "IE", name: "Ireland", eu: true }),
          ],
        },
      ),
      mockMutation(
        UPDATE_INVOICE_SETTINGS,
        { paymentMethod: "Card" },
        {
          updateInvoiceSettings: {
            __typename: "UpdateInvoiceSettingsPayload",
            user: {
              ...user,
              projectPaymentMethod: "Card",
            },
          },
        },
      ),
      mockMutation(
        UPDATE_INVOICE_SETTINGS,
        {
          name: "Test Account",
          companyName: "Test Corp",
          billingEmail: "test@test.com",
          address: {
            line1: "Bacon Street",
            line2: "",
            country: "IE",
            city: "Test City",
            state: "Test County",
            postcode: "12345",
          },
          vatNumber: "12345",
        },
        {
          updateInvoiceSettings: {
            __typename: "UpdateInvoiceSettingsPayload",
            user: {
              ...user,
              projectPaymentMethod: "Card",
            },
          },
        },
      ),
      mockMutation(
        ACCEPT_PROJECT_PAYMENT_TERMS,
        {
          exceptionalTerms: "",
        },
        {
          acceptProjectPaymentTerms: {
            __typename: "AcceptProjectPaymentTermsPayload",
            user: {
              ...user,
              paymentsSetup: true,
              projectPaymentMethod: "Card",
            },
          },
        },
      ),
      mockMutation(
        START_WORKING,
        {
          application: "rec1234",
          projectType: "Fixed",
          monthlyLimit: null,
        },
        {
          startWorking: {
            __typename: "StartWorkingPayload",
            application: {
              ...application,
              projectType: "Fixed",
            },
          },
        },
      ),
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

  // payment method
  screenUser.click(await screen.findByLabelText(/payments via card/i));
  screenUser.click(await screen.findByLabelText("Continue"));

  // invoice settings
  screenUser.clear(await screen.findByLabelText(/full name/i));
  screenUser.type(await screen.findByLabelText(/full name/i), "Test Account");
  screenUser.clear(await screen.findByLabelText(/company name/i));
  screenUser.type(await screen.findByLabelText(/company name/i), "Test Corp");
  screenUser.clear(await screen.findByLabelText(/billing email/i));
  screenUser.type(
    await screen.findByLabelText(/billing email/i),
    "test@test.com",
  );
  screenUser.type(
    await screen.findByPlaceholderText(/line 1/i),
    "Bacon Street",
  );
  screenUser.type(await screen.findByPlaceholderText(/city/i), "Test City");
  screenUser.type(await screen.findByPlaceholderText(/state/i), "Test County");
  screenUser.selectOptions(await screen.findByLabelText(/country/i), ["IE"]);
  screenUser.type(await screen.findByPlaceholderText(/postcode/i), "12345");
  screenUser.clear(await screen.findByLabelText(/vat/i));
  screenUser.type(await screen.findByLabelText(/vat/i), "12345");
  screenUser.click(await screen.findByLabelText(/continue/i));
  // payment terms
  screenUser.click(await screen.findByLabelText(/i accept/i));
  screenUser.click(await screen.findByLabelText(/continue/i));
  // project type
  screenUser.click(await screen.findByLabelText(/predefined projects/i));
  screenUser.click(await screen.findByLabelText(/i accept/i));
  screenUser.click(await screen.findByLabelText(/continue/i));

  await screen.findByText("Active Projects");
});
