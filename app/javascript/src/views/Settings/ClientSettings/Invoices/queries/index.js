import { useQuery } from "@apollo/client";
import INVOICE from "./invoiceDetails.gql";
import INVOICES from "./invoices.gql";
export default { INVOICES, INVOICE };

export function useInvoices() {
  return useQuery(INVOICES);
}

export function useInvoice(month) {
  return useQuery(INVOICE, { variables: { month } });
}
