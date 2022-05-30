import React from "react";
import { Box, useBackground, useBreakpoint } from "@advisable/donut";
import { useConversations } from "./queries";
import { Route, Navigate, Routes, useMatch } from "react-router-dom";
import Loading from "src/components/Loading";
import Conversation from "./components/Conversation";
import NoConversations from "./components/NoConversations";
import MessagesSidebar from "./components/MessagesSidebar";
import useOrderedConversations from "./hooks/useOrderedConversations";
import "./messages.css";

export default function Messages() {
  useBackground("beige");
  const { data, loading } = useConversations();
  const isDesktop = useBreakpoint("mUp");

  const conversations = data?.conversations?.nodes || [];
  const hasConversations = conversations.length > 0;
  const ordered = useOrderedConversations(conversations);

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
