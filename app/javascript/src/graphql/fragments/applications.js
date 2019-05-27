import gql from "graphql-tag";

export const applicationFields = gql`
  fragment applicationFields on Application {
    id
    rate
    status
    airtableId
    projectType
    monthlyLimit
  }
`;
