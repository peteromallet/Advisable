import React from "react";
import { Box, Stack } from "@advisable/donut";
import SectionTitle from "./SectionTitle";

export default function CaseStudies() {
  return (
    <Box>
      <SectionTitle>Case Studies</SectionTitle>
      <Stack spacing={6} mt={3}>
        <Box height="320px" bg="neutral100" borderRadius="32px" />
        <Box height="320px" bg="neutral100" borderRadius="32px" />
        <Box height="320px" bg="neutral100" borderRadius="32px" />
      </Stack>
    </Box>
  );
}
