import { gql } from "@apollo/client";

export default gql`
  query getPaymentSettings {
    viewer {
      ... on User {
        id
        projectPaymentMethod
        name
        companyName
        country {
          id
        }
        company {
          id
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
