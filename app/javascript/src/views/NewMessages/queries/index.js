import { useMutation, useQuery, useSubscription } from "@apollo/client";
import CONVERSATIONS from "./conversations.gql";
import MESSAGES from "./messages.gql";
import SEND_MESSAGE from "./sendMessage.gql";
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

function updateMessages(client, message) {
  const existing = client.cache.readQuery({
    query: MESSAGES,
    variables: { id: message.conversation.id },
  });

  if (!existing) return;

  // const conversationPath = matchPath(location.pathname, {
  //   path: "/new_messages/:id",
  // });

  // const isViewingConversation =
  //   conversationPath?.params?.id === message.conversation.id;

  client.cache.writeQuery({
    query: MESSAGES,
    variables: { id: message.conversation.id },
    data: {
      ...existing,
      conversation: {
        ...existing.conversation,
        messages: {
          ...existing.conversation.messages,
          edges: [...existing.conversation.messages.edges, { node: message }],
        },
      },
    },
  });
}

export function useReceivedMessage() {
  return useSubscription(RECEIVED_MESSAGE, {
    onSubscriptionData({ client, subscriptionData }) {
      const message = subscriptionData.data?.receivedMessage?.message;

      client.cache.modify({
        id: client.cache.identify(message.conversation),
        fields: {
          lastMessage() {
            return message;
          },
          unreadMessageCount(existing) {
            return existing + 1;
          },
        },
      });

      updateConversationsList(client, message);
      updateMessages(client, message);
    },
  });
}
