// Loads the empty state for the manage talent view
import React from "react";
import { Box, Text, Paragraph } from "@advisable/donut";
import illustration from "./illustration.png";

export default function NoActiveProjects() {
  return (
    <Box maxWidth={400} style={{ margin: "0 auto" }}>
      <Text textAlign="center">
        <img src={illustration} width={320} alt="" />
      </Text>
      <Text fontSize="lg" fontWeight="medium" textAlign="center" mb="xs">
        No active projects
      </Text>
      <Paragraph fontSize="sm" textAlign="center">
        It looks like you haven&apos;t got any active projects. Once a client
        accepts an application, you will be able to manage the project from
        here.
      </Paragraph>
    </Box>
  );
}
