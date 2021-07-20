import React from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme, Box, Text, Avatar, StyledAvatar } from "@advisable/donut";
import commaSeparated from "src/utilities/commaSeparated";

const StyledAvatars = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  position: relative;

  ${StyledAvatar} {
    position: absolute;
    border: 2px solid white;
    opacity: 0;
    width: 28px;
    height: 28px;
    font-size: 14px;

    &:nth-child(1) {
      top: 0;
      left: 0;
      opacity: 1;
    }

    &:nth-child(2) {
      top: 0;
      right: 0;
      opacity: 1;
    }

    &:nth-child(3) {
      bottom: 0;
      left: 0;
      opacity: 1;
    }

    &:nth-child(4) {
      bottom: 0;
      right: 0;
      opacity: 1;
    }
  }

  &[data-count="3"] {
    ${StyledAvatar} {
      width: 32px;
      height: 32px;
      font-size: 15px;

      &:nth-child(1) {
        top: 0;
        left: 7px;
        opacity: 1;
      }

      &:nth-child(2) {
        left: 0;
        right: auto;
        top: auto;
        bottom: 0;
        opacity: 1;
      }

      &:nth-child(3) {
        left: auto;
        right: 0;
        bottom: 0;
        top: auto;
        opacity: 1;
      }
    }
  }

  &[data-count="2"] {
    ${StyledAvatar} {
      width: 36px;
      height: 36px;
      font-size: 15px;

      &:nth-child(1) {
        top: 0;
        left: 0;
        opacity: 1;
      }

      &:nth-child(2) {
        right: 0;
        top: auto;
        bottom: 0;
        opacity: 1;
      }
    }
  }

  &[data-count="1"] {
    ${StyledAvatar} {
      width: 48px;
      height: 48px;
      font-size: 15px;

      &:first-child {
        top: 2px;
        left: 2px;
        opacity: 1;
      }
    }
  }
`;

const StyledConversationLink = styled(NavLink)`
  margin: 4px -4px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 0 12px 0 4px;
  height: 64px;

  &:hover {
    background: ${theme.colors.neutral50};

    ${StyledAvatar} {
      border-color: ${theme.colors.neutral50};
    }
  }

  &.active {
    background: ${theme.colors.neutral100};

    ${StyledAvatar} {
      border-color: ${theme.colors.neutral100};
    }
  }
`;

export default function ConversationLink({ conversation }) {
  const others = conversation.participants.filter((p) => !p.isViewer);

  return (
    <StyledConversationLink to={`/new_messages/${conversation.id}`}>
      <StyledAvatars data-count={others.length}>
        {others.map((p) => (
          <Avatar
            key={p.id}
            name={p.firstName}
            url={p.avatar}
            color="blue300"
          />
        ))}
      </StyledAvatars>
      <Box paddingLeft={2} minWidth="0">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontWeight={500} color="neutral900" marginBottom={1} $truncate>
            {commaSeparated(others.map((p) => p.firstName))}
          </Text>
          {conversation.lastMessage ? (
            <Box flexShrink={0}>
              <Text color="neutral500" fontSize="2xs">
                {DateTime.fromISO(conversation.lastMessage.createdAt).toFormat(
                  "dd MMM, HH:mma",
                )}
              </Text>
            </Box>
          ) : null}
        </Box>
        <Text fontSize="sm" color="neutral600" $truncate>
          {conversation.lastMessage?.content || "-"}
        </Text>
      </Box>
    </StyledConversationLink>
  );
}
