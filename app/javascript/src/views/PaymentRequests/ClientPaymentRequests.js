import React from "react";
import { DateTime } from "luxon";
import Table from "./Table";
import { Heading, Box, Text, Button } from "@advisable/donut";
import { useClientPaymentRequests } from "./queries";
import currency from "src/utilities/currency";
import PaymentRequestStatus from "./PaymentRequestStatus";
import NoPaymentRequests from "./NoPaymentRequests";
import { Loading } from "src/components";

export default function ClientPaymentRequests() {
  const { data, loading, error, fetchMore } = useClientPaymentRequests();

  if (loading) return <Loading />;
  if (error) return <>Something went wrong, please try again.</>;
  const paymentRequests = data.paymentRequests.edges.map((e) => e.node);
  const pageInfo = data.paymentRequests.pageInfo;

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
      },
    });
  };

  return (
    <Box>
      <h2 className="text-3xl font-semibold tracking-tight mb-6">Payments</h2>
      <Table>
        <Table.Header>
          <Table.HeaderCell className="flex-1">Name</Table.HeaderCell>
          <Table.HeaderCell className="hidden md:block w-[140px]">
            Sent
          </Table.HeaderCell>
          <Table.HeaderCell className="hidden md:block w-[120px]">
            Status
          </Table.HeaderCell>
          <Table.HeaderCell width="120px" textAlign="right">
            Amount
          </Table.HeaderCell>
        </Table.Header>
        {paymentRequests.length === 0 && (
          <NoPaymentRequests>
            You have not received any payment requests yet
          </NoPaymentRequests>
        )}
        {paymentRequests.map((pr) => (
          <Table.Row key={pr.id} to={`/payment_requests/${pr.id}`}>
            <Table.Cell className="flex-1">
              <Text
                fontSize="lg"
                fontWeight={520}
                color="neutral900"
                letterSpacing="-0.01em"
              >
                {pr.specialist.name}
              </Text>
            </Table.Cell>
            <Table.Cell className="hidden md:block w-[140px]">
              <Box width="140px" color="neutral600" fontSize="sm">
                {DateTime.fromISO(pr.createdAt).toFormat("dd LLL yyyy")}
              </Box>
            </Table.Cell>
            <Table.Cell className="hidden md:block w-[120px]">
              <PaymentRequestStatus status={pr.status} />
            </Table.Cell>
            <Table.Cell width="120px" textAlign="right">
              <Text fontWeight={560} color="neutral900">
                {currency(pr.amount + pr.adminFee, { format: "$0,0.00" })}
              </Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
      {pageInfo.hasNextPage && (
        <div className="text-center py-8">
          <Button variant="secondary" onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </Box>
  );
}
