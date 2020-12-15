import { useCallback, useEffect, useState, useMemo } from "react";
import { useTwilioClient } from "./useTwilioClient";

export const useTwilioChannels = () => {
  const { client } = useTwilioClient();

  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);

  const refreshSubscribedChannels = useCallback(async () => {
    if (!client) return;

    const resp = await client.getSubscribedChannels();
    if (resp?.items?.length) {
      setChannels(resp.items);
    }
  }, [client]);

  useEffect(() => {
    if (!client) return;

    const initializeChat = async () => {
      await refreshSubscribedChannels();
      setLoading(false);
    };

    initializeChat();
    return () => client && client.removeAllListeners();
  }, [client, refreshSubscribedChannels]);

  return {
    client,
    loading,
    channels,
    refreshSubscribedChannels,
  };
};

function getUnreadCountFromChannel(channel) {
  return channel.lastMessage.index - channel.lastConsumedMessageIndex;
}

export default function useUnreadCount() {
  const { client, channels } = useTwilioChannels();
  const [counts, setCounts] = useState({});

  const handleChannelUpdated = useCallback((e) => {
    setCounts((existing) => ({
      ...existing,
      [e.channel.sid]: getUnreadCountFromChannel(e.channel),
    }));
  }, []);

  useEffect(() => {
    if (!client) return;

    client.addListener("channelUpdated", handleChannelUpdated);
    return () => client.removeListener("channelUpdated", handleChannelUpdated);
  }, [client, handleChannelUpdated]);

  useEffect(() => {
    setCounts(
      channels.reduce((previous, channel) => {
        return {
          ...previous,
          [channel.sid]: getUnreadCountFromChannel(channel),
        };
      }, {}),
    );
  }, [channels]);

  const count = useMemo(() => {
    return Object.values(counts).reduce((a, b) => a + b, 0);
  }, [counts]);

  return count;
}
