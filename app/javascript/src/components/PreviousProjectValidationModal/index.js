import React from "react";
import { Modal, Text, Button } from "@advisable/donut";
import CopyURL from "../CopyURL";

export default function PreviousProjectValidationModal({
  modal,
  previousProject,
  title,
  description,
}) {
  const { clientName, contactName, id } = previousProject;
  const DEFAULT_TITLE = "Project Validation";
  const DEFAULT_DESCRIPTION = `Thanks for adding the details of your project with ${clientName}! To validate this project, please share this link with ${contactName}`;

  return (
    <Modal modal={modal} padding="l" label={title || DEFAULT_TITLE}>
      <Text
        mb="xs"
        color="blue900"
        fontSize="24px"
        lineHeight="28px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        {title || DEFAULT_TITLE}
      </Text>
      <Text lineHeight="24px" color="neutral900" mb="l">
        {description || DEFAULT_DESCRIPTION}
      </Text>
      <CopyURL>{`${location.origin}/verify_project/${id}`}</CopyURL>
      <Button mt="l" size="l" onClick={modal.hide}>
        Okay
      </Button>
    </Modal>
  );
}
