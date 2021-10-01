import React from "react";
import { Modal, useModal, Button } from "@advisable/donut";
import RequestConsultationModal from "./RequestConsultationModal";

export default function RequestConsultation({ specialist }) {
  const modal = useModal();

  return (
    <>
      <Modal
        modal={modal}
        label={`Request consultation with ${specialist.name}`}
      >
        <RequestConsultationModal />
      </Modal>
      <Modal.Disclosure as={Button} {...modal}>
        Connect
      </Modal.Disclosure>
    </>
  );
}
