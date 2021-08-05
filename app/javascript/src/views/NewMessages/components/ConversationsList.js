import { DateTime } from "luxon";
import React, { useMemo } from "react";
import ConversationLink from "./ConversationLink";

export default function ConversationsList({ conversations }) {
  const orderedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      return (
        DateTime.fromISO(b.lastMessage?.createdAt) -
        DateTime.fromISO(a.lastMessage?.createdAt)
      );
    });
  }, [conversations]);

  return orderedConversations.map((conversation) => (
    <ConversationLink key={conversation.id} conversation={conversation} />
  ));
}
