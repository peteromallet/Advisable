import React from "react";
import SimpleBar from "simplebar-react";
import { Avatar, Box, Text } from "@advisable/donut";
import MessageComposer from "./MessageComposer";
import commaSeparated from "src/utilities/commaSeparated";
import ConversationMessages from "./ConversationMessages";
import { useParams } from "react-router-dom";

export default function Conversation({ conversations }) {
  const { id } = useParams();
  const conversation = conversations.find((c) => c.id === id);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        height="72px"
        flexShrink={0}
        display="flex"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="neutral100"
      >
        <Box
          width="100%"
          maxWidth="700px"
          mx="auto"
          display="flex"
          alignItems="center"
        >
          <Box marginRight={2}>
            {conversation.participants.map((participant, index) => (
              <Avatar
                size="s"
                key={participant.id}
                border="2px solid"
                borderColor="white"
                url={participant.avatar}
                name={participant.firstName}
                marginLeft={index > 0 ? "-16px" : null}
              />
            ))}
          </Box>
          <Text fontSize="lg" fontWeight={500} $truncate>
            {commaSeparated(conversation.participants.map((p) => p.firstName))}
          </Text>
        </Box>
      </Box>
      <Box height="100%" minHeight="0" width="100%" flexGrow={1} flexShrink={1}>
        <SimpleBar style={{ height: "100%" }}>
          <Box maxWidth="700px" mx="auto">
            <ConversationMessages conversation={conversation} />
          </Box>
        </SimpleBar>
      </Box>
      <Box width="100%" paddingBottom={5} maxWidth="720px" mx="auto">
        <MessageComposer conversation={conversation} />
      </Box>
    </Box>
  );
}
