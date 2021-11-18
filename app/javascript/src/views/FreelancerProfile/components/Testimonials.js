import React from "react";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/react";
import { Box, Stack, useModal, DialogDisclosure } from "@advisable/donut";
import CardButton from "src/components/CardButton";
import SectionTitle from "./SectionTitle";
import Testimonial from "./Testimonial";
import TestimonialLinkModal from "./TestimonialLinkModal";
import TestimonialsEmptyState from "./TestimonialsEmptyState";

function Testimonials({ reviews, specialist, isOwner }) {
  const modal = useModal();

  const testimonials = reviews
    .filter((r) => !!r.comment)
    .map((r) => (
      <Sentry.ErrorBoundary key={r.id}>
        <Testimonial review={r} />
      </Sentry.ErrorBoundary>
    ));

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
        <DialogDisclosure as={CardButton} paddingY={6} mt={6} {...modal}>
          Request a Testimonial
        </DialogDisclosure>
      )}
      <TestimonialLinkModal specialist={specialist} modal={modal} />
    </Box>
  );
}

Testimonials.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

export default Testimonials;
