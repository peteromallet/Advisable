import React, { useLayoutEffect } from "react";
import { Box, useBreakpoint, useTheme } from "@advisable/donut";
import { useConversations, useReceivedMessage } from "./queries";
import { Redirect, Switch } from "react-router-dom";
import Route from "src/components/Route";
import Conversation from "./components/Conversation";
import NoConversations from "./components/NoConversations";
import MessagesSidebar from "./components/MessagesSidebar";
import useOrderedConversations from "./hooks/useOrderedConversations";

export default function NewMessages() {
  useReceivedMessage();
  const { data, loading } = useConversations();
  const { setTheme } = useTheme();
  const isDesktop = useBreakpoint("lUp");

  const conversations = data?.conversations?.nodes || [];
  const hasConversations = conversations.length > 0;
  const ordered = useOrderedConversations(conversations);

  useLayoutEffect(() => {
    setTheme((t) => ({ ...t, background: "beige" }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme]);

  return (
    <Box display="flex">
      <Route path="/new_messages" exact={!isDesktop}>
        <MessagesSidebar loading={loading} conversations={ordered} />
      </Route>
      <Box width="100%" height="calc(100vh - 60px)">
        <Switch>
          {hasConversations && (
            <Route path="/new_messages/:id">
              <Conversation conversations={conversations} />
            </Route>
          )}
          {hasConversations && isDesktop && (
            <Redirect to={`/new_messages/${ordered[0].id}`} />
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
