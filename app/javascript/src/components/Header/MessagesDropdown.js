import React from "react";
import pluralize from "pluralize";
import SimpleBar from "simplebar-react";
import { Chat } from "@styled-icons/heroicons-solid";
import { Avatar, Tooltip } from "@advisable/donut";
import Popover, { usePopoverState } from "./Popover";
import {
  useConversations,
  useReceivedMessage,
} from "src/views/Messages/queries";
import { Link } from "react-router-dom";
import commaSeparated from "src/utilities/commaSeparated";
import { StyledAvatars } from "src/views/Messages/components/ConversationLink";
import { Calendar } from "@styled-icons/heroicons-solid";
import HeaderButton from "./HeaderButton";
import Loading from "../Loading";
import MessagesIllustration from "src/illustrations/zest/messages";
import useOrderedConversations from "src/views/Messages/hooks/useOrderedConversations";

function Conversation({ conversation }) {
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
    <Link
      to={`/messages/${conversation.id}`}
      className="flex items-center gap-2 p-3 hover:bg-neutral50"
    >
      <div className="shrink-0">
        <StyledAvatars data-count={others.length}>
          {others.map((p) => (
            <Avatar key={p.id} name={p.firstName} url={p.avatar} />
          ))}
        </StyledAvatars>
      </div>
      <div className="min-w-0 w-full">
        <div className="flex items-center gap-1 mb-1">
          <p className="font-medium leading-none truncate">
            {commaSeparated(others.map((p) => p.firstName))}
          </p>
          {numOfCalls > 0 && (
            <Tooltip placement="bottom" maxWidth={200} content={tooltipContent}>
              <Calendar
                className="hidden xl:block min-w-[16px] h-[16px] fill-neutral700 hover:opacity-100 opacity-70"
                aria-label={tooltipContent}
              />
            </Tooltip>
          )}
        </div>
        <p className="text-neutral600 text-sm leading-4 truncate">
          {conversation.lastMessage?.content || "-"}
        </p>
      </div>
      {conversation.unreadCount > 0 && (
        <div className="w-2 h-2 mr-2 bg-blue500 rounded-full shrink-0" />
      )}
    </Link>
  );
}

function NoMessages() {
  return (
    <div className="text-center p-8">
      <MessagesIllustration
        width="120px"
        className="mb-4 mx-auto"
        color="var(--color-blue100)"
      />
      <span className="text-neutral900 font-medium">No Messages</span>
      <p className="text-neutral700 text-sm">
        You aren't part of any conversation yet.
      </p>
    </div>
  );
}

export default function MessagesDropdown() {
  useReceivedMessage();
  const popover = usePopoverState();
  const { loading, data } = useConversations();
  const conversations = data?.conversations?.nodes || [];
  const ordered = useOrderedConversations(conversations);

  const unreadCount = conversations.reduce((total, conversation) => {
    return total + conversation.unreadCount;
  }, 0);

  const hasConversations = conversations.length > 0;

  return (
    <Popover
      state={popover}
      disclosure={
        <HeaderButton
          aria-label="Messages dropdown"
          count={unreadCount}
          icon={Chat}
        />
      }
    >
      <div className="w-[400px]">
        <h5 className="py-3 px-4 border-b border-solid border-neutral100 text-lg font-medium">
          Messages
        </h5>
        <div>
          <SimpleBar style={{ maxHeight: 320 }}>
            <div className="divide-y divide-solid divide-neutral100">
              {ordered.map((c) => (
                <div key={c.id} onClick={popover.hide}>
                  <Conversation conversation={c} />
                </div>
              ))}
            </div>
          </SimpleBar>
          {loading && <Loading />}
          {!loading && !hasConversations && <NoMessages />}
        </div>
        {hasConversations && (
          <Link
            to="/messages"
            className="text-sm font-medium p-3 border-t border-solid border-neutral100 text-center block text-neutral600 hover:text-blue700"
            onClick={popover.hide}
          >
            View all messages
          </Link>
        )}
      </div>
    </Popover>
  );
}
