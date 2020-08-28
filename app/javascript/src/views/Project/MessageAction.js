import React from "react";
import { Chatbubbles } from "@styled-icons/ionicons-solid";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import TalkModal from "components/TalkModal";
import ActionBar from "./ActionBar";

export default function MessageAction({ application }) {
  const dialog = useDialogState();

  return (
    <>
      <TalkModal
        dialog={dialog}
        conversationId={application.id}
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
