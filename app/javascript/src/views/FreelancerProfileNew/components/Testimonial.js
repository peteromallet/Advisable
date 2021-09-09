import React from "react";
import { Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import TestimonialQuoteIcon from "./TestimonialQuoteIcon";

export default function Testimonial({ review }) {
  const { name, role, companyName } = review;
  const title = name ? `${role} at ${companyName}` : companyName;

  return (
    <Box bg="#F3F1F0" p={4} borderRadius="20px" position="relative">
      <Box position="absolute" right="16px" top="16px">
        <TestimonialQuoteIcon />
      </Box>
      <Box display="flex" alignItems="center" mb={1.5}>
        <PassportAvatar
          size="md"
          src={review.avatar}
          name={review.name}
          mr={2}
        />
        <Box>
          <Text
            fontSize="l"
            fontWeight={600}
            color="neutral700"
            mb={1.5}
            lineHeight="l"
          >
            {review.name}
          </Text>
          <Text fontSize="xs" color="neutral600" lineHeight="2xs">
            {title}
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
