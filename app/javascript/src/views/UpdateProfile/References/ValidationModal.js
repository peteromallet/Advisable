import React from "react";
import { Modal, Text, Button } from "@advisable/donut";
import CopyURL from "../../../components/CopyURL";

export default function ValidationModal({ modal, previousProject }) {
  const { clientName, contactName, id } = previousProject;

  return (
    <Modal modal={modal} padding="l">
      <Text
        mb="xs"
        color="blue900"
        fontSize="24px"
        lineHeight="28px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Project Validation
      </Text>
      <Text lineHeight="24px" color="neutral900" mb="l">
        Thanks for adding the details of your project with {clientName}! To
        validate this project, please share this link with {contactName}
      </Text>
      <CopyURL>{`${location.origin}/verify_project/${id}`}</CopyURL>
      <Button mt="l" size="l" onClick={modal.hide}>
        Okay
      </Button>
    </Modal>
  );
}
