import { use100vh } from "react-div-100vh";
import { Chatbubbles } from "@styled-icons/ionicons-solid";
import ActionBarModal from "./ActionBarModal";
import { Box, useBreakpoint } from "@advisable/donut";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import TalkConversation from "components/TalkConversation";
import ActionBar from "./ActionBar";

export default function MessageAction({ application }) {
  const height = use100vh();
  const dialog = useDialogState();
  const isLarge = useBreakpoint("mUp");

  return (
    <>
      <ActionBarModal padding="8px" dialog={dialog} label="Message">
        <Box style={{ height: isLarge ? "60vh" : height - 100 }}>
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
