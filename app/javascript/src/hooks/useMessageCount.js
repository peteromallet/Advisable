import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";
import useViewer from "./useViewer";
import createTalkSession from "../utilities/createTalkSession";

const useMessageCount = () => {
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
};

export default useMessageCount;
