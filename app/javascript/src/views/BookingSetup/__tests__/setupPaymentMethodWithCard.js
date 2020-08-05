import screenUser from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderRoute } from "../../../testHelpers/test-utils";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../../testHelpers/apolloMocks";
import generateTypes from "../../../__mocks__/graphqlFields";
import GET_ACTIVE_APPLICATION from "../../Booking/getActiveApplication";
import GET_SETUP_DATA from "../getSetupData";
import { GET_PAYMENT_METHOD } from "../CardDetails";
import { GET_DATA } from "../../../components/InvoiceSettingsFields";
import UPDATE_PROJECT_PAYMENT_METHOD from "../updateProjectPaymentMethod";
import START_WORKING from "../startWorking";
import graphqlFields from "../../../__mocks__/graphqlFields";

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

  renderRoute({
    route: "/book/rec1234",
    graphQLMocks: [
      mockViewer(user),
      mockQuery(
        GET_SETUP_DATA,
        { id: "rec1234" },
        { viewer: user, application },
      ),
      mockMutation(
        UPDATE_PROJECT_PAYMENT_METHOD,
        { paymentMethod: "Card" },
        {
          updateProjectPaymentMethod: {
            __typename: "UpdateProjectPaymentMethodPayload",
            user: {
              ...user,
              projectPaymentMethod: "Card",
            },
          },
        },
      ),
      mockQuery(GET_PAYMENT_METHOD, {}, { viewer: user }),
      mockQuery(
        GET_DATA,
        {},
        { countries: [graphqlFields.country({ eu: true })] },
      ),
      mockMutation(
        UPDATE_PROJECT_PAYMENT_METHOD,
        {
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
        {
          updateProjectPaymentMethod: {
            __typename: "UpdateProjectPaymentMethodPayload",
            user: {
              ...user,
              projectPaymentMethod: "Card",
            },
          },
        },
      ),
      mockMutation(
        UPDATE_PROJECT_PAYMENT_METHOD,
        {
          acceptTerms: true,
          exceptionalTerms: "",
        },
        {
          updateProjectPaymentMethod: {
            __typename: "UpdateProjectPaymentMethodPayload",
            user: {
              ...user,
              paymentsSetup: true,
              projectPaymentMethod: "Card",
            },
          },
        },
      ),
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

  screenUser.click(await screen.findByLabelText(/payments with card/i));
  screenUser.click(await screen.findByLabelText("Continue"));
  screenUser.click(await screen.findByLabelText(/continue with this card/i));
  // invoice settings
  screenUser.type(await screen.findByLabelText(/full name/i), "Test Account");
  screenUser.type(await screen.findByLabelText(/company name/i), "Test Corp");
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
  screenUser.type(await screen.findByPlaceholderText(/postcode/i), "12345");
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
