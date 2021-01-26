import { gql } from "@apollo/client";

export default gql`
  query bookingSetup($id: ID!) {
    viewer {
      ... on User {
        id
        name
        email
        paymentsSetup
        projectPaymentMethod
        bankTransfersEnabled
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
      rate
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
