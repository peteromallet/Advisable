import React from "react";
import { Circle, Box, Text, Link, theme } from "@advisable/donut";
import PaintRollerIllustration from "src/illustrations/zest/paintroller";
import { Plus } from "@styled-icons/heroicons-outline";
import EmptyStateActionCard from "./EmptyStateActionCard";

export default function CaseStudiesEmptyState({ specialist }) {
  return (
    <EmptyStateActionCard
      target="_blank"
      as={Link.External}
      href={`https://csi.advisable.com/freelancer/onboarding?specialist_id=${specialist.id}&contact_name=${specialist.firstName}`}
    >
      <Box maxWidth="320px" marginX="auto" textAlign="center">
        <PaintRollerIllustration
          width="200px"
          marginBottom={5}
          color={theme.colors.blue300}
        />
        <Text
          fontWeight={500}
          marginBottom={0.5}
          lineHeight="20px"
          color="blue500"
        >
          Add your first case study!
        </Text>
        <Text fontSize="sm" lineHeight="20px" color="neutral700" mb={5}>
          Showcase your work and find new clients.
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
      </Box>
    </EmptyStateActionCard>
  );
}
