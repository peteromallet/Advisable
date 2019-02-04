import React from "react";
import { Modal, Heading } from "src/components";

const RejectModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      reject modal
    </Modal>
  )
}

export default RejectModal