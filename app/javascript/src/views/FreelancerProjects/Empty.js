// Loads the empty state for the manage talent view
import React from "react";
import { Box, Text } from "@advisable/donut";
import illustration from "./illustration.png";

export default () => {
  return (
    <Box maxWidth={400} style={{ margin: "0 auto" }}>
      <Text textAlign="center">
        <img src={illustration} width={320} alt="" />
      </Text>
      <Text weight="medium" textAlign="center" mb="xs">
        No active projects
      </Text>
      <Text size="xs" textAlign="center" color="neutral.5" lineHeight="s">
        It looks like you haven't got any active projects. Once a client accepts
        an application, you will be able to manage the project from here.
      </Text>
    </Box>
  );
};
