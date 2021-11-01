import React from "react";
import { Box, Text } from "@advisable/donut";

export default function RequestConsultationHeader({ specialist }) {
  return (
    <Box marginBottom={6}>
      <Text
        fontSize="4xl"
        fontWeight={600}
        marginBottom={2}
        letterSpacing="-0.03em"
      >
        Request a call with {specialist.firstName}
      </Text>
      <Text fontSize="lg" color="neutral800" lineHeight="24px">
        Schedule a 30 minute call with {specialist.firstName}. Please select
        your available times below.
      </Text>
    </Box>
  );
}
