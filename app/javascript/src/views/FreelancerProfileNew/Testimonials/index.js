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
    <Box mb="xl">
      <SectionHeaderWrapper>
        <SectionHeaderText> Testimonials</SectionHeaderText>
      </SectionHeaderWrapper>
      <Stack spacing="m">{cards}</Stack>
    </Box>
  );
}

export default Testimonials;
