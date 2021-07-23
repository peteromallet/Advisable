import React, { useLayoutEffect } from "react";
import { Box, Heading, useTheme } from "@advisable/donut";
import ConversationLink from "./ConversationLink";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { useConversations, useReceivedMessage } from "./queries";
import { Redirect, Route, Switch } from "react-router-dom";
import Conversation from "./Conversation";

export default function NewMessages() {
  useReceivedMessage();
  const { data } = useConversations();
  const { setTheme } = useTheme();

  const conversations = data?.conversations?.nodes || [];
  const orderedConversations = [...conversations].sort((a, b) => {
    return a?.lastMessage?.createdAt < b?.lastMessage?.createdAt;
  });

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
              {orderedConversations.map((conversation) => (
                <ConversationLink
                  key={conversation.id}
                  conversation={conversation}
                />
              ))}
            </Box>
          </SimpleBar>
        </Box>
      </Box>
      <Box width="100%" height="calc(100vh - 60px)">
        <Switch>
          {orderedConversations.map((conversation) => (
            <Route
              key={conversation.id}
              path={`/new_messages/${conversation.id}`}
            >
              <Conversation conversation={conversation} />
            </Route>
          ))}
          {conversations.length > 0 && (
            <Redirect to={`/new_messages/${conversations[0].id}`} />
          )}
        </Switch>
      </Box>
    </Box>
  );
}
