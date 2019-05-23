import gql from "graphql-tag";

export const taskFields = gql`
  fragment taskFields on Task {
    id
    name
    stage
    dueDate
    estimate
    hoursWorked
    flexibleEstimate
    description
    createdAt
    repeat
  }
`;
