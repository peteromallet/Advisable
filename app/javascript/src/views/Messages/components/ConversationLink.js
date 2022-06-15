import React from "react";
import pluralize from "pluralize";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Calendar } from "@styled-icons/heroicons-solid";
import { Avatar, StyledAvatar, Tooltip } from "@advisable/donut";
import commaSeparated from "src/utilities/commaSeparated";

export const StyledAvatars = styled.div`
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

export default function ConversationLink({ conversation }) {
  const others = conversation.participants.filter((p) => !p.isViewer);

  let numOfCalls;
  if (others.length === 1) {
    numOfCalls = others[0].upcomingInterviews.length;
  }
  const tooltipContent = `${numOfCalls} upcoming ${pluralize(
    "call",
    numOfCalls,
  )}`;

  return (
    <NavLink
      id={conversation.id}
      className="conversation-link"
      data-testid="conversationLink"
      to={`/messages/${conversation.id}`}
    >
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
      <div className="pl-2 min-w-0 w-full">
        <div className="flex items-center gap-1">
          <h5 className="font-medium text-neutral900 truncate">
            {commaSeparated(others.map((p) => p.firstName))}
          </h5>
          {numOfCalls > 0 && (
            <Tooltip placement="bottom" maxWidth={200} content={tooltipContent}>
              <div
                aria-label={tooltipContent}
                className="items-center justify-center hidden xl:flex min-w-[16px] h-[16px] hover:opacity-100 opacity-70"
              >
                <Calendar className="fill-neutral700" />
              </div>
            </Tooltip>
          )}
        </div>
        <p className="text-sm text-neutral600 truncate">
          {conversation.lastMessage?.content || "-"}
        </p>
      </div>
      {conversation.unreadCount > 0 && (
        <div className="flex-shrink-0 ml-4 mr-2 right-2 top-2 static md:absolute xl:static">
          <div
            className="py-1 px-2 rounded-full bg-blue500 text-white text-xs font-semibold leading-none"
            data-testid="conversationUnreadCount"
          >
            {conversation.unreadCount}
          </div>
        </div>
      )}
    </NavLink>
  );
}
