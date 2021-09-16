import React from "react";
import * as Sentry from "@sentry/react";
import { Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import ConversationMessages from "./ConversationMessages";
import ConversationHeader from "./ConversationHeader";

function ConversationError() {
  return (
    <Box
      my={8}
      mx="auto"
      padding={4}
      width="400px"
      bg="neutral100"
      textAlign="center"
      borderRadius="12px"
    >
      Failed to load conversation, please try again.
    </Box>
  );
}

export default function Conversation({ conversations, currentAccount }) {
  const { id } = useParams();
  const conversation = conversations.find((c) => c.id === id);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Sentry.ErrorBoundary fallback={ConversationError}>
        <ConversationHeader conversation={conversation} />
        <Box
          height="100%"
          minHeight="0"
          width="100%"
          flexGrow={1}
          flexShrink={1}
        >
          <ConversationMessages
            conversation={conversation}
            currentAccount={currentAccount}
          />
        </Box>
      </Sentry.ErrorBoundary>
    </Box>
  );
}
