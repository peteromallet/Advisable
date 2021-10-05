import React, { useLayoutEffect } from "react";
import { Box, useBreakpoint, useTheme } from "@advisable/donut";
import { useConversations, useReceivedMessage } from "./queries";
import { Redirect, Switch } from "react-router-dom";
import Route from "src/components/Route";
import Loading from "src/components/Loading";
import Conversation from "./components/Conversation";
import NoConversations from "./components/NoConversations";
import MessagesSidebar from "./components/MessagesSidebar";
import useOrderedConversations from "./hooks/useOrderedConversations";

export default function Messages() {
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
      <Route path="/messages" exact={!isDesktop}>
        <MessagesSidebar loading={loading} conversations={ordered} />
      </Route>
      <Box width="100%" height="calc(100vh - var(--header-height))">
        {loading && <Loading />}
        <Switch>
          {hasConversations && (
            <Route path="/messages/:id">
              <Conversation
                conversations={conversations}
                currentAccount={data?.currentAccount}
              />
            </Route>
          )}
          {hasConversations && isDesktop && (
            <Redirect to={`/messages/${ordered[0].id}`} />
          )}
          {!loading && isDesktop && (
            <Route>
              <NoConversations />
            </Route>
          )}
        </Switch>
      </Box>
    </Box>
  );
}
