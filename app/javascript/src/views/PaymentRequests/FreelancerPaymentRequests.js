import React from "react";
import { Link } from "react-router-dom";
import { Heading, Box, Text, Button } from "@advisable/donut";
import { useFreelancerPaymentRequests } from "./queries";
import currency from "src/utilities/currency";
import { DateTime } from "luxon";
import { PlusSm } from "@styled-icons/heroicons-solid";
import Table from "./Table";
import PaymentRequestStatus from "./PaymentRequestStatus";

export default function FreelancerPaymentRequests() {
  const { data, loading, error, fetchMore } = useFreelancerPaymentRequests();

  if (loading) return <>Loading...</>;
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={12}
      >
        <Heading size="5xl">Payments</Heading>
        <Link to="/payment_requests/new">
          <Button variant="gradient" prefix={<PlusSm />}>
            Request payment
          </Button>
        </Link>
      </Box>
      <Table>
        <Table.Header>
          <Table.HeaderCell flex={1}>Client</Table.HeaderCell>
          <Table.HeaderCell width="140px">Sent</Table.HeaderCell>
          <Table.HeaderCell width="120px">Status</Table.HeaderCell>
          <Table.HeaderCell width="120px" textAlign="right">
            Amount
          </Table.HeaderCell>
        </Table.Header>
        {paymentRequests.map((pr) => (
          <Table.Row key={pr.id} to={`/payment_requests/${pr.id}`}>
            <Table.Cell flex={1}>
              <Text
                fontSize="lg"
                fontWeight={520}
                color="neutral900"
                letterSpacing="-0.01em"
              >
                {pr.company.name}
              </Text>
            </Table.Cell>
            <Table.Cell width="140px">
              <Box width="140px" color="neutral600" fontSize="sm">
                {DateTime.fromISO(pr.createdAt).toFormat("dd LLL yyyy")}
              </Box>
            </Table.Cell>
            <Table.Cell width="120px">
              <PaymentRequestStatus paymentRequest={pr} />
            </Table.Cell>
            <Table.Cell width="120px" textAlign="right">
              <Text fontWeight={560} color="neutral900">
                {currency(pr.amount, {
                  format: "$0,0.00",
                })}
              </Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
      {pageInfo.hasNextPage && (
        <Box textAlign="center" paddingY={8}>
          <Button variant="secondary" onClick={handleLoadMore}>
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}
