import React from "react";
import { Box, Stack, Text, useBreakpoint } from "@advisable/donut";
import Review from "src/components/Review";

export default function SpecialistReviews({ reviews }) {
  const isWidescreen = useBreakpoint("lUp");
  return (
    <Box marginBottom="52px">
      <Box borderStyle="solid" borderBottomWidth="1px" borderColor="neutral200">
        <Text
          fontSize="xl"
          fontWeight="medium"
          color="neutral900"
          letterSpacing="-0.01em"
          mb={2}
        >
          Testimonials
        </Text>
      </Box>
      <Stack
        spacing={isWidescreen ? "20" : "12"}
        divider={"neutral200"}
        pt={{ _: 4, l: 8 }}
      >
        {reviews.map((review) => (
          <Review key={review.id} review={review} size={{ _: "s", l: "m" }} />
        ))}
      </Stack>
    </Box>
  );
}
