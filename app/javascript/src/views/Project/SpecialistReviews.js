import React from "react";
import { Box, Stack, Text, Avatar } from "@advisable/donut";
import renderLineBreaks from "../../utilities/renderLineBreaks";

function SpecialistReview({ review }) {
  const { role, name, companyName } = review;
  const title = name ? `${role} at ${companyName}` : companyName;

  return (
    <Box padding="16px" borderRadius="12px" bg="neutral100">
      <Box display="flex" alignItems="center" marginBottom="s">
        <Avatar
          size="s"
          bg="neutral200"
          marginRight="12px"
          url={review.avatar}
          name={name}
        />
        <Box>
          <Text
            color="neutral900"
            fontWeight="medium"
            lineHeight="20px"
            letterSpacing="-0.02em"
          >
            {name || role}
          </Text>
          <Text fontSize="sm" color="neutral600">
            {title}
          </Text>
        </Box>
      </Box>
      <Text
        autoLink
        lineHeight="20px"
        color="neutral800"
        fontStyle="italic"
        letterSpacing="0.01em"
      >
        {renderLineBreaks(`"${review.comment}"`)}
      </Text>
    </Box>
  );
}

export default function SpecialistReviews({ reviews }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="xl"
        fontWeight="medium"
        color="neutral900"
        marginBottom="16px"
        letterSpacing="-0.01em"
      >
        Testimonials
      </Text>
      <Stack spacing="m">
        {reviews.map((review) => (
          <SpecialistReview key={review.id} review={review} />
        ))}
      </Stack>
    </Box>
  );
}
