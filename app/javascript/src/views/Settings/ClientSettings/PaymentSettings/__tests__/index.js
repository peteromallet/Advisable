import { fireEvent } from "@testing-library/react";
import { renderRoute } from "test-utils";
import mockData from "../../../../../__mocks__/graphqlFields";
import VIEWER from "../../../../../graphql/queries/viewer";
import { GET_DATA } from "../../../../../components/InvoiceSettingsFields";
import GET_PAYMENT_SETTINGS from "../getPaymentSettings";
import UPDATE_PAYMENT_SETTINGS from "../updateProjectPaymentMethod";

test("Bank transer option is disabled if bankTransfersEnabled is false", async () => {
  const user = mockData.user({ bankTransfersEnabled: false });

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
        query: GET_PAYMENT_SETTINGS,
      },
      result: {
        data: {
          viewer: user,
        },
      },
    },
  ];

  const app = renderRoute({
    route: "/settings/payments",
    graphQLMocks,
  });

  const bankTranser = await app.findByLabelText("Payments via bank transfer", {
    exact: false,
  });

  expect(bankTranser.disabled).toBeTruthy();
});

test("Bank transer option is enabled if bankTransfersEnabled is true", async () => {
  const user = mockData.user({ bankTransfersEnabled: true });

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
        query: GET_PAYMENT_SETTINGS,
      },
      result: {
        data: {
          viewer: user,
        },
      },
    },
  ];

  const app = renderRoute({
    route: "/settings/payments",
    graphQLMocks,
  });

  const bankTranser = await app.findByLabelText("Payments via bank transfer", {
    exact: false,
  });

  expect(bankTranser.disabled).toBeFalsy();
});

test("user can update invoice settings", async () => {
  const user = mockData.user({
    bankTransfersEnabled: true,
    projectPaymentMethod: "Bank Transfer",
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
        query: UPDATE_PAYMENT_SETTINGS,
        variables: {
          input: {
            paymentMethod: "Bank Transfer",
            invoiceSettings: {
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
      },
      result: {
        data: {
          __typename: "MutationPayload",
          updateProjectPaymentMethod: {
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
  const notice = await app.findByText(
    "Your payment preferences have been updated",
  );
  expect(notice).toBeInTheDocument();
});
