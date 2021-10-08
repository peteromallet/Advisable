import React from "react";
import { Box, Text, Button, Link, theme } from "@advisable/donut";
import PaintRollerIllustration from "src/illustrations/zest/paintroller";

export default function CaseStudiesEmptyState({ specialist }) {
  return (
    <Box
      border="1px dashed"
      bg="neutral50"
      borderColor="neutral200"
      paddingX={8}
      paddingY={12}
      borderRadius="16px"
    >
      <Box maxWidth="320px" marginX="auto" textAlign="center">
        <PaintRollerIllustration
          width="200px"
          marginBottom={5}
          color={theme.colors.blue300}
        />
        <Text fontWeight={500} marginBottom={0.5} lineHeight="20px">
          Add your first case study!
        </Text>
        <Text
          fontSize="sm"
          marginBottom={4}
          lineHeight="20px"
          color="neutral700"
        >
          Add case studies to showcase your work and find new clients.
        </Text>
        <Link.External
          target="_blank"
          href={`https://csi.advisable.com/freelancer/onboarding?specialist_id=${specialist.id}&contact_name=${specialist.firstName}`}
        >
          <Button variant="ghost">Add a case study</Button>
        </Link.External>
      </Box>
    </Box>
  );
}
