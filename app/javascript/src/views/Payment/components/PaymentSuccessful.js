import React from "react";
import { Box, Text } from "@advisable/donut";
import { BadgeCheck } from "@styled-icons/heroicons-solid/BadgeCheck";

export default function PaymentSuccessful() {
  return (
    <Box textAlign="center">
      <Box color="blue500" marginBottom={1}>
        <BadgeCheck size={40} />
      </Box>
      <Text fontSize="sm" fontWeight={450} color="blue400">
        Paid
      </Text>
    </Box>
  );
}
