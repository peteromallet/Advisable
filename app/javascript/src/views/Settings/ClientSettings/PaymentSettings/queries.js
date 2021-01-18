import { gql } from "@apollo/client";

export const UPDATE_INVOICE_SETTINGS = gql`
  mutation updateInvoiceSettings($input: UpdateInvoiceSettingsInput!) {
    updateInvoiceSettings(input: $input) {
      user {
        id
        paymentsSetup
        invoiceSettings {
          name
          vatNumber
          companyName
          billingEmail
          address {
            line1
            line2
            city
            state
            country
            postcode
          }
        }
      }
    }
  }
`;
