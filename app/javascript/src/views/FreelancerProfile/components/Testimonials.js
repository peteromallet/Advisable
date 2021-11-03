import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, useModal, DialogDisclosure } from "@advisable/donut";
import SectionActionButton from "./SectionActionButton";
import SectionTitle from "./SectionTitle";
import Testimonial from "./Testimonial";
import TestimonialLinkModal from "./TestimonialLinkModal";
import TestimonialsEmptyState from "./TestimonialsEmptyState";

function Testimonials({ reviews, isOwner }) {
  const modal = useModal();

  const testimonials = reviews
    .filter((r) => !!r.comment)
    .map((r) => <Testimonial key={r.id} review={r} />);

  const isEmpty = testimonials.length === 0;

  if (isEmpty && !isOwner) return null;

  return (
    <Box>
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={5} mt={3}>
        {testimonials}
      </Stack>
      {isEmpty && isOwner && <TestimonialsEmptyState modal={modal} />}
      {!isEmpty && isOwner && (
        <DialogDisclosure as={SectionActionButton} mt={6} {...modal}>
          Request a Testimonial
        </DialogDisclosure>
      )}
      <TestimonialLinkModal modal={modal} />
    </Box>
  );
}

Testimonials.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

export default Testimonials;
