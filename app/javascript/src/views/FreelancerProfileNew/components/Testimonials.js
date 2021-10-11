import React from "react";
import { Box, Stack, useModal, DialogDisclosure } from "@advisable/donut";
import SectionActionButton from "./SectionActionButton";
import SectionTitle from "./SectionTitle";
import Testimonial from "./Testimonial";
import TestimonialLinkModal from "./TestimonialLinkModal";

export default function Testimonials({ reviews }) {
  const modal = useModal();

  const testimonials = reviews.map(
    (r) => !!r.comment && <Testimonial key={r.id} review={r} />,
  );

  return (
    <Box>
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={5} mt={3}>
        {testimonials}
      </Stack>
      <DialogDisclosure as={SectionActionButton} mt={6} {...modal}>
        Request a Testimonial
      </DialogDisclosure>
      <TestimonialLinkModal modal={modal} />
    </Box>
  );
}
