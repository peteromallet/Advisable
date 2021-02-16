import React from "react";
import { Card, Text } from "@advisable/donut";
import StepNumber from "./StepNumber";

export default function Introduction() {
  return (
    <Card padding={4} borderRadius="12px">
      <StepNumber>Step 1 of 5</StepNumber>
      <Text
        as="h1"
        fontSize="5xl"
        color="cyan600"
        fontWeight="medium"
        letterSpacing="-0.03rem"
      >
        Introduction
      </Text>
    </Card>
  );
}
