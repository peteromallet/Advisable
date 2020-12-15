import { useState, useEffect, useCallback } from "react";
import useTwilio from "../../components/TwilioProvider/useTwilioChat";

export const useTwilioChat = ({ channelSid }) => {
  const { client } = useTwilio();
  const [chatState, setChatState] = useState({
    messages: [],
    initializing: false,
    activeChannel: null,
    fetchingMoreMessages: false,
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

    initializeChannel();
  }, [client, channelSid, onMessageAdded]);

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

  return { ...chatState, onLoadPreviousMessages };
};
