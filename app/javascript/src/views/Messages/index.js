import React, { useLayoutEffect } from "react";
import { Box, useBreakpoint, useTheme } from "@advisable/donut";
import { useConversations } from "./queries";
import { Route, Navigate, Routes, useMatch } from "react-router-dom";
import Loading from "src/components/Loading";
import Conversation from "./components/Conversation";
import NoConversations from "./components/NoConversations";
import MessagesSidebar from "./components/MessagesSidebar";
import useOrderedConversations from "./hooks/useOrderedConversations";

export default function Messages() {
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

  const isMobileView = useMatch({ path: "/messages", end: !isDesktop });

  return (
    <Box display="flex">
      {isMobileView && (
        <MessagesSidebar loading={loading} conversations={ordered} />
      )}
      <Box width="100%" height="calc(100vh - var(--header-height))">
        {loading && <Loading />}
        <Routes>
          {hasConversations && (
            <Route
              path="/:id"
              element={
                <Conversation
                  conversations={conversations}
                  currentAccount={data?.currentAccount}
                />
              }
            />
          )}
          {hasConversations && isDesktop && (
            <Route path="*" element={<Navigate to={ordered[0].id} />} />
          )}
          {!loading && isDesktop && (
            <Route path="*" element={<NoConversations />} />
          )}
        </Routes>
      </Box>
    </Box>
  );
}
