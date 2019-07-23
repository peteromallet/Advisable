import gql from "graphql-tag";

const paymentSettingsFields = gql`
  fragment paymentSettingsFields on Specialist {
    id
    name
    hasSetupPayments
    bankHolderName
    bankCurrency
    vatNumber
    bankHolderAddress {
      line1
      line2
      city
      state
      country
      postcode
    }
    country {
      id
      currency {
        isoCode
      }
    }
  }
`;

export const GET_PAYMENT_SETTINGS = gql`
  ${paymentSettingsFields}

  query {
    viewer {
      ... on Specialist {
        ...paymentSettingsFields
      }
    }
    currencies {
      isoCode
      name
    }
  }
`;

export const UPDATE_PAYMENT_SETTINGS = gql`
  ${paymentSettingsFields}

  mutation updatePaymentSettings($input: UpdatePaymentSettingsInput!) {
    updatePaymentSettings(input: $input) {
      specialist {
        ...paymentSettingsFields
      }
    }
  }
`;
