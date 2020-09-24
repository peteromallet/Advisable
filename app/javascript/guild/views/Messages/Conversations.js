import React from "react";
import { Link, Avatar, Text, theme } from "@advisable/donut";
import { GuildBox, flex } from "@guild/styles";
import { StyledConversationItem } from "./styles";

const Conversations = ({ conversations, active, setActive }) => (
  <GuildBox
    width="100%"
    height="100%"
    display="flex"
    flexDirection="column"
    background="ghostWhite"
    overflow="scroll"
    css={`
      border-right: 1px solid ${theme.colors.ghostWhite};
    `}
  >
    {conversations.map(({ sender, ...conversation }, key) => (
      <StyledConversationItem
        onClick={() => setActive(conversation)}
        active={active.id === conversation.id}
        key={key}
      >
        <GuildBox display="flex" alignSelf="flex-end">
          <Text size="xxs" color="darkGray">
            {conversation.date}
          </Text>
        </GuildBox>

        <GuildBox alignItems="center" display="flex">
          <GuildBox flexShrink={0}>
            <Avatar
              as={Link}
              size={"s"}
              name={sender.name}
              url={sender.avatar}
              to={`/profiles/${sender.id}`}
            />
          </GuildBox>

          <GuildBox
            ml={"s"}
            display="flex"
            flexDirection="column"
            css={flex.flexTruncate}
          >
            <Text
              fontWeight="medium"
              size="m"
              color="catalinaBlue100"
              css={flex.flexTruncate}
            >
              {conversation.subject}
            </Text>
            <Text size="xs" color="quartz">
              {sender.name}
            </Text>
          </GuildBox>
        </GuildBox>
      </StyledConversationItem>
    ))}
  </GuildBox>
);

export default Conversations;
