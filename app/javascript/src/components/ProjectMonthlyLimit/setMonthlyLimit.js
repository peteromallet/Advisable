import gql from "graphql-tag";

export default gql`
  mutation SetMonthlyLimit($input: SetMonthlyLimitInput!) {
    setMonthlyLimit(input: $input) {
      application {
        id
        monthlyLimit
      }
    }
  }
`;
