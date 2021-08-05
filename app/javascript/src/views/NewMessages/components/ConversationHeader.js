import React, { useMemo } from "react";
import { Avatar, Box, Text } from "@advisable/donut";
import commaSeparated from "src/utilities/commaSeparated";

export default function ConversationHeader({ conversation }) {
  const firstFour = useMemo(() => {
    return conversation.participants.slice(0, 5);
  }, [conversation.participants]);

  const remaining = conversation.participants.length - firstFour.length;

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
        <Box marginRight={2} flexShrink={0} display="flex">
          {firstFour.map((participant, index) => (
            <Avatar
              size="s"
              key={participant.id}
              border="2px solid"
              borderColor="white"
              url={participant.avatar}
              name={participant.firstName}
              marginLeft={index > 0 ? "-20px" : null}
            />
          ))}
          {remaining > 0 && (
            <Avatar
              size="s"
              border="2px solid"
              borderColor="white"
              marginLeft="-20px"
            >
              <Box
                width="100%"
                fontSize="xs"
                height="100%"
                display="flex"
                fontWeight={500}
                color="neutral600"
                alignItems="center"
                justifyContent="center"
              >
                +{remaining}
              </Box>
            </Avatar>
          )}
        </Box>
        <Text fontSize="lg" fontWeight={500} $truncate>
          {commaSeparated(conversation.participants.map((p) => p.firstName))}
        </Text>
      </Box>
    </Box>
  );
}
