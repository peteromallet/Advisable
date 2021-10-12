import React from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, useModal, DialogDisclosure } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import SectionActionButton from "./SectionActionButton";
import SectionTitle from "./SectionTitle";
import Testimonial from "./Testimonial";
import TestimonialLinkModal from "./TestimonialLinkModal";
import TestimonialsEmptyState from "./TestimonialsEmptyState";

export default function Testimonials({ reviews }) {
  const modal = useModal();
  const { id } = useParams();
  const viewer = useViewer();

  const testimonials = reviews.map(
    (r) => !!r.comment && <Testimonial key={r.id} review={r} />,
  );

  const isEmpty = testimonials.length === 0;
  const isOwner = viewer?.id === id;

  if (isEmpty && !isOwner) return null;

  return (
    <Box>
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={5} mt={3}>
        {testimonials}
      </Stack>
      {isEmpty ? (
        <TestimonialsEmptyState modal={modal} />
      ) : (
        <DialogDisclosure as={SectionActionButton} mt={6} {...modal}>
          Request a Testimonial
        </DialogDisclosure>
      )}
      <TestimonialLinkModal modal={modal} />
    </Box>
  );
}
