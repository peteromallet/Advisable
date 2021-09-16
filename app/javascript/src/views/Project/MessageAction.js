import React from "react";
import { Chatbubbles } from "@styled-icons/ionicons-solid/Chatbubbles";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import SendMessageModal from "src/components/SendMessageModal";
import ActionBar from "./ActionBar";

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
        as={ActionBar.Item}
        label="Message"
        icon={<Chatbubbles />}
      />
    </>
  );
}
