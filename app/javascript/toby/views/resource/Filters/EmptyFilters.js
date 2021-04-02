import React from "react";
import { Box, Text } from "@advisable/donut";

export default function EmptyFilters() {
  return (
    <Box padding={8} bg="neutral100" borderRadius="12px" textAlign="center">
      <Text fontSize="sm" color="neutral700">
        You have not added any filters yet.
      </Text>
    </Box>
  );
}
