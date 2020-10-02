import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import useViewer from "@advisable-main/hooks/useViewer";
import { relativeDate } from "@guild/utils";
import { useTwilioClient } from "./useTwilioClient";
import { UPDATE_CHAT_FRIENDLY_NAME } from "./mutations";

/* 
  Fetch Twilio chat subscribed channels and handles events
*/
export const useTwilioChannels = () => {
  const viewer = useViewer();
  const { client } = useTwilioClient();

  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updateChatFriendlyName] = useMutation(UPDATE_CHAT_FRIENDLY_NAME);

  useEffect(() => {
    if (!client) return;

    const initializeChat = async () => {
      try {
        client.on("channelJoined", onChannelJoined);
        client.on("channelUpdated", onChannelUpdated);
        await refreshSubscribedChannels();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    initializeChat();
    return () => client && client.removeAllListeners();
  }, [client, onChannelUpdated, refreshSubscribedChannels]);

  const onChannelJoined = (channel) =>
    console.debug("onChannelJoined", channel);

  /* Event handler focused on lastMessage and joined updates */
  const onChannelUpdated = useCallback(
    async (event) => {
      console.debug("onChannelUpdated", event);
      const lastMessageUpdate = event.updateReasons.some(
        (r) => r === "lastMessage",
      );
      if (lastMessageUpdate) {
        await updateChatFriendlyName({
          variables: {
            input: {
              channelSid: event.channel.sid,
            },
          },
        });
      }
      client && refreshSubscribedChannels();
    },
    [refreshSubscribedChannels, client, updateChatFriendlyName],
  );

  /* Fetch private channels, members, and normalize channels */
  const refreshSubscribedChannels = useCallback(async () => {
    if (!client) return;

    const resp = await client.getSubscribedChannels();
    if (resp?.items?.length) {
      const subscribed = resp.items.map((channel) => normalizeChannel(channel));
      Promise.all(subscribed).then((channels) => {
        const sortedChannels = channels.sort(
          (a, b) => b.lastMessageDateTime - a.lastMessageDateTime,
        );
        setSubscribedChannels(sortedChannels);
      });
    }
  }, [normalizeChannel, client]);

  /* Normalize a chat channel as a guild 'conversations'*/
  const normalizeChannel = useCallback(
    async (channel) => {
      const {
        friendlyName,
        lastMessage,
        dateCreated,
        attributes: { members },
      } = channel.channelState;

      const other = Object.values(members).filter(
        (uid) => uid !== viewer.id,
      )?.[0];

      const lastMessageDateTime = lastMessage?.dateCreated || new Date();
      const lastMessageWords = relativeDate(lastMessageDateTime);
      const createdAtWords = relativeDate(dateCreated || new Date());
      return {
        other,
        friendlyName,
        lastMessageWords,
        lastMessageDateTime,
        createdAtWords,
        ...channel,
      };
    },
    [viewer.id],
  );

  return {
    loading,
    subscribedChannels,
  };
};

/* 
  Client:  http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Client.html
  Channel: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Channel.html
  Member:  http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Member.html
*/
