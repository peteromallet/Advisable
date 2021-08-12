import Talk from "talkjs";
import { useEffect, useState } from "react";
import useViewer from "./useViewer";
import createTalkSession from "../utilities/createTalkSession";
import { useQuery, gql } from "@apollo/client";

export function useTalkJSMessageCount() {
  const viewer = useViewer();
  const [messageCount, setMessageCount] = useState(0);

  const handleUnread = (conversations) => {
    setMessageCount(conversations.length);
  };

  useEffect(() => {
    if (!viewer) return;
    Talk.ready.then(() => {
      const session = createTalkSession(viewer);
      session.unreads.on("change", handleUnread);
    });
  }, [viewer]);

  return messageCount;
}

const CONVERSATIONS = gql`
  query ConversationUnreadMessageCounts {
    conversations {
      nodes {
        id
        unreadMessageCount
      }
    }
  }
`;

export function useNativeMessageCount() {
  const { data } = useQuery(CONVERSATIONS);
  const conversations = data?.conversations?.nodes || [];

  return conversations.reduce((total, conversation) => {
    return total + conversation.unreadMessageCount;
  }, 0);
}
