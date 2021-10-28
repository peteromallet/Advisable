import React from "react";
import { Box, Text } from "@advisable/donut";
import PassportAvatar from "../PassportAvatar";

export default function RequestConsultationHeader({ specialist }) {
  return (
    <Box textAlign="center" marginBottom={6}>
      <Box display="flex" justifyContent="center" marginBottom={3}>
        <PassportAvatar src={specialist.avatar} name={specialist.name} />
      </Box>
      <Text
        fontSize="4xl"
        fontWeight={600}
        marginBottom={2}
        letterSpacing="-0.03em"
      >
        Request a call with {specialist.firstName}
      </Text>
      <Text fontSize="lg" color="neutral800" lineHeight="24px" paddingX={4}>
        Schedule a 30 minute call with {specialist.firstName}. Please select
        your available times below.
      </Text>
    </Box>
  );
}
