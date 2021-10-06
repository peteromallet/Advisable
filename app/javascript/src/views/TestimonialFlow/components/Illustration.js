import React from "react";
import { useImage } from "react-image";
import { Box } from "@advisable/donut";
import illustration from "src/illustrations/testimonials.png";

export default function MockTestimonials() {
  const { src } = useImage({ srcList: illustration });

  return (
    <Box
      as="img"
      width="100%"
      src={src}
      alt="Simplified example of a testimonial from profile"
      css={`
        user-select: none;
      `}
    />
  );
}
