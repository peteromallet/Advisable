import React from "react";
import { AlertCircle } from "@styled-icons/feather";
import { Box, Text } from "@advisable/donut";
import CopyURL from "../CopyURL";
import { Chunk } from 'editmode-react';

const ProjectValidationPrompt = ({ project }) => {
  let name = project.contactFirstName;
  if (project.contactLastName) name += ` ${project.contactLastName}`;

  return (
    <Box borderRadius={12} bg="orange50" padding="s">
      <Box display="flex">
        <Box color="orange800">
          <AlertCircle size={24} strokeWidth={2} />
        </Box>
        <Box ml="xs">
          <Text fontSize="s" fontWeight="medium" color="neutral900" mb="xxs">
            <Chunk identifier='verification_required_title'>Verification required</Chunk>
          </Text>
          <Text fontSize="xs" lineHeight="s" color="neutral800" mb="s">
            <Chunk
              identifier='verification_required_description'
              variables={{ name: name, project_client_name: project.clientName }}
            >
              Please send the following verification URL to {name}{" "}
              from {project.clientName} so they can verify the project.
            </Chunk>
          </Text>
        </Box>
      </Box>
      <CopyURL bg="white">{`${location.origin}/verify_project/${project.id}`}</CopyURL>
    </Box >
  );
};

export default ProjectValidationPrompt;
