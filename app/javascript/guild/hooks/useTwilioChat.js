import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@apollo/client";
import useViewer from "@advisable-main/hooks/useViewer";
import { gql } from "@apollo/client";
import * as Chat from "twilio-chat";

const CHAT_GRANT_QUERY = gql`
  query chatGrant {
    chatGrant {
      identity
      accessToken
    }
  }
`;

export const useTwilioChat = () => {
  const viewer = useViewer();
  const { data, refetch } = useQuery(CHAT_GRANT_QUERY);
  const client = useRef(null);

  const [subscribedChannels, setSubscribedChannels] = useState([]);
  // const [activeChannel, setActiveChannel] = useState(null);

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
        chatClient.on("typingStarted", onTypingStarted);
        return chatClient;
      } catch (error) {
        console.log(error);
      }
    };

    initializeChat().then((chatClient) => {
      console.log("initializing chat");
      client.current = chatClient;
      refreshSubscribedChannels();
    });

    return () => client.current && client.current.removeAllListeners();
  }, [data, onTokenExpiration, onChannelUpdated, refreshSubscribedChannels]);

  /* When a member has been added to a 1:1 chat */
  const onChannelJoined = (channel) => {
    console.debug("onChannelJoined", channel);
    // refreshSubscribedChannels();
  };

  /* when a channel updates */
  const onChannelUpdated = useCallback(
    (channel) => {
      console.debug("onChannelUpdated", channel);
      const lastMessageUpdate = channel.updateReasons.some(
        (r) => r === "lastMessage",
      );
      if (lastMessageUpdate) updateFriendlyName();
      refreshSubscribedChannels();
    },
    [refreshSubscribedChannels],
  );

  const onTypingStarted = (channel) =>
    console.debug("onTypingStarted", channel);

  /* when the token expires after 24 hours */
  const onTokenExpiration = useCallback(async () => {
    const { data: refresh } = await refetch();
    const updatedToken = refresh?.chatGrant?.accessToken;
    updatedToken && client?.current.updateToken(updatedToken);
  }, [refetch, client]);

  const getChannel = async (channelSid) =>
    await client?.current?.getChannelBySid(channelSid);

  /* fetch all private channels and all respective members  */
  const refreshSubscribedChannels = useCallback(async () => {
    if (!client.current) return;

    const resp = await client.current.getSubscribedChannels();
    const subscribed =
      resp?.items?.length &&
      resp.items.map(async (channel) => {
        const channelMembers = await channel.getMembers();
        const other = channelMembers.filter((m) => m.identity !== viewer.id);
        return { channelMembers, other, ...channel };
      });
    Promise.all(subscribed).then((channels) => setSubscribedChannels(channels));
  }, [client, viewer]);

  const updateFriendlyName = () => console.log("update friendly name");

  return { client, subscribedChannels };
};

/* 
  Client: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Client.html
  Channel: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Channel.html
  Member: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Member.html
*/
