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
    flexibleEstimate
    description
    createdAt
    repeat
  }
`;
