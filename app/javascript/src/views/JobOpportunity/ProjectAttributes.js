import React from "react";
import { Text, Box } from "@advisable/donut";

const ProjectAttributes = ({ project }) => {
  return (
    <>
      <Text color="blue900" fontWeight="medium" mb="4px">
        Est. Budget
      </Text>
      <Text color="neutral700" fontSize="s">
        {project.estimatedBudget}
      </Text>
      <Box my="16px" height={1} bg="neutral100" />
      <Text color="blue900" fontWeight="medium" mb="4px">
        Location
      </Text>
      <Text color="neutral700" fontSize="s">
        {project.remote ? "Remote" : project.user?.country?.name}
      </Text>
    </>
  );
};

export default ProjectAttributes;
