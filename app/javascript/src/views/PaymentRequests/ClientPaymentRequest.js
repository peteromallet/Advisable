import React from "react";
import { Box, Stack, Text, Avatar } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import ApprovePaymentRequest from "./ApprovePaymentRequest";
import DisputePaymentRequest from "./DisputePaymentRequest";
import { usePaymentRequest } from "./queries";
import CapturePayment from "./CapturePayment";
import currency from "src/utilities/currency";
import PaymentRequestPaid from "./PaymentRequestPaid";
import PaymentRequestCancelled from "./PaymentRequestCancelled";

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

          {status === "disputed" && (
            <Box>
              <Text
                fontSize="l"
                fontWeight={560}
                letterSpacing="-0.02em"
                marginBottom={2}
              >
                Payment request disputed
              </Text>
              <Text lineHeight="24px">
                This payment request has been disputed.
              </Text>
            </Box>
          )}

          {status === "canceled" && (
            <PaymentRequestCancelled paymentRequest={data.paymentRequest} />
          )}

          {status === "paid" && (
            <PaymentRequestPaid paymentRequest={data.paymentRequest} />
          )}

          <Box>
            {status === "pending" && (
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
          <Box
            bg="neutral100"
            padding={8}
            borderRadius="24px"
            paddingBottom={10}
          >
            <Box display="flex" alignItems="center" marginBottom={8}>
              <Avatar name={specialist.name} url={specialist.avatar} size="m" />
              <Box paddingLeft={3}>
                <Text fontWeight={560} marginBottom={1} fontSize="lg">
                  {specialist.name}
                </Text>
                <Text>{specialist.location}</Text>
              </Box>
            </Box>

            <Stack spacing={8} divider="neutral200">
              <Text fontSize="lg" fontWeight={520} letterSpacing="-0.02em">
                Summary
              </Text>

              {lineItems.map((lineItem, index) => (
                <Box key={index} display="flex" justifyContent="space-between">
                  <Text color="neutral800">{lineItem.description}</Text>
                  <Text fontWeight={560}>{currency(lineItem.amount)}</Text>
                </Box>
              ))}

              <Box display="flex" justifyContent="space-between">
                <Text color="neutral800">Advisable fee</Text>
                <Text fontWeight={560}>
                  + {currency(data.paymentRequest.adminFee)}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text color="neutral800">Total</Text>
                <Text fontSize="4xl" fontWeight={600}>
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
