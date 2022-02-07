import React from "react";
import currency from "src/utilities/currency";
import { Box, Stack, Text, Avatar } from "@advisable/donut";
import PaymentRequestStatus from "./PaymentRequestStatus";
import { DateTime } from "luxon";

export default function PaymentRequestSummary({ paymentRequest }) {
  const { specialist, lineItems, amount, adminFee, createdAt, dueAt } =
    paymentRequest;

  return (
    <Box
      bg="white"
      padding={8}
      borderRadius="24px"
      paddingBottom={12}
      position="relative"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
    >
      <Box position="absolute" right="20px" top="20px">
        <PaymentRequestStatus paymentRequest={paymentRequest} />
      </Box>
      <Box display="flex" alignItems="center" marginBottom={8}>
        <Avatar name={specialist.name} url={specialist.avatar} size="m" />
        <Box paddingLeft={3}>
          <Text fontWeight={560} marginBottom={1} fontSize="xl">
            {specialist.name}
          </Text>
          <Text>{specialist.location}</Text>
        </Box>
      </Box>

      <Stack spacing={8} divider="neutral100">
        <Text fontSize="xl" fontWeight={520} letterSpacing="-0.02em">
          Summary
        </Text>

        <Box display="flex" justifyContent="space-between">
          <Text color="neutral800">Issued</Text>
          <Text fontWeight={480} color="neutral600">
            {DateTime.fromISO(createdAt).toFormat("dd MMM yyyy")}
          </Text>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text color="neutral800">Due</Text>
          <Text fontWeight={480} color="neutral600">
            {DateTime.fromISO(dueAt).toFormat("dd MMM yyyy")}
          </Text>
        </Box>

        {lineItems.map((lineItem, index) => (
          <Box key={index} display="flex" justifyContent="space-between">
            <Text color="neutral800">{lineItem.description}</Text>
            <Text fontWeight={560} fontSize="l">
              {currency(lineItem.amount)}
            </Text>
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between">
          <Text color="neutral800">Advisable fee</Text>
          <Text fontWeight={560} fontSize="l">
            + {currency(paymentRequest.adminFee)}
          </Text>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text color="neutral800">Total</Text>
          <Text fontSize="5xl" fontWeight={600}>
            {currency(amount + adminFee)}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
