import { useQuery } from "@apollo/client";
import INVOICES from "./invoices.gql";

export function useInvoices() {
  return useQuery(INVOICES);
}
