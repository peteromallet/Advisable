import React from "react";
import * as Sentry from "@sentry/react";
import SimpleBar from "simplebar-react";
import { Box, Text, Skeleton } from "@advisable/donut";
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

const sidebarClasses = `
  flex-shrink-0
  bg-white
  bg-white
  h-[calc(100vh - var(--header-height))]
  w-full md:w-[80px] xl:w-[350px]
  shadow
`;

export default function MessagesSidebar({ loading, conversations }) {
  return (
    <div className={sidebarClasses}>
      <Sentry.ErrorBoundary
        fallback={
          <>
            Failed to load conversations list, please try refreshing the page.
          </>
        }
      >
        <div className="flex flex-col h-viewport">
          <div className="py-3 px-6 flex md:hidden xl:flex flex-shrink-0 items-center border-b border-solid border-neutral100">
            <h3 className="text-lg font-medium">Messages</h3>
          </div>
          <SimpleBar className="flex-1 h-full min-h-0">
            {loading && <LoadingConversations />}
            <div>
              <ConversationsList conversations={conversations} />
            </div>
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
        </div>
      </Sentry.ErrorBoundary>
    </div>
  );
}
