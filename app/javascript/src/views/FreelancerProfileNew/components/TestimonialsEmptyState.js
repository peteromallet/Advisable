import React from "react";
import {
  Box,
  Circle,
  Text,
  theme,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import PencilIllustration from "src/illustrations/zest/pencil";
import { Plus } from "@styled-icons/heroicons-outline";
import TestimonialLinkModal from "./TestimonialLinkModal";
import EmptyStateActionCard from "./EmptyStateActionCard";

export default function TestimonialsEmptyState() {
  const modal = useModal();

  return (
    <DialogDisclosure as={EmptyStateActionCard} {...modal}>
      <Box maxWidth="320px" marginX="auto" textAlign="center">
        <PencilIllustration width="220px" color={theme.colors.blue300} />
        <Text
          fontWeight={500}
          marginBottom={0.5}
          lineHeight="20px"
          color="blue500"
        >
          Request testimonials from a client!
        </Text>
        <Text
          fontSize="sm"
          marginBottom={4}
          lineHeight="20px"
          color="neutral700"
        >
          Send the link to your clients and ask them to write a testimonial for
          you.
        </Text>
        <Circle
          border="2px solid"
          borderColor="neutral200"
          color="neutral200"
          size={44}
          p={1.5}
        >
          <Plus />
        </Circle>
        <TestimonialLinkModal modal={modal} />
      </Box>
    </DialogDisclosure>
  );
}
