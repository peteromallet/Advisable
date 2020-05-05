import React from "react";
import { Edit } from "@styled-icons/feather";
import {
  Box,
  Link,
  Card,
  Text,
  Button,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import PreviousProjectDetails from "../../../components/PreviousProjectDetails";
import ProjectValidationPrompt from "../../../components/ProjectValidationPrompt";
import ProjectStatus from "./ProjectStatus";

function PreviousProjectTitle({ previousProject, modal }) {
  if (previousProject.draft) {
    return (
      <Text fontSize="20px" color="blue900" fontWeight="semibold">
        {previousProject.title}
      </Text>
    );
  }

  return (
    <DialogDisclosure
      as={Link.External}
      href="#"
      fontSize="20px"
      color="blue900"
      fontWeight="semibold"
      {...modal}
    >
      {previousProject.title}
    </DialogDisclosure>
  );
}

export default function PreviousProject({ previousProject, editModal }) {
  const modal = useModal();

  return (
    <Card padding="l">
      <Box mb="s">
        <ProjectStatus previousProject={previousProject} />
      </Box>
      <Box mb="xs">
        <PreviousProjectTitle previousProject={previousProject} modal={modal} />
      </Box>
      <Text color="neutral700" lineHeight="m" mb="m">
        {previousProject.excerpt}
      </Text>

      {!previousProject.draft &&
        previousProject.validationStatus === "Pending" && (
          <Box mb="m">
            <ProjectValidationPrompt project={previousProject} />
          </Box>
        )}

      <DialogDisclosure
        size="s"
        as={Button}
        variant="subtle"
        prefix={<Edit />}
        {...editModal.atPath(`/previous_projects/${previousProject.id}`)}
      >
        Edit Project
      </DialogDisclosure>
      <PreviousProjectDetails.Modal
        modal={modal}
        id={previousProject.id}
        label={previousProject.title}
      />
    </Card>
  );
}
