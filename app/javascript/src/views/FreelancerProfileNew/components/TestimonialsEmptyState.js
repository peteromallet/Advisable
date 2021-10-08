import React from "react";
import {
  Box,
  Text,
  theme,
  Button,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import TestimonialLinkModal from "./TestimonialLinkModal";
import PencilIllustration from "src/illustrations/zest/pencil";

export default function TestimonialsEmptyState() {
  const modal = useModal();

  return (
    <Box
      border="2px solid"
      bg="neutral50"
      borderColor="neutral100"
      paddingX={8}
      paddingY={12}
      borderRadius="16px"
    >
      <Box maxWidth="320px" marginX="auto" textAlign="center">
        <PencilIllustration width="220px" color={theme.colors.blue300} />
        <Text fontWeight={500} marginBottom={0.5} lineHeight="20px">
          Request testimonials from clients!
        </Text>
        <Text
          fontSize="sm"
          marginBottom={4}
          lineHeight="20px"
          color="neutral700"
        >
          Add case studies to showcase your work and find new clients.
        </Text>
        <DialogDisclosure as={Button} variant="ghost" {...modal}>
          Request a Testimonial
        </DialogDisclosure>
        <TestimonialLinkModal modal={modal} />
      </Box>
    </Box>
  );
}
