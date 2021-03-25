import React from "react";
import { Box, Stack, useBreakpoint } from "@advisable/donut";
import Review from "src/components/Review";
import {
  SectionHeaderText,
  SectionHeaderWrapper,
} from "../components/SectionHeader";

function Testimonials({ reviews }) {
  const isWidescreen = useBreakpoint("sUp");
  const cards = reviews.map((r) => (
    <Review key={r.id} review={r} size={["s", "s", "m", "l"]} />
  ));
  return (
    <Box mb={16}>
      <SectionHeaderWrapper divider={"neutral200"}>
        <SectionHeaderText>Testimonials</SectionHeaderText>
      </SectionHeaderWrapper>
      <Stack
        spacing={isWidescreen ? "20" : "12"}
        divider={"neutral200"}
        pt={[4, 8]}
      >
        {cards}
      </Stack>
    </Box>
  );
}

export default Testimonials;
