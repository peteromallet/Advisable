import React from "react";
import { Box } from "@advisable/donut";
import { use100vh } from "react-div-100vh";
import { Switch, Route, Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Conversation from "./Conversation";
import ConversationsList from "./ConversationsList";

const MESSAGES = gql`
  query messages {
    conversations {
      id
      participants {
        id
        name
      }
      lastMessage {
        id
        content
        createdAt
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
        conversation {
          id
          participants {
            id
            name
          }
          lastMessage {
            id
            content
            createdAt
          }
        }
      }
    }
  }
`;

export default function NewMessages() {
  const height = use100vh();
  const { loading, data, subscribeToMore } = useQuery(MESSAGES);

  React.useEffect(() => {
    subscribeToMore({
      document: NEW_MESSAGE,
      onError: (e) => {
        console.log("ERROR");
        console.log(e);
      },
      updateQuery: (prev, { subscriptionData }) => {
        const conversation =
          subscriptionData?.data?.newMessage?.message?.conversation;
        if (!conversation) return prev;

        return {
          ...prev,
          conversations: [conversation, ...prev.conversations].reduce(
            (collection, conversation) => {
              const exists = collection.find((c) => c.id === conversation.id);
              return exists ? collection : [...collection, conversation];
            },
            [],
          ),
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) return <>loading...</>;

  const conversations = data?.conversations || [];

  return (
    <Box height={height - 60} width="100%" display="flex">
      <ConversationsList conversations={conversations} />
      <Switch>
        {conversations.length > 0 ? (
          <Redirect
            exact
            path="/messages"
            to={`/messages/${conversations[0].id}`}
          />
        ) : null}
        <Route path="/messages/:id" component={Conversation} />
      </Switch>
    </Box>
  );
}
