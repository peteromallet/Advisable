import React from "react";
import { Box, Stack } from "@advisable/donut";
import Review from "./Review";
import {
  SectionHeaderText,
  SectionHeaderWrapper,
} from "../components/SectionHeader";

function Testimonials({ reviews }) {
  const cards = reviews.map((review) => {
    return <Review key={review.id} review={review} />;
  });
  return (
    <Box mb="4xl">
      <SectionHeaderWrapper divider="neutral200">
        <SectionHeaderText>Testimonials</SectionHeaderText>
      </SectionHeaderWrapper>
      <Stack spacing={80} divider="neutral200" pt="xl">
        {cards}
      </Stack>
    </Box>
  );
}

export default Testimonials;
