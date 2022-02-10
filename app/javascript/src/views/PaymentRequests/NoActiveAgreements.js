import React from "react";
import { Box, Text } from "@advisable/donut";

export default function NoActiveAgreements() {
  return (
    <Box
      padding={8}
      border="2px solid"
      borderColor="neutral100"
      borderRadius="16px"
    >
      <Text fontSize="lg" fontWeight={520} marginBottom={1}>
        No active clients
      </Text>
      <Text lineHeight="24px">
        You dont&apos;t have any active clients to request payment from.
      </Text>
    </Box>
  );
}
