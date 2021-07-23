import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { matchPath, useLocation } from "react-router-dom";
import CONVERSATIONS from "./conversations.gql";
import MESSAGES from "./messages.gql";
import SEND_MESSAGE from "./sendMessage.gql";
import UPDATE_LAST_READ from "./updateLastRead.gql";
import RECEIVED_MESSAGE from "./receivedMessage.gql";

export function useConversations() {
  return useQuery(CONVERSATIONS);
}

export function useMessages(opts) {
  return useQuery(MESSAGES, opts);
}

export function useSendMessage(conversation) {
  return useMutation(SEND_MESSAGE, {
    update(cache, response) {
      const message = response.data?.sendMessage?.message;
      if (message) {
        cache.modify({
          id: cache.identify(conversation),
          fields: {
            unreadMessageCount() {
              return 0;
            },
            lastMessage() {
              return message;
            },
            messages(previous) {
              return {
                ...previous,
                edges: [...previous.edges, { node: message }],
              };
            },
          },
        });
      }
    },
  });
}

export function useUpdateLastRead(conversation) {
  return useMutation(UPDATE_LAST_READ, {
    variables: {
      conversation: conversation.id,
    },
    optimisticResponse: {
      updateLastRead: {
        __typename: "UpdateLastReadPayload",
        conversation: {
          ...conversation,
          unreadMessageCount: 0,
        },
      },
    },
  });
}

async function updateConversationsList(client, message) {
  const existing = client.cache.readQuery({ query: CONVERSATIONS });
  const present = existing.conversations.nodes.find(
    (n) => n.id === message.conversation.id,
  );
  if (present) return;
  const { data } = await client.query({
    query: CONVERSATIONS,
    fetchPolicy: "network-only",
  });
  client.cache.writeQuery({
    query: CONVERSATIONS,
    data,
  });
}

function updateMessages(client, location, message) {
  const existing = client.cache.readQuery({
    query: MESSAGES,
    variables: { id: message.conversation.id },
  });

  if (!existing) return;

  const conversationPath = matchPath(location.pathname, {
    path: "/new_messages/:id",
  });

  const isViewingConversation =
    document.hasFocus() &&
    conversationPath?.params?.id === message.conversation.id;

  client.cache.modify({
    id: client.cache.identify(message.conversation),
    fields: {
      unreadMessageCount() {
        return isViewingConversation
          ? 0
          : message.conversation.unreadMessageCount;
      },
      lastMessage() {
        return message;
      },
      messages(previous) {
        return {
          ...previous,
          edges: [...previous.edges, { node: message }],
        };
      },
    },
  });
}

export function useReceivedMessage() {
  const location = useLocation();
  return useSubscription(RECEIVED_MESSAGE, {
    onSubscriptionData({ client, subscriptionData }) {
      const message = subscriptionData.data?.receivedMessage?.message;
      updateConversationsList(client, message);
      updateMessages(client, location, message);
    },
  });
}
