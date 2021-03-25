import React from "react";
import { Box, Text, StyledCircle } from "@advisable/donut";
import CopyURL from "../CopyURL";
import { EyeOff } from "@styled-icons/ionicons-outline/EyeOff";

const ProjectValidationPrompt = ({ project }) => {
  const name = project.contactFirstName || project.contactJobTitle;

  return (
    <Box borderRadius={12} bg="yellow100" p={3}>
      <Box display="flex" mb={4}>
        <Box>
          <StyledCircle size={40} mr={3} bg="yellow200" color="yellow800">
            <EyeOff strokeWidth={1.75} width="20px" height="20px" />
          </StyledCircle>
        </Box>
        <Box>
          <Text
            mb={0.5}
            fontSize="md"
            fontWeight="medium"
            color="yellow900"
            lineHeight="m"
          >
            Verification required
          </Text>
          <Text fontSize="sm" color="yellow900" lineHeight="xs">
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
