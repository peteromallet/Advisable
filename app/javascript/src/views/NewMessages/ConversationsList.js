import React from "react";
import { Box, Text, Avatar } from "@advisable/donut";
import { StyledConversationItem } from "./styles";
import useViewer from "src/hooks/useViewer";

function ConversationListItem({ conversation, recipient }) {
  return (
    <StyledConversationItem to={`/messages/${conversation.id}`}>
      <Box alignItems="center" display="flex">
        <Box flexShrink={0}>
          <Avatar size={"s"} name={recipient.name} />
        </Box>
        <Box flexGrow="1" ml={2}>
          <Box
            mb={1}
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Text color="neutral900" fontWeight="medium">
              {recipient.name}
            </Text>
            <Text size="xxs" color="darkGray">
              recently
            </Text>
          </Box>
          <Text size="sm" color="neutral600">
            {conversation.lastMessage?.content}
          </Text>
        </Box>
      </Box>
    </StyledConversationItem>
  );
}

export default function ConversationsList({ conversations }) {
  const viewer = useViewer();

  const getRecipient = (conversation) => {
    return conversation.participants.find((p) => p.id !== viewer.accountId);
  };

  return (
    <Box
      bg="white"
      pt={4}
      px={4}
      display="flex"
      flexShrink="0"
      flexDirection="column"
      zIndex={4}
      width={{ _: "100%", s: "34%", l: "30%", xl: "26%" }}
      boxShadow="0 0 24px rgba(0,0,0,0.04)"
    >
      <Box
        pb={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          size="3xl"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.01rem"
        >
          Inbox
        </Text>
      </Box>

      <Box
        width="100%"
        height="100%"
        display="flex"
        overflow="scroll"
        background="white"
        flexDirection="column"
      >
        {conversations.map((c) => (
          <ConversationListItem
            key={c.id}
            conversation={c}
            recipient={getRecipient(c)}
          />
        ))}
      </Box>
    </Box>
  );
}
