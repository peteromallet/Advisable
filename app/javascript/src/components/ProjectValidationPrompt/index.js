import React from "react";
import { AlertCircle } from "@styled-icons/feather";
import { Box, Text } from "@advisable/donut";
import CopyURL from "../CopyURL";

const ProjectValidationPrompt = ({ project }) => {
  let name = project.contactFirstName;
  if (project.contactLastName) name += ` ${project.contactLastName}`;

  return (
    <Box borderRadius={12} bg="yellow.0" padding="s">
      <Box display="flex">
        <Box color="yellow700">
          <AlertCircle size={24} strokeWidth={2} />
        </Box>
        <Box ml="xs">
          <Text fontSize="s" fontWeight="medium" color="neutral.9" mb="xxs">
            Verification required
          </Text>
          <Text fontSize="xs" lineHeight="s" color="neutral.8" mb="s">
            Please send the following verification URL to {name} from{" "}
            {project.clientName} so they can verify the project.
          </Text>
        </Box>
      </Box>
      <CopyURL bg="white">{`${location.origin}/verify_project/${project.id}`}</CopyURL>
    </Box>
  );
};

export default ProjectValidationPrompt;
