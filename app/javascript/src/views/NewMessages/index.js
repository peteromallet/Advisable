import { DateTime } from "luxon";
import React, { useLayoutEffect, useMemo } from "react";
import { Box, Heading, Text, useTheme } from "@advisable/donut";
import ConversationLink from "./ConversationLink";
import SimpleBar from "simplebar-react";
import { useConversations, useReceivedMessage } from "./queries";
import { Redirect, Route, Switch } from "react-router-dom";
import Conversation from "./Conversation";
import NoConversations from "./components/NoConversations";

function ConversationsList({ conversations }) {
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

export default function NewMessages() {
  useReceivedMessage();
  const { data, loading } = useConversations();
  const { setTheme } = useTheme();

  const conversations = data?.conversations?.nodes || [];

  useLayoutEffect(() => {
    setTheme((t) => ({ ...t, background: "beige" }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme]);

  return (
    <Box display="flex">
      <Box
        width="380px"
        flexShrink="0"
        bg="white"
        height="calc(100vh - 60px)"
        css={`
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        `}
      >
        <Box display="flex" flexDirection="column" height="100%">
          <Box
            height="72px"
            paddingX={6}
            display="flex"
            flexShrink={0}
            alignItems="center"
            borderBottom="1px solid"
            borderColor="neutral100"
          >
            <Heading size="2xl">Messages</Heading>
          </Box>
          <SimpleBar style={{ height: "calc(100vh - 132px)" }}>
            <Box paddingX={4}>
              <ConversationsList conversations={conversations} />
            </Box>
            {!loading && conversations.length === 0 && (
              <Text
                textAlign="center"
                paddingY={8}
                paddingX={4}
                color="neutral400"
              >
                No conversations
              </Text>
            )}
          </SimpleBar>
        </Box>
      </Box>
      <Box width="100%" height="calc(100vh - 60px)">
        <Switch>
          {conversations.length > 0 && (
            <>
              <Route path="/new_messages/:id">
                <Conversation conversations={conversations} />
              </Route>
              <Redirect to={`/new_messages/${conversations[0].id}`} />
            </>
          )}
          {!loading && (
            <Route>
              <NoConversations />
            </Route>
          )}
        </Switch>
      </Box>
    </Box>
  );
}
