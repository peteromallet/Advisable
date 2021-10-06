import React from "react";
import { Box } from "@advisable/donut";
import illustration from "src/illustrations/testimonials.png";

export default function MockTestimonials() {
  return (
    <Box
      as="img"
      width="100%"
      src={illustration}
      alt="Simplified example of a testimonial from profile"
      css={`
        user-select: none;
      `}
    />
  );
}
