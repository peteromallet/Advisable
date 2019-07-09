import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on User {
        id
        name
        customer {
          name
          email
        }
        paymentMethod {
          id
          name
        }
      }
    }
  }
`;
