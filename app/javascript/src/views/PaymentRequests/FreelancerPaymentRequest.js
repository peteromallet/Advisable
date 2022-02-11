import React from "react";
import { motion } from "framer-motion";
import { Box, Text } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import { usePaymentRequest } from "./queries";
import PaymentRequestSummary from "./PaymentRequestSummary";
import AdvisableProtection from "./AdvisableProtection";
import PaymentRequestStatusSummary from "./PaymentRequestStatusSummary";
import { Loading } from "src/components";

export default function FreelancerPaymentRequest() {
  const { data, loading, error } = usePaymentRequest();

  if (loading) return <Loading />;
  if (error) return <>Something went wrong. Please try again.</>;

  const { company } = data.paymentRequest;

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
            Payment request to {company.name}
          </Text>

          <Box height="1px" bg="neutral100" marginY={6} />

          <PaymentRequestStatusSummary paymentRequest={data.paymentRequest} />

          <Box height="1px" bg="neutral100" marginY={8} />

          <AdvisableProtection />
        </Box>
        <Box width="460px" flexShrink={0} paddingBottom={8}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PaymentRequestSummary
              paymentRequest={data.paymentRequest}
              showFreelancerFee
            />
          </motion.div>
        </Box>
      </Box>
    </>
  );
}
