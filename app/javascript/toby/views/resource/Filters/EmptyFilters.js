import React from "react";
import { Box, Text } from "@advisable/donut";

export default function EmptyFilters() {
  return (
    <Box padding={8} bg="neutral100" borderRadius="12px" textAlign="center">
      <Text fontWeight={500} marginBottom={1}>
        No Filters
      </Text>
      <Text fontSize="sm" color="neutral700">
        You have not added any filters yet.
      </Text>
    </Box>
  );
}
