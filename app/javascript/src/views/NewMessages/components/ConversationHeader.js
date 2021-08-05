import React from "react";
import { Avatar, Box, Text } from "@advisable/donut";
import commaSeparated from "src/utilities/commaSeparated";

export default function ConversationHeader({ conversation }) {
  return (
    <Box
      height="72px"
      flexShrink={0}
      display="flex"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="neutral100"
    >
      <Box
        px={4}
        mx="auto"
        width="100%"
        display="flex"
        maxWidth="700px"
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
  );
}
