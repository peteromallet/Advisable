import React from "react";
import { Box } from "@advisable/donut";
import SimpleBar from "simplebar-react";
import { useParams } from "react-router-dom";
import MessageComposer from "./MessageComposer";
import ConversationMessages from "./ConversationMessages";
import ConversationHeader from "./ConversationHeader";

export default function Conversation({ conversations }) {
  const { id } = useParams();
  const conversation = conversations.find((c) => c.id === id);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <ConversationHeader conversation={conversation} />
      <Box height="100%" minHeight="0" width="100%" flexGrow={1} flexShrink={1}>
        <SimpleBar style={{ height: "100%" }}>
          <Box maxWidth="700px" mx="auto" px={4}>
            <ConversationMessages conversation={conversation} />
          </Box>
        </SimpleBar>
      </Box>
      <Box width="100%" paddingBottom={4} maxWidth="720px" px={4} mx="auto">
        <MessageComposer conversation={conversation} />
      </Box>
    </Box>
  );
}
