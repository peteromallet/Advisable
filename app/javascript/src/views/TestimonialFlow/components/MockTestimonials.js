import React from "react";
import { Box, Stack } from "@advisable/donut";
import Testimonial from "src/views/FreelancerProfileNew/components/Testimonial";
import SectionTitle from "src/views/FreelancerProfileNew/components/SectionTitle";

export default function MockTestimonials() {
  return (
    <Box
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor="neutral200"
      css={`
        user-select: none;
      `}
      pt={4}
      mb={6}
    >
      <SectionTitle>Testimonials</SectionTitle>
      <Stack spacing={6} mt={3}>
        <Testimonial
          review={{
            name: "William Baker",
            role: "Marketing Director",
            companyName: "Flixcard",
            comment: `This is unbelievable. By working with Helen we resolved all the issues with facebook ads so quickly!`,
          }}
        />
        <Box height="64px" overflow="hidden" position="relative">
          <Box
            zIndex="2"
            width="100%"
            height="100%"
            position="absolute"
            css={`
              background: rgb(255, 255, 255);
              background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.98) 0%,
                rgba(255, 255, 255, 0.3) 100%
              );
            `}
          />
          <Testimonial
            review={{
              name: "Jake Davids",
              role: "Art director",
              companyName: "Devsline",
              comment: `This is unbelievable. After working with Helen my buisness skyrocketed!`,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
