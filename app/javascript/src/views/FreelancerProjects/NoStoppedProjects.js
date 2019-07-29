import React from "react";
import { Box, Text } from "@advisable/donut";

const NoStoppedProjects = () => {
  return (
    <Box maxWidth={400} style={{ margin: "40px auto" }}>
      <Text weight="medium" textAlign="center" mb="xs">
        No stopped projects
      </Text>
      <Text size="xs" textAlign="center" color="neutral.5" lineHeight="s">
        You have not stopped working with any clients. When you do they will
        show up here.
      </Text>
    </Box>
  );
};

export default NoStoppedProjects;
