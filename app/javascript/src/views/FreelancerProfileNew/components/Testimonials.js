import React from "react";
import { Box, Stack } from "@advisable/donut";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  return (
    <Box>
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={6} mt={3}>
        <Box height="120px" bg="neutral100" borderRadius="12px" />
        <Box height="120px" bg="neutral100" borderRadius="12px" />
        <Box height="120px" bg="neutral100" borderRadius="12px" />
      </Stack>
    </Box>
  );
}
