import React from "react";
import CopyURL from "src/components/CopyURL";
import { Card, Text, Paragraph } from "@advisable/donut";

export default function RequiresTeamManager({ data }) {
  const name = data.application.specialist.name;

  return (
    <Card padding={12} textAlign="center">
      <Text fontSize="xl" fontWeight="medium" mb={2} letterSpacing="-0.02rem">
        Your company has not setup project payments yet.
      </Text>
      <Paragraph mb={6}>
        Please send the following link to a team manager to setup project
        payments and start working with {name}.
      </Paragraph>
      <CopyURL>{window.location.href}</CopyURL>
    </Card>
  );
}
