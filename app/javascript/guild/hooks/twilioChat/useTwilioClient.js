import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import * as Chat from "twilio-chat";
import { CHAT_GRANT_QUERY } from "./queries";

export const useTwilioClient = () => {
  const [client, setClient] = useState(null);
  const { data, refetch } = useQuery(CHAT_GRANT_QUERY);

  const clientRef = useCallback((newClient) => {
    if (!newClient) return;
    setClient(newClient);
  }, []);

  useEffect(() => {
    if (!data?.chatGrant?.accessToken) return;
    const { accessToken } = data.chatGrant;

    const initializeClient = async () => {
      try {
        const chatClient = await Chat.Client.create(accessToken);
        chatClient.on("tokenAboutToExpire", onTokenExpiration);
        chatClient.on("tokenExpired", onTokenExpiration);
        return chatClient;
      } catch (error) {
        console.log(error);
      }
    };
    initializeClient().then((chatClient) => clientRef(chatClient));

    return () => clientRef() && clientRef().removeAllListeners();
  }, [data, clientRef, onTokenExpiration]);

  /* Event to handle token expiration */
  const onTokenExpiration = useCallback(async () => {
    const { data: refresh } = await refetch();
    const updatedToken = refresh?.chatGrant?.accessToken;
    updatedToken && clientRef().updateToken(updatedToken);
  }, [refetch, clientRef]);

  return { client };
};
