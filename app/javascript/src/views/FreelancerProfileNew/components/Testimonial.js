import React from "react";
import { Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import TestimonialQuoteIcon from "./TestimonialQuoteIcon";

export default function Testimonial({ review }) {
  return (
    <Box bg="#F3F1F0" p={5} borderRadius="20px" position="relative">
      <Box position="absolute" right="20px" top="20px">
        <TestimonialQuoteIcon />
      </Box>
      <Box display="flex" alignItems="center" marginBottom={3}>
        <PassportAvatar
          size="sm"
          src={review.avatar}
          name={review.name}
          mr={3}
        />
        <Box>
          <Text
            mb={0.5}
            fontSize="l"
            lineHeight="l"
            fontWeight={550}
            color="neutral900"
            letterSpacing="-0.02em"
          >
            {review.name}
          </Text>
          <Text fontSize="sm" color="neutral800" lineHeight="2xs">
            {review.companyName}
          </Text>
        </Box>
      </Box>

      <Text
        fontStyle="italic"
        color="neutral800"
        fontSize="17px"
        lineHeight="l"
      >
        &quot;{review.comment}&quot;
      </Text>
    </Box>
  );
}
