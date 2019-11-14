import gql from "graphql-tag";

export default gql`
  query bookingSetup($id: ID!) {
    viewer {
      ... on User {
        id
        paymentsSetup
        projectPaymentMethod
        bankTransfersEnabled
      }
    }
    application(id: $id) {
      id
      airtableId
      rate
      status
      specialist {
        id
        name
        firstName
        avatar
      }
    }
  }
`;
