import React from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Box } from "@advisable/donut";
import Message from "./Message";
import Composer from "./Composer";
import ScrollToBottom from "./ScrollToBottom";

const GET_MESSAGES = gql`
  query getMessages($id: ID!) {
    conversation(id: $id) {
      id
      messages {
        id
        content
        createdAt
        account {
          id
          name
        }
      }
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      message {
        id
        content
        createdAt
        conversation {
          id
        }
        account {
          id
          name
        }
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      message {
        id
        content
      }
    }
  }
`;

export default function Conversation() {
  const { id } = useParams();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { loading, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    fetchPolicy: "network-only",
    variables: { id },
  });

  React.useEffect(() => {
    return subscribeToMore({
      document: NEW_MESSAGE,
      onError: (e) => {
        console.log("ERROR FETCHING NEW MESSAGES");
        console.log(e);
      },
      updateQuery: (prev, { subscriptionData }) => {
        const message = subscriptionData?.data?.newMessage?.message;
        if (!message || message.conversation.id !== id) return prev;

        return {
          ...prev,
          conversation: {
            ...prev.conversation,
            messages: [...prev.conversation.messages, message].reduce(
              (collection, message) => {
                const exists = collection.find((c) => c.id === message.id);
                return exists ? collection : [...collection, message];
              },
              [],
            ),
          },
        };
      },
    });
  }, [id, subscribeToMore]);

  if (loading) return <>loading</>;

  const handleSendMessage = (content) => {
    sendMessage({
      variables: {
        input: {
          conversationId: id,
          content,
        },
      },
    });
  };

  const messages = data?.conversation.messages || [];

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Box height="100%" padding={5} overflow="scroll">
        <AnimatePresence initial={false}>
          {messages?.map((message) => (
            <Box
              key={message.id}
              as={motion.div}
              paddingBottom={6}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Message message={message} />
            </Box>
          ))}
        </AnimatePresence>
        <ScrollToBottom />
      </Box>

      <Box width="100%" px={5} pb={4}>
        <Composer onSubmit={handleSendMessage} />
      </Box>
    </Box>
  );
}
