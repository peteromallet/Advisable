import { gql } from "@apollo/client";

export default gql`
  query bookingSetup($id: ID!) {
    currentCompany {
      id
    }
    viewer {
      ... on User {
        id
        name
        email
        paymentsSetup
        projectPaymentMethod
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
        paymentMethod {
          last4
          brand
          expMonth
          expYear
        }
        company {
          id
          name
        }
      }
    }
    application(id: $id) {
      id
      invoiceRate
      status
      project {
        id
      }
      specialist {
        id
        name
        firstName
        avatar
      }
    }
  }
`;
