import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import { ChatAlt } from "@styled-icons/heroicons-solid/ChatAlt";
import { Modal, useModal, DialogDisclosure } from "@advisable/donut";
import Button from "src/components/Button";
import ConnectModal from "./ConnectModal";
import { Link } from "react-router-dom";

export default function ConnectButton({ specialist, ...props }) {
  const location = useLocation();
  const { prompt } = queryString.parse(location.search);
  const dialog = useModal({ visible: prompt === "true" });

  if (specialist.conversation) {
    return (
      <Link to={`/messages/${specialist.conversation.id}`}>
        <Button prefix={<ChatAlt />} {...props}>
          Message
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Modal
        width={600}
        modal={dialog}
        label={`Request consultation with ${specialist.name}`}
      >
        <ConnectModal dialog={dialog} specialist={specialist} />
      </Modal>
      <DialogDisclosure as={Button} prefix={<ChatAlt />} {...dialog} {...props}>
        Connect
      </DialogDisclosure>
    </>
  );
}
