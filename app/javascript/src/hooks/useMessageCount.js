import { useQuery, gql } from "@apollo/client";

const CONVERSATIONS = gql`
  query ConversationUnreadCounts {
    conversations {
      nodes {
        id
        unreadCount
      }
    }
  }
`;

export default function useMessageCount() {
  const { data } = useQuery(CONVERSATIONS);
  const conversations = data?.conversations?.nodes || [];

  return conversations.reduce((total, conversation) => {
    return total + conversation.unreadCount;
  }, 0);
}
