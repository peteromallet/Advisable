import React from "react";
import Review from "components/Review";
import { Box, Stack, Text } from "@advisable/donut";

export default function SpecialistReviews({ reviews }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="18px"
        fontWeight="500"
        color="neutral900"
        marginBottom="24px"
        letterSpacing="-0.02em"
      >
        Reviews
      </Text>
      <Stack spacing="xxxl" divider="neutral100">
        {reviews.map((r) => (
          <Review key={r.id} review={r} />
        ))}
      </Stack>
    </Box>
  );
}
