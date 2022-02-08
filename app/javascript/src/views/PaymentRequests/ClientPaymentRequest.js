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
import AdvisableProtection from "./AdvisableProtection";
import PaymentRequestStatusSummary from "./PaymentRequestStatusSummary";

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
            lineHeight="40px"
            fontWeight={560}
            letterSpacing="-0.024em"
          >
            Payment request from {specialist.name}
          </Text>

          <Box height="1px" bg="neutral100" marginY={6} />

          <PaymentRequestStatusSummary paymentRequest={data.paymentRequest} />

          <Box height="1px" bg="neutral100" marginY={8} />

          {status === "canceled" && (
            <PaymentRequestCancelled paymentRequest={data.paymentRequest} />
          )}

          {status === "paid" && (
            <PaymentRequestPaid paymentRequest={data.paymentRequest} />
          )}

          <AdvisableProtection />

          {status === "pending" && (
            <Box
              marginTop={8}
              paddingTop={6}
              borderTop="1px solid"
              borderColor="neutral100"
            >
              <DisputePaymentRequest paymentRequest={data.paymentRequest} />
            </Box>
          )}
        </Box>
        <Box width="460px" flexShrink={0} paddingBottom={8}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PaymentRequestSummary
              paymentRequest={data.paymentRequest}
              showClientFee
            />
          </motion.div>
        </Box>
      </Box>
    </>
  );
}
