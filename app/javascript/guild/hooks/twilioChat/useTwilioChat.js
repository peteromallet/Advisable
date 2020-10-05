import { useState, useEffect, useCallback } from "react";
import useViewer from "@advisable-main/hooks/useViewer";
import { useTwilioClient } from "@guild/hooks/twilioChat/useTwilioClient";

export const useTwilioChat = ({ channelSid }) => {
  const viewer = useViewer();
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
      setChatState({
        activeChannel: channel,
        messages: messages?.items,
        initializing: false,
      });
      return channel;
    };
    initializeChannel().then((channel) => {
      channel.on(
        "messageAdded",
        async (message) => await onMessageAdded(message, channel),
      );
    });

    return () => channel && channel.removeAllListeners();
  }, [client, channelSid, onMessageAdded]);

  const onMessageAdded = useCallback(async (message, channel) => {
    await channel.setAllMessagesConsumed();
    console.debug("all messages consumed");
    setChatState((prev) => ({
      ...prev,
      initializing: false,
      messages: prev.messages.concat(message),
    }));
  }, []);

  const { messages, activeChannel, initializing } = chatState;
  return { messages, activeChannel, initializing };
};
