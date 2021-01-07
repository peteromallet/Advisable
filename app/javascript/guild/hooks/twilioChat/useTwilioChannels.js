import { useCallback } from "react";
import useViewer from "@advisable-main/hooks/useViewer";
import { timestamp } from "@guild/utils";
import { useTwilioChat } from "../../components/TwilioProvider";

/* 
  Fetch Twilio chat subscribed channels and handles events
*/
export const useTwilioChannels = () => {
  const viewer = useViewer();
  const { loading, channels, connectionState } = useTwilioChat();

  /* Normalize a chat channel as a guild 'conversations'*/
  const normalizeChannel = useCallback(
    (channel) => {
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
      const lastMessageWords = timestamp(lastMessageDateTime);
      const createdAtWords = timestamp(dateCreated || new Date());
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

  const normalizedChannels = (channels || []).map((c) => normalizeChannel(c));

  return {
    loading,
    connectionState,
    subscribedChannels: normalizedChannels,
  };
};

/* 
  Client:  http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Client.html
  Channel: http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Channel.html
  Member:  http://media.twiliocdn.com/sdk/js/chat/releases/4.0.0/docs/Member.html
*/
