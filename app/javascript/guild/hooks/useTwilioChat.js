import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@apollo/client";
import useViewer from "@advisable-main/hooks/useViewer";
import { gql } from "@apollo/client";
import { relativeDate } from "@guild/utils";
import * as Chat from "twilio-chat";

const CHAT_GRANT_QUERY = gql`
  query chatGrant {
    chatGrant {
      identity
      accessToken
    }
  }
`;

export const useTwilioChat = (initialChannelSid) => {
  const viewer = useViewer();
  const client = useRef(null);

  const [loading, setLoading] = useState(true);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  const { data, refetch } = useQuery(CHAT_GRANT_QUERY);

  useEffect(() => {
    if (!data?.chatGrant?.accessToken) return;
    const { accessToken } = data.chatGrant;

    const initializeChat = async () => {
      try {
        const chatClient = await Chat.Client.create(accessToken);
        chatClient.on("tokenAboutToExpire", onTokenExpiration);
        chatClient.on("tokenExpired", onTokenExpiration);
        chatClient.on("channelJoined", onChannelJoined);
        chatClient.on("channelUpdated", onChannelUpdated);
        client.current = chatClient;
        await refreshSubscribedChannels();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    initializeChat();
    return () => client.current && client.current.removeAllListeners();
  }, [data, onTokenExpiration, onChannelUpdated, refreshSubscribedChannels]);

  useEffect(() => {
    if (activeChannel || !subscribedChannels.length) return;
    selectActiveChannel(initialChannelSid);
  }, [subscribedChannels]);

  const onChannelJoined = (channel) =>
    console.debug("onChannelJoined", channel);

  /* Event to handle any channel update on the client */
  const onChannelUpdated = useCallback(
    (channel) => {
      console.debug("onChannelUpdated", channel);
      const lastMessageUpdate = channel.updateReasons.some(
        (r) => r === "lastMessage",
      );
      if (lastMessageUpdate) console.log("update friendly name ...");
      refreshSubscribedChannels();
    },
    [refreshSubscribedChannels],
  );

  /* Event to handle token expiration */
  const onTokenExpiration = useCallback(async () => {
    const { data: refresh } = await refetch();
    const updatedToken = refresh?.chatGrant?.accessToken;
    updatedToken && client?.current.updateToken(updatedToken);
  }, [refetch, client]);

  const selectActiveChannel = async (channelSid) => {
    let channel;

    if (channelSid) {
      const newChannel = await client?.current?.getChannelBySid(channelSid);
      channel = await normalizeChannel(newChannel);
    } else {
      channel = subscribedChannels[0];
    }
    setActiveChannel(channel);
  };

  /* Fetch private channels, members, and normalize */
  const refreshSubscribedChannels = useCallback(async () => {
    if (!client.current) return;

    const resp = await client.current.getSubscribedChannels();

    if (resp?.items?.length) {
      const subscribed = resp.items.map((channel) => normalizeChannel(channel));
      Promise.all(subscribed).then((channels) => {
        const sortedChannels = channels.sort(
          (a, b) => b.lastMessageDateTime - a.lastMessageDateTime,
        );
        setSubscribedChannels(sortedChannels);
      });
    }
  }, [client, viewer]);

  const normalizeChannel = async (channel) => {
    const channelMembers = await channel.getMembers();
    const other = channelMembers.filter((m) => m.identity !== viewer.id)[0];

    const { friendlyName, lastMessage } = channel.channelState;
    const lastMessageDateTime = lastMessage?.dateCreated || new Date();
    const lastMessageWords = relativeDate(lastMessageDateTime);
    return {
      channelMembers,
      other,
      friendlyName,
      lastMessageWords,
      lastMessageDateTime,
      ...channel,
    };
  };

  return {
    client,
    loading,
    subscribedChannels,
    activeChannel,
    selectActiveChannel,
  };
};

/* 
  Client: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Client.html
  Channel: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Channel.html
  Member: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Member.html
*/
