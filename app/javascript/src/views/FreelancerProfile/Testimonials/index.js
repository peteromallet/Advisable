import React from "react";
import { Box, Stack, Text } from "@advisable/donut";
import Review from "./Review";
// import {
//   SectionHeaderText,
//   SectionHeaderWrapper,
// } from "../components/SectionHeader";
import useVariants from "components/VariantSystem/useVariants";

function Testimonials({ reviews }) {
  const { variant } = useVariants();
  const cards = reviews.map((review) => {
    return <Review key={review.id} review={review} />;
  });
  const variants = {
    default: <Stack spacing="m">{cards}</Stack>,
    5: (
      <Stack spacing="4xl" divider="neutral200">
        {cards}
      </Stack>
    ),
  };
  const component = variants[variant] || variants.default;
  return (
    <Box mb="xl">
      {/* <SectionHeaderWrapper>
        <SectionHeaderText>Testimonials</SectionHeaderText>
      </SectionHeaderWrapper> */}
      <Box display="flex" alignItems="center" mb="m" px="xs">
        <Text
          as="h2"
          fontSize="2xl"
          fontWeight="medium"
          lineHeight="29px"
          color="neutral600"
        >
          Testimonials
        </Text>
      </Box>
      {component}
    </Box>
  );
}

export default Testimonials;
