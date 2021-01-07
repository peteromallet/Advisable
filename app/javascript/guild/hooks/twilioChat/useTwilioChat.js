import { useState, useEffect, useCallback } from "react";
import useTwilio from "../../components/TwilioProvider/useTwilioChat";

export const useTwilioChat = ({ channelSid }) => {
  const { client } = useTwilio();
  const [chatState, setChatState] = useState({
    messages: [],
    initializing: true,
    activeChannel: null,
    fetchingMoreMessages: false,
  });

  useEffect(() => {
    if (!client || !channelSid) return;
    if (chatState.activeChannel?.sid === channelSid) return;

    const initializeChannel = async () => {
      const pageSize = 50;
      setChatState((prev) => ({ ...prev, initializing: true }));

      const channel = await client.getChannelBySid(channelSid);
      const paginator = await channel.getMessages(pageSize);
      setChatState({
        activeChannel: channel,
        messages: paginator?.items,
        initializing: false,
        paginator,
      });
    };

    initializeChannel();
  }, [client, channelSid, chatState.activeChannel]);

  const onMessageAdded = useCallback(async (message) => {
    await message.channel.setAllMessagesConsumed();
    setChatState((prev) => ({
      ...prev,
      initializing: false,
      messages: prev.messages.concat(message),
    }));
  }, []);

  const onLoadPreviousMessages = async () => {
    setChatState({ ...chatState, fetchingMoreMessages: true });
    const { paginator: old, activeChannel } = chatState;
    const paginator = await old.prevPage();
    await activeChannel.setAllMessagesConsumed();

    setChatState((prev) => ({
      ...prev,
      paginator,
      messages: [...paginator.items, ...prev.messages],
      fetchingMoreMessages: false,
    }));
  };

  useEffect(() => {
    if (chatState.activeChannel) {
      chatState.activeChannel.on("messageAdded", onMessageAdded);
      return () => {
        chatState.activeChannel.removeListener("messageAdded", onMessageAdded);
      };
    }
  }, [chatState.activeChannel, onMessageAdded]);

  return { ...chatState, onLoadPreviousMessages };
};
