import React from "react";
import * as Sentry from "@sentry/react";
import SimpleBar from "simplebar-react";
import { Box, Heading, Text, Skeleton } from "@advisable/donut";
import ConversationsList from "./ConversationsList";

function LoadingConversations() {
  return (
    <Box padding={3}>
      <Skeleton height="60px" borderRadius="12px" marginBottom={2} />
      <Skeleton height="60px" borderRadius="12px" marginBottom={2} />
      <Skeleton height="60px" borderRadius="12px" />
    </Box>
  );
}

export default function MessagesSidebar({ loading, conversations }) {
  return (
    <Box
      flexShrink="0"
      bg="white"
      height="calc(100vh - var(--header-height))"
      width={{ _: "100%", l: "380px" }}
      css={`
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      `}
    >
      <Sentry.ErrorBoundary
        fallback={
          <>
            Failed to load conversations list, please try refreshing the page.
          </>
        }
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
          <SimpleBar
            style={{ height: "calc(100vh - var(--header-height) - 72px)" }}
          >
            {loading && <LoadingConversations />}
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
      </Sentry.ErrorBoundary>
    </Box>
  );
}
