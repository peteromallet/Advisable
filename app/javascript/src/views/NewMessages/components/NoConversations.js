import React from "react";
import { Box, Text } from "@advisable/donut";
import illustration from "src/illustrations/messages.svg";

export default function NoConversations() {
  return (
    <Box
      mx="auto"
      display="flex"
      height="100%"
      maxWidth="400px"
      textAlign="center"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box as="img" src={illustration} width="140px" marginBottom={6} />
      <Text fontSize="lg" fontWeight={500} marginBottom={1} color="neutral900">
        No messages
      </Text>
      <Text color="neutral600">You don&apos;t have any messages yet.</Text>
    </Box>
  );
}
