import React from "react";
import { Box, Text } from "@advisable/donut";

export default function WaitingForOthers() {
  return (
    <Box
      width="100%"
      height="100vh"
      display="grid"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="neutral600" fontSize="lg">
        Waiting for others to join...
      </Text>
    </Box>
  );
}
