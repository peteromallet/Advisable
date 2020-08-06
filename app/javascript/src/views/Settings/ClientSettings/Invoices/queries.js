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

export const GET_INVOICE = gql`
  query getInvoice($id: ID!) {
    invoice(id: $id) {
      # Head
      createdAt
      number
      status
      # Billed to
      customerName
      customerAddress {
        city
        country
        line1
        line2
        postcode
        state
      }
      # Note
      description
      # Title
      lineItems {
        id
        title
        quantity
        unitPrice
      }
      # Amount Due
      amount
      # Buttons
      downloadUrl
      paymentUrl
    }
  }
`;

export const useGetInvoices = (id) =>
  useQuery(GET_INVOICE, { variables: { id } });
