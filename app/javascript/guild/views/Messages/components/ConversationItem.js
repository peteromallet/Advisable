import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Avatar, Text, Link, useBreakpoint } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import { GuildBox, flex } from "@guild/styles";
import { StyledConversationItem } from "../styles";
import { CHAT_PARTICIPANT_QUERY } from "../queries";

const ConversationItem = ({ conversation, setActive, isActive }) => {
  const sUp = useBreakpoint("sUp");
  const { data, loading } = useQuery(CHAT_PARTICIPANT_QUERY, {
    variables: { id: conversation?.other },
  });
  const other = data?.specialist;

  if (loading) return <Loading />;
  return (
    <StyledConversationItem
      onClick={() => setActive(conversation.sid)}
      active={isActive}
    >
      <Box display="flex" alignSelf="flex-end">
        <Text size="xxs" color="darkGray">
          {conversation.lastMessageWords} ago
        </Text>
      </Box>
      <Box alignItems="center" display="flex">
        <Box flexShrink={0}>
          <Avatar
            as={Link}
            size={"s"}
            name={other.name}
            url={other.avatar}
            to={`/freelancers/${other.id}`}
          />
        </Box>
        <GuildBox
          ml={"s"}
          display="flex"
          flexDirection="column"
          css={flex.flexTruncate}
          spaceChildrenVertical={6}
        >
          <Text
            fontWeight="medium"
            size="m"
            color="catalinaBlue100"
            css={flex.flexTruncate}
          >
            {conversation.friendlyName}
          </Text>
          <Text
            as={sUp ? Link : "div"}
            to={`/freelancers/${other.id}`}
            size="xs"
            color="quartz"
          >
            {other.name}
          </Text>
        </GuildBox>
      </Box>
    </StyledConversationItem>
  );
};

export default ConversationItem;
