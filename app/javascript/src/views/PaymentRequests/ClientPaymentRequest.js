import React from "react";
import { Heading, Box, Stack, Text, Avatar } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import ApprovePaymentRequest from "./ApprovePaymentRequest";
import DisputePaymentRequest from "./DisputePaymentRequest";
import PaymentRequestStatus from "./PaymentRequestStatus";
import { usePaymentRequest } from "./queries";
import CapturePayment from "./CapturePayment";
import currency from "src/utilities/currency";

export default function ClientPaymentRequest() {
  const { data, loading, error } = usePaymentRequest();

  if (loading) return <>loading...</>;
  if (error) return <>Something went wrong. Please try again.</>;

  const { status, specialist, lineItems, amount, adminFee, company } =
    data.paymentRequest;

  return (
    <>
      <Box marginBottom={4}>
        <BackButton to="/payment_requests" />
      </Box>
      <Box display="flex">
        <Box flex={1} paddingRight={12}>
          <Text
            size="6xl"
            marginBottom={4}
            lineHeight="40px"
            fontWeight={560}
            letterSpacing="-0.024em"
          >
            Payment request from {specialist.name}
          </Text>
          <Text fontSize="xl" lineHeight="28px" marginBottom={8}>
            Some text to explain to the client what to expect. Funds will be
            released to {specialist.name} immediately after paying.
          </Text>

          <Box>
            {["pending", "disputed"].includes(status) && (
              <ApprovePaymentRequest paymentRequest={data.paymentRequest} />
            )}
          </Box>

          {status === "approved" && (
            <CapturePayment paymentRequest={data.paymentRequest} />
          )}

          <Box>
            {status === "pending" && (
              <DisputePaymentRequest paymentRequest={data.paymentRequest} />
            )}
          </Box>
        </Box>
        <Box width="460px" flexShrink={0}>
          <Box bg="neutral100" padding={8} borderRadius="20px">
            <Text
              fontSize="lg"
              fontWeight={520}
              letterSpacing="-0.02em"
              marginBottom={6}
            >
              Summary
            </Text>
            <Box display="flex" alignItems="center" marginBottom={6}>
              <Avatar name={specialist.name} url={specialist.avatar} size="m" />
              <Box paddingLeft={3}>
                <Text fontWeight={560} marginBottom={1} fontSize="lg">
                  {specialist.name}
                </Text>
                <Text>{specialist.location}</Text>
              </Box>
            </Box>

            <Stack spacing={8} divider="neutral200">
              {lineItems.map((lineItem, index) => (
                <Box key={index} display="flex" justifyContent="space-between">
                  <Text color="neutral700">{lineItem.description}</Text>
                  <Text fontWeight={520}>{currency(lineItem.amount)}</Text>
                </Box>
              ))}

              <Box display="flex" justifyContent="space-between">
                <Text color="neutral700">Advisable fee</Text>
                <Text fontWeight={520}>
                  + {currency(data.paymentRequest.adminFee)}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text color="neutral700">Total</Text>
                <Text fontSize="3xl" fontWeight={600}>
                  {currency(amount + adminFee)}
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
