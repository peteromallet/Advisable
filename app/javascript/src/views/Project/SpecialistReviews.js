import React from "react";
import Review from "components/Review";
import { Card, Box, Stack, Text } from "@advisable/donut";

export default function SpecialistReviews({ reviews }) {
  return (
    <Card padding="32px" marginBottom="52px">
      <Text
        fontSize="18px"
        fontWeight="500"
        color="neutral900"
        marginBottom="32px"
        letterSpacing="-0.02em"
      >
        Reviews
      </Text>
      <Stack spacing={64} divider="neutral100">
        {reviews.map((r) => (
          <Review key={r.id} review={r} />
        ))}
      </Stack>
    </Card>
  );
}
