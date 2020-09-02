import React from "react";
import { Chatbubbles } from "@styled-icons/ionicons-solid";
import ActionBarModal from "./ActionBarModal";
import { Box } from "@advisable/donut";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import TalkConversation from "components/TalkConversation";
import ActionBar from "./ActionBar";

export default function MessageAction({ application }) {
  const dialog = useDialogState();

  return (
    <>
      <ActionBarModal padding="8px" dialog={dialog} label="Message">
        <Box height="500px">
          <TalkConversation
            conversationId={application.id}
            participants={[application.specialist]}
          />
        </Box>
      </ActionBarModal>
      <DialogDisclosure
        {...dialog}
        as={ActionBar.Item}
        label="Message"
        icon={<Chatbubbles />}
      />
    </>
  );
}
