import gql from "graphql-tag";

export default gql`
  query getPaymentIntent($id: ID!) {
    viewer {
      ... on User {
        id
        paymentMethod {
          id
          last4
          brand
          expMonth
          expYear
        }
      }
    }
    project(id: $id) {
      id
      depositOwed
      user {
        id
      }
      depositPaymentIntent {
        secret
      }
    }
  }
`;
