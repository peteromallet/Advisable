import gql from "graphql-tag";

export default gql`
  fragment TaskFields on Task {
    id
    name
    stage
    dueDate
    estimate
    flexibleEstimate
    description
    createdAt
    repeat
  }
`;
