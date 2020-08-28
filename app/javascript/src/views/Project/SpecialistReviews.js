import React from "react";
import { Box, Stack, Text, Avatar } from "@advisable/donut";
import renderLineBreaks from "../../utilities/renderLineBreaks";

export default function SpecialistReviews({ reviews }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="19px"
        fontWeight="500"
        color="neutral900"
        marginBottom="16px"
        letterSpacing="-0.02em"
      >
        Reviews
      </Text>
      <Stack spacing="m">
        {reviews.map((review) => (
          <Box
            key={review.id}
            padding="16px"
            borderRadius="12px"
            bg="neutral100"
          >
            <Box display="flex" alignItems="center" marginBottom="s">
              <Avatar
                size="s"
                bg="neutral200"
                marginRight="12px"
                url={review.avatar}
                name={review.name}
              />
              <Box>
                <Text
                  color="neutral900"
                  fontWeight="500"
                  lineHeight="20px"
                  letterSpacing="-0.02em"
                >
                  {review.name}
                </Text>
                <Text fontSize="15px" color="neutral600">
                  {review.role} at {review.companyName}
                </Text>
              </Box>
            </Box>
            <Text
              autoLink
              fontSize="15px"
              fontWeight="300"
              lineHeight="20px"
              color="neutral800"
              fontStyle="italic"
              letterSpacing="0.01em"
            >
              {renderLineBreaks(`"${review.comment}"`)}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
