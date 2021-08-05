import React from "react";
import ConversationLink from "./ConversationLink";

export default function ConversationsList({ conversations }) {
  return conversations.map((conversation) => (
    <ConversationLink key={conversation.id} conversation={conversation} />
  ));
}
