import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const QUERY_INVOICES = gql`
  query getInvoices {
    viewer {
      ... on User {
        id
        invoices {
          id
          number
          createdAt
          status
          amount
        }
      }
    }
  }
`;

export const useInvoices = () => useQuery(QUERY_INVOICES);
