import { gql } from "@apollo/client";

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
