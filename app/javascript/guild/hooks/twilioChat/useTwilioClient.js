import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import * as Chat from "twilio-chat";
import { CHAT_GRANT_QUERY } from "./queries";

export const useTwilioClient = () => {
  const [client, setClient] = useState(null);
  const { data, refetch } = useQuery(CHAT_GRANT_QUERY);

  useEffect(() => {
    if (!data?.chatGrant?.accessToken) return;
    const { accessToken } = data.chatGrant;
    let chatClient;

    const initializeClient = async () => {
      try {
        chatClient = await Chat.Client.create(accessToken);
        chatClient.on("tokenAboutToExpire", () =>
          onTokenExpiration(chatClient),
        );
        chatClient.on("tokenExpired", () => onTokenExpiration(chatClient));
        return chatClient;
      } catch (error) {
        console.log(error);
      }
    };
    initializeClient().then((chatClient) => setClient(chatClient));
    return () => {
      chatClient && chatClient.removeAllListeners();
      // console.debug("removed twilio chat listeners");
    };
  }, [data, onTokenExpiration]);

  /* Event to handle token expiration */
  const onTokenExpiration = useCallback(
    async (chatClient) => {
      if (!refetch) return;
      const { data: refresh } = await refetch();
      const updatedToken = refresh?.chatGrant?.accessToken;
      updatedToken && chatClient.updateToken(updatedToken);
      // console.debug("refreshed twilio chat client");
    },
    [refetch],
  );

  return { client };
};
