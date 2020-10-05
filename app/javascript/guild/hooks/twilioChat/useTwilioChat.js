import { useState, useEffect } from "react";
import { useTwilioClient } from "@guild/hooks/twilioChat/useTwilioClient";

export const useTwilioChat = ({ channelSid }) => {
  const { client } = useTwilioClient();
  const [chatState, setChatState] = useState({
    messages: [],
    initializing: false,
    activeChannel: null,
  });

  useEffect(() => {
    if (!client || !channelSid) return;
    let channel;
    const pageSize = 50;
    setChatState((prev) => ({ ...prev, initializing: true }));

    const initializeChannel = async () => {
      channel = await client.getChannelBySid(channelSid);
      const messages = await channel.getMessages(pageSize);
      channel.on("messageAdded", onMessageAdded);

      setChatState({
        activeChannel: channel,
        messages: messages?.items,
        initializing: false,
      });
    };
    initializeChannel();

    return () => channel && channel.removeAllListeners();
  }, [client, channelSid]);

  const onMessageAdded = (message) => {
    console.log("onMessageAdded", message);
    setChatState((prev) => ({
      ...prev,
      initializing: false,
      messages: prev.messages.concat(message),
    }));
  };

  const { messages, activeChannel, initializing } = chatState;
  return { messages, activeChannel, initializing };
};
