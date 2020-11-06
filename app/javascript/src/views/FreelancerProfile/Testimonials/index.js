import React from "react";
import { Box, Stack, useBreakpoint } from "@advisable/donut";
import Review from "./Review";
import {
  SectionHeaderText,
  SectionHeaderWrapper,
} from "../components/SectionHeader";

function Testimonials({ reviews }) {
  const isWidescreen = useBreakpoint("sUp");
  const cards = reviews.map((review) => {
    return <Review key={review.id} review={review} />;
  });
  return (
    <Box mb="4xl">
      <SectionHeaderWrapper divider={"neutral200"}>
        <SectionHeaderText>Testimonials</SectionHeaderText>
      </SectionHeaderWrapper>
      <Stack
        spacing={isWidescreen ? 80 : 48}
        divider={"neutral200"}
        pt={["m", "xl"]}
      >
        {cards}
      </Stack>
    </Box>
  );
}

export default Testimonials;
