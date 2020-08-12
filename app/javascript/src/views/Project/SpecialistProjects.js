import React from "react";
import Masonry from "components/Masonry";
import { Box, Card, Text } from "@advisable/donut";

export default function SpecialistProjects({ projects }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="18px"
        color="neutral900"
        fontWeight="500"
        marginBottom="16px"
        letterSpacing="-0.02em"
      >
        Previous Projects
      </Text>
      <Masonry gutter={24}>
        <Card height="400px" />
        <Card height="300px" />
        <Card height="300px" />
        <Card height="300px" />
      </Masonry>
    </Box>
  );
}
