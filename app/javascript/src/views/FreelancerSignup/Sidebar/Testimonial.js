import React from "react";
import { Text } from "@advisable/donut";
import { TestimonialStyles, Avatar, Trustpilot, Stars } from "./styles";

const Testimonial = () => {
  return (
    <TestimonialStyles>
      <Avatar />
      <Text fontSize="18px" fontWeight="medium" mb="xxs" color="blue900">
        William Boston
      </Text>
      <Text mb="s" color="neutral600">
        SEO Freelancer
      </Text>
      <Text
        size="xs"
        mb="xs"
        lineHeight="s"
        fontStyle="italic"
        color="neutral700"
      >
        “The Advisible team were diligent with managing every step of the
        contracting process. From the initial acquisition to reporting and the
        payment, I was able to avoid some of my least favorite parts of
        contracting and instead focus on doing a great job.”
      </Text>
      <Trustpilot />
      <Stars />
      <Text fontSize="xs" fontWeight="medium" color="neutral500">
        9.3 out of 10
      </Text>
    </TestimonialStyles>
  );
};

export default Testimonial;
