import React from "react";
import { Text, Box, Stack } from "@advisable/donut";

export default function CaseStudies() {
  return (
    <Box>
      <Text>Case Studies</Text>
      <Stack spacing={6}>
        <Box width="720px" height="320px" bg="neutral100" borderRadius="32px" />
        <Box width="720px" height="320px" bg="neutral100" borderRadius="32px" />
        <Box width="720px" height="320px" bg="neutral100" borderRadius="32px" />
      </Stack>
    </Box>
  );
}
