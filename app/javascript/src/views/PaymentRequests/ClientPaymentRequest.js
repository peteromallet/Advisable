import React from "react";
import { motion } from "framer-motion";
import { Box, Text } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import DisputePaymentRequest from "./DisputePaymentRequest";
import { usePaymentRequest } from "./queries";
import PaymentRequestSummary from "./PaymentRequestSummary";
import AdvisableProtection from "./AdvisableProtection";
import PaymentRequestStatusSummary from "./PaymentRequestStatusSummary";
import { Loading } from "src/components";

export default function ClientPaymentRequest() {
  const { data, loading, error } = usePaymentRequest();

  if (loading) return <Loading />;
  if (error) return <>Something went wrong. Please try again.</>;

  const { status, specialist } = data.paymentRequest;

  return (
    <>
      <Box marginBottom={5}>
        <BackButton to="/payment_requests" />
      </Box>
      <div className="flex flex-col-reverse md:flex-row">
        <motion.div
          className="flex-1 pr-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl mb-4 font-semibold tracking-tight">
            Payment request from {specialist.name}
          </h2>

          <div className="h-px bg-neutral100 my-6" />

          <PaymentRequestStatusSummary paymentRequest={data.paymentRequest} />

          <div className="h-px bg-neutral100 my-8" />

          <AdvisableProtection />
        </motion.div>
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
      </div>
    </>
  );
}
