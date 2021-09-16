import React from "react";
import { Box } from "@advisable/donut";

export default function ConversationError() {
  return (
    <Box
      my={8}
      mx="auto"
      padding={4}
      width="400px"
      bg="neutral100"
      textAlign="center"
      borderRadius="12px"
    >
      Failed to load conversation, please try again.
    </Box>
  );
}
