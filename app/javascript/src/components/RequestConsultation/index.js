import React from "react";
import { ChatAlt } from "@styled-icons/heroicons-solid/ChatAlt";
import { Modal, useModal, Button, DialogDisclosure } from "@advisable/donut";
import RequestConsultationModal from "./RequestConsultationModal";

export default function RequestConsultation({
  specialist,
  children = "Connect",
  ...props
}) {
  const dialog = useModal();

  return (
    <>
      <Modal
        width={600}
        modal={dialog}
        label={`Request consultation with ${specialist.name}`}
      >
        <RequestConsultationModal dialog={dialog} specialist={specialist} />
      </Modal>
      <DialogDisclosure as={Button} prefix={<ChatAlt />} {...dialog} {...props}>
        {children}
      </DialogDisclosure>
    </>
  );
}
