import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  theme,
  Circle,
  Heading,
  useModal,
  DialogDisclosure,
  Link,
} from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import PencilIllustration from "src/illustrations/zest/pencil";
import { Plus } from "@styled-icons/heroicons-outline";
import TestimonialLinkModal from "./TestimonialLinkModal";
import EmptyStateActionCard from "./EmptyStateActionCard";

function CardWrapper({ isOwner, modal, children }) {
  const { id } = useParams();

  if (isOwner) {
    return (
      <DialogDisclosure as={EmptyStateActionCard} {...modal}>
        {children}
      </DialogDisclosure>
    );
  } else {
    return (
      <EmptyStateActionCard
        as={Link.External}
        href={`/review/${id}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </EmptyStateActionCard>
    );
  }
}

export default function TestimonialsEmptyState() {
  const modal = useModal();
  const { id } = useParams();
  const viewer = useViewer();
  const isOwner = viewer?.id === id;

  return (
    <CardWrapper modal={modal} isOwner={isOwner}>
      <Box maxWidth="320px" marginX="auto" textAlign="center">
        <PencilIllustration width="220px" color={theme.colors.blue300} />
        {isOwner ? (
          <>
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
              Send the link to your clients and ask them to write a testimonial
              for you.
            </Text>
          </>
        ) : (
          <>
            <Heading size="lg" color="blue500" marginBottom={1} lineHeight="m">
              Have you been working together?
              <br /> Leave a testimonial!
            </Heading>
            <Text
              fontSize="md"
              marginBottom={4}
              lineHeight="m"
              color="neutral700"
            >
              This won&apos;t create an account on Advisable.
            </Text>
          </>
        )}
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
    </CardWrapper>
  );
}
