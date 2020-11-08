import { fireEvent } from "@testing-library/react";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "src/testHelpers/apolloMocks";
import { renderRoute, mockData } from "src/testHelpers/test-utils";
import { GET_ADDRESS_FIELDS_DATA } from "../../../../components/AddressFields";
import {
  GET_PAYMENT_SETTINGS,
  UPDATE_PAYMENT_SETTINGS,
} from "../../../../components/UpdatePaymentSettingsForm/queries";

const specialist = mockData.specialist();

test("update specialist's payment settings", async () => {
  const currency = mockData.currency();
  const country = mockData.country();
  const vatNumber = "123123123";
  const bankHolderAddress = mockData.bankHolderAddress();
  const updatedSpecialist = mockData.specialist({
    ...specialist,
    bankHolderAddress,
    bankCurrency: currency.isoCode,
    bankHolderName: specialist.name,
    hasSetupPayments: true,
    vatNumber,
  });
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      GET_PAYMENT_SETTINGS,
      {},
      { viewer: specialist, currencies: [currency] },
    ),
    mockQuery(GET_ADDRESS_FIELDS_DATA, {}, { countries: [country] }),
    mockMutation(
      UPDATE_PAYMENT_SETTINGS,
      {
        bankHolderName: specialist.name,
        bankCurrency: currency.isoCode,
        vatNumber,
        bankHolderAddress: {
          city: "Dublin",
          country: "IE",
          line1: "ave Some 123",
          line2: "",
          postcode: "02123",
          state: "",
        },
      },
      {
        updatePaymentSettings: {
          __typename: "UpdatePaymentSettingsPayload",
          specialist: updatedSpecialist,
        },
      },
    ),
  ];
  const app = renderRoute({
    route: `/settings/payment-settings`,
    graphQLMocks,
  });
  await app.findByText(/payment settings/i);
  fireEvent.change(
    await app.findByPlaceholderText("Full name or company name..."),
    {
      target: { value: specialist.name },
    },
  );
  fireEvent.change(await app.findByPlaceholderText("Line 1"), {
    target: { value: bankHolderAddress.line1 },
  });
  fireEvent.change(await app.findByPlaceholderText("City"), {
    target: { value: bankHolderAddress.city },
  });
  fireEvent.change(await app.findByTestId("countryInput"), {
    target: { value: country.code },
  });
  fireEvent.change(await app.findByPlaceholderText("Postcode"), {
    target: { value: bankHolderAddress.postcode },
  });
  fireEvent.change(await app.findByTestId("bankCurrency"), {
    target: { value: currency.code },
  });
  fireEvent.change(await app.findByPlaceholderText(/vat number/i), {
    target: { value: vatNumber },
  });
  fireEvent.click(app.getByLabelText(/save changes/i));
  await app.findByText(/have been updated/i);
});
