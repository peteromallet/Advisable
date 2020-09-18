import React from "react";
import { Box, Text, Stack } from "@advisable/donut";
import Review from "./Review";

function Testimonials({ reviews }) {
  const cards = reviews.map((review) => {
    return <Review key={review.id} review={review} />;
  });
  return (
    <Box>
      <Text mb="m" color="neutral900" fontSize="xl" fontWeight="medium">
        Testimonials
      </Text>
      <Stack spacing="m">{cards}</Stack>
    </Box>
  );
}

export default Testimonials;
