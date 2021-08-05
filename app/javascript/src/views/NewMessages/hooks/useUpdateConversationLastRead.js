import { useCallback, useEffect } from "react";
import { useUpdateLastRead } from "../queries";

export default function useUpdateConversationLastRead(conversation) {
  const [updateLastRead] = useUpdateLastRead(conversation);

  const handleUpdateLastRead = useCallback(() => {
    if (conversation.unreadMessageCount > 0) {
      updateLastRead();
    }
  }, [conversation.unreadMessageCount, updateLastRead]);

  useEffect(() => {
    if (document.hasFocus()) {
      handleUpdateLastRead();
    }

    window.addEventListener("focus", handleUpdateLastRead);
    return () => window.removeEventListener("focus", handleUpdateLastRead);
  }, [handleUpdateLastRead]);
}
