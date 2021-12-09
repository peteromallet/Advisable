import React, { useLayoutEffect } from "react";
import { Box, useBreakpoint, useTheme } from "@advisable/donut";
import { useConversations, useReceivedMessage } from "./queries";
import { Route, Redirect, Switch, useRouteMatch } from "react-router-dom";
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

  const isMobileView = useRouteMatch({ path: "/messages", exact: !isDesktop });

  if (hasConversations && isDesktop) {
    return <Redirect to={`/messages/${ordered[0].id}`} />;
  }

  return (
    <Box display="flex">
      {isMobileView && (
        <MessagesSidebar loading={loading} conversations={ordered} />
      )}
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
