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
      className="flex items-center p-3 gap-2 hover:bg-neutral50"
    >
      <div className="shrink-0">
        <StyledAvatars data-count={others.length}>
          {others.map((p) => (
            <Avatar key={p.id} name={p.firstName} url={p.avatar} />
          ))}
        </StyledAvatars>
      </div>
      <div className="w-full min-w-0">
        <div className="flex items-center mb-1 gap-1">
          <p className="font-medium leading-none truncate">
            {commaSeparated(others.map((p) => p.firstName))}
          </p>
          {numOfCalls > 0 && (
            <Tooltip placement="bottom" maxWidth={200} content={tooltipContent}>
              <div
                aria-label={tooltipContent}
                className="items-center justify-center hidden xl:flex w-[16px] h-[16px] hover:opacity-100 opacity-70"
              >
                <Calendar className="fill-neutral700" />
              </div>
            </Tooltip>
          )}
        </div>
        <p className="text-sm truncate text-neutral600 leading-4">
          {conversation.lastMessage?.content || "-"}
        </p>
      </div>
      {conversation.unreadCount > 0 && (
        <div className="w-2 h-2 mr-2 rounded-full bg-blue500 shrink-0" />
      )}
    </Link>
  );
}

function NoMessages() {
  return (
    <div className="p-8 text-center">
      <MessagesIllustration
        width="120px"
        className="mx-auto mb-4"
        color="var(--color-blue100)"
      />
      <span className="font-medium text-neutral900">No Messages</span>
      <p className="text-sm text-neutral700">
        You aren&apos;t part of any conversation yet.
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
      label="Messages"
      disclosure={
        <HeaderButton
          aria-label="Messages dropdown"
          count={unreadCount}
          icon={Chat}
        />
      }
    >
      <div className="w-[400px]">
        <h5 className="px-4 py-3 text-lg font-medium border-b border-solid border-neutral100">
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
            className="block p-3 text-sm font-medium text-center border-t border-solid border-neutral100 text-neutral600 hover:text-blue700"
            onClick={popover.hide}
          >
            View all messages
          </Link>
        )}
      </div>
    </Popover>
  );
}
