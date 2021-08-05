import { useMemo } from "react";
import { DateTime } from "luxon";

export default function useOrderedConversations(conversations = []) {
  return useMemo(() => {
    return [...conversations].sort((a, b) => {
      return (
        DateTime.fromISO(b.lastMessage?.createdAt) -
        DateTime.fromISO(a.lastMessage?.createdAt)
      );
    });
  }, [conversations]);
}
