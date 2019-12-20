import gql from "graphql-tag";

export default gql`
  fragment TaskFields on Task {
    id
    name
    stage
    trial
    dueDate
    estimate
    finalCost
    estimateType
    flexibleEstimate
    description
    createdAt
    repeat
  }
`;
