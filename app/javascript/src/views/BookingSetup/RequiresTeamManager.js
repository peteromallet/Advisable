import React from "react";
import CopyURL from "src/components/CopyURL";
import { Box, Card, Text, Paragraph } from "@advisable/donut";

export default function RequiresTeamManager({ data }) {
  const name = data.application.specialist.name;

  return (
    <Box maxWidth="600px" mx="auto" py={12}>
      <Card padding={12} textAlign="center">
        <Text fontSize="xl" fontWeight="medium" mb={2} letterSpacing="-0.02rem">
          Only managers can start working with freelancers
        </Text>
        <Paragraph mb={6}>
          Please send the following link to a team manager to setup project
          payments and start working with {name}.
        </Paragraph>
        <CopyURL>{window.location.href}</CopyURL>
      </Card>
    </Box>
  );
}
