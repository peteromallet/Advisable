import { fireEvent } from "@testing-library/react";
import { renderRoute } from "test-utils";
import mockData from "../../../../../__mocks__/graphqlFields";
import VIEWER from "../../../../../graphql/queries/viewer";
import { GET_DATA } from "../../../../../components/InvoiceSettingsFields";
import GET_PAYMENT_SETTINGS from "../getPaymentSettings";
import { UPDATE_INVOICE_SETTINGS } from "../queries";

test("user can update invoice settings", async () => {
  const user = mockData.user();

  const graphQLMocks = [
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
        query: GET_PAYMENT_SETTINGS,
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
          countries: [mockData.country()],
        },
      },
    },
    {
      request: {
        query: UPDATE_INVOICE_SETTINGS,
        variables: {
          input: {
            name: "John Doe",
            companyName: user.invoiceSettings.companyName,
            billingEmail: user.invoiceSettings.billingEmail,
            vatNumber: user.invoiceSettings.vatNumber,
            address: {
              line1: "",
              line2: "",
              city: "",
              state: "",
              country: 1,
              postcode: "",
            },
          },
        },
      },
      result: {
        data: {
          __typename: "MutationPayload",
          updateInvoiceSettings: {
            __typename: "UpdateProjectPaymentMethodPayload",
            user,
          },
        },
      },
    },
  ];

  const app = renderRoute({
    route: "/settings/payments",
    graphQLMocks,
  });

  const name = await app.findByLabelText("Full Name");
  fireEvent.change(name, { target: { value: "John Doe" } });
  const button = app.getByLabelText("Save Changes");
  fireEvent.click(button);
  await app.findByText("Your payment preferences have been updated");
});
