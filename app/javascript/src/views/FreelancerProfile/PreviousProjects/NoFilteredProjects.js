import React from "react";
import { Folder } from "@styled-icons/feather";
import { Circle, Box, Text } from "@advisable/donut";

function NoFilteredProjects({ firstName }) {
  return (
    <Box textAlign="center" py="xxl">
      <Circle mb="m" bg="blue800" color="blue100">
        <Folder size={24} strokeWidth={2} />
      </Circle>
      <Text color="neutral900" fontWeight="medium" mb="xs">
        No Projects
      </Text>
      <Text color="neutral600">
        {firstName} does not have any projects matching these filters
      </Text>
    </Box>
  );
}

export default NoFilteredProjects;
