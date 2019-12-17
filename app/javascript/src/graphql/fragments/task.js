import gql from "graphql-tag";

export default gql`
  fragment TaskFields on Task {
    id
    name
    stage
    trial
    dueDate
    estimate
    hoursWorked
    pricingType
    flexibleEstimate
    description
    createdAt
    repeat
  }
`;
