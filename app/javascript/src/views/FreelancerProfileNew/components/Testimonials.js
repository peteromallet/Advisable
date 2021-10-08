import React from "react";
import { Box, Stack, useModal, DialogDisclosure } from "@advisable/donut";
import SectionActionButton from "./SectionActionButton";
import SectionTitle from "./SectionTitle";
import Testimonial from "./Testimonial";
import useViewer from "src/hooks/useViewer";
import TestimonialLinkModal from "./TestimonialLinkModal";
import TestimonialsEmptyState from "./TestimonialsEmptyState";

export default function Testimonials({ reviews, specialist }) {
  const viewer = useViewer();
  const isOwner = viewer?.id === specialist.id;
  const modal = useModal();

  const testimonials = reviews.map((r) => (
    <Testimonial key={r.id} review={r} />
  ));

  return (
    <Box>
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={6} mt={3}>
        {testimonials}
      </Stack>
      {isOwner ? (
        <>
          <DialogDisclosure as={SectionActionButton} mt={6} {...modal}>
            Request a Testimonial
          </DialogDisclosure>
          <TestimonialLinkModal modal={modal} />
        </>
      ) : (
        <TestimonialsEmptyState mt={6} />
      )}
    </Box>
  );
}
