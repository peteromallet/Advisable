import React from "react";
import {
  Box,
  Card,
  Text,
  Button,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import PreviousProjectDetails from "../../../components/PreviousProjectDetails";
import ProjectValidationStatus from "../../../components/ProjectValidationStatus";
import ProjectValidationPrompt from "../../../components/ProjectValidationPrompt";

export default function PreviousProject({ previousProject, editModal }) {
  const modal = useModal();

  return (
    <Card padding="m">
      {!previousProject.draft && (
        <Box mb="s">
          <ProjectValidationStatus
            status={previousProject.validationStatus}
            isClient={false}
          />
        </Box>
      )}
      <Text fontSize="l" color="blue900" fontWeight="medium" mb="xs">
        {previousProject.title}
      </Text>
      <Text color="neutral700" lineHeight="m" mb="m">
        {previousProject.excerpt}
      </Text>

      {!previousProject.draft &&
        previousProject.validationStatus === "Pending" && (
          <Box mb="m">
            <ProjectValidationPrompt project={previousProject} />
          </Box>
        )}

      {previousProject.draft && (
        <DialogDisclosure
          variant="subtle"
          as={Button}
          {...editModal.atPath(`/previous_projects/${previousProject.id}`)}
        >
          Edit Project
        </DialogDisclosure>
      )}

      {previousProject.draft === false && (
        <>
          <DialogDisclosure as={Button} variant="subtle" {...modal}>
            View Project
          </DialogDisclosure>

          <PreviousProjectDetails.Modal
            modal={modal}
            id={previousProject.id}
            label={previousProject.title}
          />
        </>
      )}
    </Card>
  );
}
