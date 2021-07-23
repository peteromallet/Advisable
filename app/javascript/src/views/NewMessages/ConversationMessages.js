import React, { useRef, useMemo, useEffect, useLayoutEffect } from "react";
import { Stack } from "@advisable/donut";
import { useMessages, useUpdateLastRead } from "./queries";
import Message from "./Message";

// Poll every 5 minutes as fallback if subscriptions fail
const POLL = 300000;

export default function ConversationMessages({ conversation }) {
  const { data } = useMessages({
    pollInterval: POLL,
    variables: { id: conversation.id },
  });
  const endOfMessagesRef = useRef(null);
  const [updateLastRead] = useUpdateLastRead(conversation);

  const messageEdges = useMemo(() => {
    const edges = data?.conversation?.messages?.edges || [];
    return [...edges].sort((x, y) => {
      return x.node.createdAt - y.node.createdAt;
    });
  }, [data?.conversation?.messages]);

  useEffect(() => {
    if (conversation.unreadMessageCount > 0) {
      updateLastRead();
    }
  }, [conversation.unreadMessageCount, updateLastRead]);

  useLayoutEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messageEdges]);

  return (
    <>
      <Stack paddingY={10} spacing="4xl" divider="neutral200">
        {messageEdges.map((edge) => (
          <Message key={edge.node.id} message={edge.node} />
        ))}
      </Stack>
      <div ref={endOfMessagesRef} />
    </>
  );
}
