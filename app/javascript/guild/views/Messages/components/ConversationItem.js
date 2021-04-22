import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Avatar, Text } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import { flex } from "@guild/styles";
import { StyledConversationItem } from "../styles";
import { CHAT_PARTICIPANT_QUERY } from "../queries";

const ConversationItem = ({ conversation, setActive, isActive }) => {
  const { data, loading } = useQuery(CHAT_PARTICIPANT_QUERY, {
    variables: { id: conversation?.other },
  });
  const other = data?.specialist;
  const safeName = other?.name || "Deleted User";

  if (loading) return <Loading />;
  return (
    <StyledConversationItem
      $hasUnread={conversation.unreadMessages > 0}
      onClick={() => setActive(conversation.sid)}
      active={isActive}
    >
      <Box alignItems="center" display="flex">
        <Box flexShrink={0}>
          <Avatar size={"s"} name={safeName} url={other?.avatar} />
        </Box>
        <Box flexGrow="1" ml={2} css={flex.flexTruncate}>
          <Box
            mb={1}
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Text color="neutral900" fontWeight="medium">
              {safeName}
            </Text>
            <Text size="xxs" color="darkGray">
              {conversation.lastMessageWords}
            </Text>
          </Box>
          <Text size="sm" color="neutral600" css={flex.flexTruncate}>
            {conversation.friendlyName}
          </Text>
        </Box>
      </Box>
    </StyledConversationItem>
  );
};

export default ConversationItem;
