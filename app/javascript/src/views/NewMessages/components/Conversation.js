import React from "react";
import { Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import ConversationMessages from "./ConversationMessages";
import ConversationHeader from "./ConversationHeader";

export default function Conversation({ conversations, currentAccount }) {
  const { id } = useParams();
  const conversation = conversations.find((c) => c.id === id);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <ConversationHeader conversation={conversation} />
      <Box height="100%" minHeight="0" width="100%" flexGrow={1} flexShrink={1}>
        <ConversationMessages
          conversation={conversation}
          currentAccount={currentAccount}
        />
      </Box>
    </Box>
  );
}
