import gql from "graphql-tag";

export default gql`
  query getPaymentSettings {
    viewer {
      ... on User {
        id
        projectPaymentMethod
        name
        companyName
        bankTransfersEnabled
        country {
          id
        }
        invoiceSettings {
          name
          companyName
          billingEmail
          vatNumber
          address {
            line1
            line2
            city
            state
            country
            postcode
          }
        }
        paymentMethod {
          id
          brand
          last4
          expMonth
          expYear
        }
      }
    }
  }
`;
