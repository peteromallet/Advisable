import { gql } from "@apollo/client";

export const applicationFields = gql`
  fragment applicationFields on Application {
    id
    invoiceRate
    status
    projectType
    monthlyLimit
  }
`;
