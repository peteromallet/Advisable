import React from "react";
import css from "@styled-system/css";
import { Link } from "react-router-dom";
import { Heading, Box, Text, Badge, Button } from "@advisable/donut";
import { usePaymentRequests } from "./queries";
import currency from "src/utilities/currency";
import { DateTime } from "luxon";
import { PlusSm } from "@styled-icons/heroicons-solid";

function HeaderCell({ children, ...props }) {
  return (
    <Box fontSize="sm" color="neutral600" {...props}>
      {children}
    </Box>
  );
}

const STATUSES = {
  pending: "neutral",
  paid: "cyan",
  approved: "cyan",
  disputed: "orange",
};

export default function FreelancerPaymentRequests() {
  const { data, loading, error, fetchMore } = usePaymentRequests();

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
        <Button variant="gradient" prefix={<PlusSm />}>
          Request payment
        </Button>
      </Box>
      <Box display="flex" paddingBottom={4}>
        <HeaderCell flex={1}>Client</HeaderCell>
        <HeaderCell width="140px">Sent</HeaderCell>
        <HeaderCell width="120px">Status</HeaderCell>
        <HeaderCell width="120px" textAlign="right">
          Amount
        </HeaderCell>
      </Box>
      <Box height="1px" bg="neutral100" />
      {paymentRequests.map((paymentRequest) => (
        <Box key={paymentRequest.id}>
          <Link to={`/payment_requests/${paymentRequest.id}`}>
            <Box
              marginY={1}
              paddingY={3}
              display="flex"
              alignItems="center"
              css={css({
                borderRadius: "12px",
                paddingX: 3,
                marginX: "-12px",
                "&:hover": {
                  bg: "neutral50",
                },
              })}
            >
              <Box flex={1}>
                <Text
                  fontSize="lg"
                  fontWeight={520}
                  color="neutral900"
                  letterSpacing="-0.01em"
                >
                  {paymentRequest.company.name}
                </Text>
              </Box>
              <Box width="140px" color="neutral600" fontSize="sm">
                {DateTime.fromISO(paymentRequest.createdAt).toFormat(
                  "dd LLL yyyy",
                )}
              </Box>
              <Box width="120px">
                <Badge variant={STATUSES[paymentRequest.status]}>
                  {paymentRequest.status}
                </Badge>
              </Box>
              <Box width="120px" textAlign="right">
                <Text fontWeight={560} color="neutral900">
                  {currency(paymentRequest.amount, {
                    format: "$0,0.00",
                  })}
                </Text>
              </Box>
            </Box>
          </Link>
          <Box height="1px" bg="neutral100" />
        </Box>
      ))}
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
