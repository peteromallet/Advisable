import * as React from "react";
import { Modal, Padding, Heading, Text, CopyURL } from "../../../components";

const ShareModal = ({ url, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="xl">
        <Padding bottom="m">
          <Heading>Do you know anyone that would suit this project?</Heading>
        </Padding>
        <Padding bottom="l">
          <Text>
            Share your unique referral link with anyone you know who you think
            would be well suited for this position
          </Text>
        </Padding>
        <CopyURL>{url}</CopyURL>
      </Padding>
    </Modal>
  );
};

export default ShareModal;
