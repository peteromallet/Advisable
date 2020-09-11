import React from "react";
import Talk from "talkjs";
import { Box } from "@advisable/donut";
import useViewer from "../hooks/useViewer";
import createTalkSession from "../utilities/createTalkSession";

export default function TalkConversation({ conversationId, participants }) {
  const viewer = useViewer();
  const messengerRef = React.useRef(null);

  React.useEffect(() => {
    Talk.ready.then(() => {
      const session = createTalkSession(viewer);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(session.me);

      participants.forEach((participant) => {
        const user = new Talk.User({
          id: participant.id,
          name: participant.name,
          email: participant.email,
          role: participant.__typename === "User" ? "Client" : "Specialist",
        });

        conversation.setParticipant(user);
      });

      const chatbox = session.createChatbox(conversation);
      chatbox.mount(messengerRef.current);
    });
  }, [conversationId, participants, viewer]);

  return <Box ref={messengerRef} height="100%" />;
}
