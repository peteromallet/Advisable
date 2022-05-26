import React from "react";
import SimpleBar from "simplebar-react";
import * as Sentry from "@sentry/react";
import { Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import ConversationMessages from "./ConversationMessages";
import ConversationHeader from "./ConversationHeader";
import ConversationNotFound from "./ConversationNotFound";
import ConversationError from "./ConversationError";
import ConversationDetails from "./ConversationDetails";

export default function Conversation({ conversations, currentAccount }) {
  const { id } = useParams();
  const conversation = conversations.find((c) => c.id === id);

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <Sentry.ErrorBoundary fallback={ConversationError}>
        {conversation ? (
          <div className="block lg:hidden">
            <ConversationHeader conversation={conversation} />
          </div>
        ) : null}
        <Box
          height="100%"
          minHeight="0"
          width="100%"
          flexGrow={1}
          flexShrink={1}
          position="relative"
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
        <div className="hidden lg:block shrink-0 w-[360px] border-l border-solid border-neutral100">
          <SimpleBar className="h-viewport">
            <ConversationDetails conversation={conversation} />
          </SimpleBar>
        </div>
      </Sentry.ErrorBoundary>
    </div>
  );
}
