import React from "react";
import {
  Card,
  Text,
  RoundedButton,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import PreviousProjectDetails from "../../../components/PreviousProjectDetails";

export default function PreviousProject({ previousProject, editModal }) {
  const modal = useModal();

  return (
    <Card padding="m">
      <Text fontSize="l" color="blue900" fontWeight="medium" mb="xs">
        {previousProject.title}
      </Text>
      <Text color="neutral700" lineHeight="m" mb="m">
        {previousProject.excerpt}
      </Text>

      {previousProject.draft && (
        <DialogDisclosure
          variant="subtle"
          as={RoundedButton}
          {...editModal.atPath(`/previous_projects/${previousProject.id}`)}
        >
          Edit Project
        </DialogDisclosure>
      )}

      {previousProject.draft === false && (
        <>
          <DialogDisclosure as={RoundedButton} variant="subtle" {...modal}>
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
