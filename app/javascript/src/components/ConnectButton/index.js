import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import { ChatAlt } from "@styled-icons/heroicons-solid/ChatAlt";
import { Modal, useModal, Button, DialogDisclosure } from "@advisable/donut";
import ConnectModal from "./ConnectModal";

export default function ConnectButton({
  specialist,
  children = "Connect",
  ...props
}) {
  const location = useLocation();
  const { prompt } = queryString.parse(location.search);
  const dialog = useModal({ visible: prompt === "true" });

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
        {children}
      </DialogDisclosure>
    </>
  );
}
