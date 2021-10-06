import React from "react";
import { ChatAlt } from "@styled-icons/heroicons-solid";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import SendMessageModal from "src/components/SendMessageModal";
import CircularButton from "src/components/CircularButton";

export default function MessageAction({ application }) {
  const dialog = useDialogState();

  return (
    <>
      <SendMessageModal
        dialog={dialog}
        participants={[application.specialist]}
      />
      <DialogDisclosure
        {...dialog}
        size="sm"
        label="Message"
        icon={<ChatAlt />}
        as={CircularButton}
      />
    </>
  );
}
