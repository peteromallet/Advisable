import React from "react";
import { Box, Text } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";

export default function Welcome() {
  const viewer = useViewer();

  return (
    <Box alignSelf="center" paddingBottom={{ _: 12, l: 4 }}>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.03rem">
        Welcome back, <br />
        {viewer.firstName}
      </Text>
    </Box>
  );
}
