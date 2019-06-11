import { useEffect, useState } from "react";
import useTalkSession from "./useTalkSession";

const useMessageCount = () => {
  const [messageCount, setMessageCount] = useState(0);
  const talkSession = useTalkSession();

  const handleUnread = conversations => {
    setMessageCount(conversations.length);
  };

  useEffect(() => {
    if (!talkSession) return;
    talkSession.unreads.on("change", handleUnread);
  }, [talkSession]);

  return messageCount;
};

export default useMessageCount;
