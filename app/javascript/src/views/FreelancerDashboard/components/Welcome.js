import React from "react";
import { Box, Text } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import GradientHighlight from "src/components/GradientHighlight";

export default function Welcome() {
  const viewer = useViewer();

  return (
    <Box alignSelf="center" paddingBottom={{ _: 12, l: 4 }}>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.036rem">
        <GradientHighlight>Welcome back,</GradientHighlight>
        <br />
        {viewer.firstName}
      </Text>
    </Box>
  );
}
