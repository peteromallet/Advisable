import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
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
  const { data, refetch } = useQuery(CHAT_GRANT_QUERY);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!data?.chatGrant?.accessToken) return;
    const { accessToken } = data.chatGrant;

    const initializeChat = async () => {
      const chatClient = await Chat.Client.create(accessToken);
      chatClient.on("tokenAboutToExpire", async () => {
        const { data: refresh } = await refetch();
        const updatedToken = refresh?.chatGrant?.accessToken;
        updatedToken && client.updateToken(updatedToken);
      });
      return chatClient;
    };

    initializeChat().then((chatClient) => setClient(chatClient));
    return () => client && client.removeAllListeners();
  }, [data, refetch, client]);

  return { client };
};
