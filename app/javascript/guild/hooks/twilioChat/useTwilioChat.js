import { useState, useEffect, useCallback } from "react";
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
      const paginator = await channel.getMessages(pageSize);
      setChatState({
        activeChannel: channel,
        messages: paginator?.items,
        initializing: false,
        paginator,
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

  const onMessageAdded = useCallback(async (message) => {
    setChatState((prev) => ({
      ...prev,
      initializing: false,
      messages: prev.messages.concat(message),
    }));
  }, []);

  const onLoadPreviousMessages = async () => {
    const { paginator: old, activeChannel } = chatState;
    const paginator = await old.prevPage();
    await activeChannel.setAllMessagesConsumed();

    setChatState((prev) => ({
      ...prev,
      paginator,
      messages: [...paginator.items, ...prev.messages],
    }));
  };

  return { ...chatState, onLoadPreviousMessages };
};
