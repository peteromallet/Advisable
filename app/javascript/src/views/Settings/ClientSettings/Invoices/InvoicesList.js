import React from "react";
import { InformationCircle } from "@styled-icons/heroicons-solid";
import { Heading, Notice, Link, Card, Stack } from "@advisable/donut";
import InvoiceSummary from "./InvoiceSummary";
import { useInvoices } from "./queries";

export default function InvoicesList() {
  const { data, error } = useInvoices();

  if (error) {
    return <>Something went wrong</>;
  }

  const invoices = data?.currentCompany?.invoices?.nodes || [];

  return (
    <Card padding={8} borderRadius="12px">
      <Heading marginBottom={6}>Invoices</Heading>
      {invoices.length > 0 && (
        <Stack divider="neutral100" marginBottom={4}>
          {invoices.map((invoice) => (
            <InvoiceSummary key={invoice.id} invoice={invoice} />
          ))}
        </Stack>
      )}
      <Notice icon={<InformationCircle />}>
        We have recently moved to a new invoicing system. If you are looking for
        an older invoice you can find them{" "}
        <Link to="/settings/invoices/old">here</Link>.
      </Notice>
    </Card>
  );
}
