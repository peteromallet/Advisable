import React from "react";
import * as Sentry from "@sentry/react";
import { Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import ConversationMessages from "./ConversationMessages";
import ConversationHeader from "./ConversationHeader";
import ConversationNotFound from "./ConversationNotFound";
import ConversationError from "./ConversationError";

export default function Conversation({ conversations, currentAccount }) {
  const { id } = useParams();
  const conversation = conversations.find((c) => c.id === id);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Sentry.ErrorBoundary fallback={ConversationError}>
        {conversation ? (
          <ConversationHeader conversation={conversation} />
        ) : null}
        <Box
          height="100%"
          minHeight="0"
          width="100%"
          flexGrow={1}
          flexShrink={1}
        >
          {conversation ? (
            <ConversationMessages
              conversation={conversation}
              currentAccount={currentAccount}
            />
          ) : (
            <ConversationNotFound />
          )}
        </Box>
      </Sentry.ErrorBoundary>
    </Box>
  );
}
