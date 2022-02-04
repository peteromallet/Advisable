import React from "react";
import { motion } from "framer-motion";
import { Box, Text } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import ApprovePaymentRequest from "./ApprovePaymentRequest";
import DisputePaymentRequest from "./DisputePaymentRequest";
import { usePaymentRequest } from "./queries";
import CapturePayment from "./CapturePayment";
import PaymentRequestPaid from "./PaymentRequestPaid";
import PaymentRequestCancelled from "./PaymentRequestCancelled";
import PaymentRequestSummary from "./PaymentRequestSummary";

export default function ClientPaymentRequest() {
  const { data, loading, error } = usePaymentRequest();

  if (loading) return <>loading...</>;
  if (error) return <>Something went wrong. Please try again.</>;

  const { status, specialist } = data.paymentRequest;

  return (
    <>
      <Box marginBottom={5}>
        <BackButton to="/payment_requests" />
      </Box>
      <Box display="flex">
        <Box
          as={motion.div}
          flex={1}
          paddingRight={12}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PaymentRequestSummary paymentRequest={data.paymentRequest} />
          </motion.div>
        </Box>
      </Box>
    </>
  );
}
