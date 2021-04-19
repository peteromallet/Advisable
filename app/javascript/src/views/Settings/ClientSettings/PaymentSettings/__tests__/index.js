import { fireEvent } from "@testing-library/react";
import { renderRoute, mockData } from "test-utils";
import VIEWER from "../../../../../graphql/queries/getViewer.graphql";
import { GET_DATA } from "../../../../../components/InvoiceSettingsFields";
import GET_PAYMENT_SETTINGS from "../getPaymentSettings";
import { UPDATE_INVOICE_SETTINGS } from "../queries";

test("user can update invoice settings", async () => {
  const company = mockData.company();
  const country = mockData.country();

  const user = mockData.user({
    projectPaymentMethod: "Card",
  });

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
          currentCompany: company,
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
          countries: [country],
        },
      },
    },
    {
      request: {
        query: UPDATE_INVOICE_SETTINGS,
        variables: {
          input: {
            name: "John Doe",
            paymentMethod: "Card",
            companyName: user.invoiceSettings.companyName,
            billingEmail: user.invoiceSettings.billingEmail,
            vatNumber: user.invoiceSettings.vatNumber,
            address: {
              line1: "",
              line2: "",
              city: "",
              state: "",
              country: country.id,
              postcode: "",
            },
          },
        },
      },
      result: {
        data: {
          __typename: "MutationPayload",
          updateInvoiceSettings: {
            __typename: "UpdateInvoiceSettingsPayload",
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
