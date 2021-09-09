import React from "react";
import { Box, Stack } from "@advisable/donut";
import SectionTitle from "./SectionTitle";
import Testimonial from "./Testimonial";

export default function Testimonials({ reviews }) {
  const testimonials = reviews.map((r) => (
    <Testimonial key={r.id} review={r} />
  ));
  return (
    <Box>
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={6} mt={3}>
        {testimonials}
      </Stack>
    </Box>
  );
}
