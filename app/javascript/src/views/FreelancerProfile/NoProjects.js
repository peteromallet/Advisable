import React from "react";
import { Circle, Box, Text, Icon } from "@advisable/donut";

function NoProjects({ data }) {
  const firstName = data.specialist.firstName;

  return (
    <Box textAlign="center" py="xxl">
      <Circle mb="m" bg="blue800" color="blue100">
        <Icon icon="folder" />
      </Circle>
      <Text color="neutral900" fontWeight="medium" mb="xs">
        No Projects
      </Text>
      <Text color="neutral600">
        {firstName} has not added any previous projects yet
      </Text>
    </Box>
  );
}

export default NoProjects;
