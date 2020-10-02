import { useState, useEffect } from "react";
import { useTwilioClient } from "@guild/hooks/twilioChat/useTwilioClient";

export const useTwilioChat = ({ channelSid }) => {
  const { client } = useTwilioClient();

  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!client || !channelSid) return;
    let channel;
    const pageSize = 50;

    const initializeChannel = async () => {
      channel = await client.getChannelBySid(channelSid);
      const messages = await channel.getMessages(pageSize);
      channel.on("messageAdded", onMessageAdded);

      setActiveChannel(channel);
      setMessages(messages?.items);
    };

    initializeChannel();
    return () => channel && channel.removeAllListeners();
  }, [client, channelSid]);

  const onMessageAdded = (message) => {
    console.log("onMessageAdded", message);
    setMessages((prev) => prev.concat(message));
  };

  return { messages, activeChannel };
};
