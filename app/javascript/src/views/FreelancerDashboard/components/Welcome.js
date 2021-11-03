import React from "react";
import { Box, Text } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";

export default function Welcome() {
  const viewer = useViewer();

  return (
    <Box alignSelf="center" paddingBottom={4}>
      <Text fontSize="5xl" fontWeight={550}>
        Welcome back, <br />
        {viewer.firstName}
      </Text>
    </Box>
  );
}
