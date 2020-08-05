import { gql } from "@apollo/client";

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
