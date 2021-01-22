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

export const ACCEPT_PROJECT_PAYMENT_TERMS = gql`
  mutation acceptProjectPaymentTerms($input: AcceptProjectPaymentTermsInput!) {
    acceptProjectPaymentTerms(input: $input) {
      user {
        id
        paymentsSetup
      }
    }
  }
`;
