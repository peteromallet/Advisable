import * as Chat from "twilio-chat";
import { useApolloClient } from "@apollo/client";
import React, {
  useEffect,
  createContext,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import { CHAT_GRANT_QUERY } from "./queries";
export { default as useTwilioChat } from "./useTwilioChat";

export const TwilioContext = createContext();

function getUnreadCountFromChannel(channel) {
  return channel.lastMessage.index - channel.lastConsumedMessageIndex;
}

const initialState = {
  loading: true,
  client: null,
  channels: {},
  unreadMessages: {},
};

const LOAD_TWILIO = "LOAD_TWILIO";
const UPDATE_CHANNEL = "UPDATE_CHANNEL";

function extendChannel(channel) {
  return {
    ...channel,
    unreadMessages: getUnreadCountFromChannel(channel),
  };
}

function twilioReducer(state, action) {
  switch (action.type) {
    case LOAD_TWILIO:
      return {
        ...state,
        loading: false,
        client: action.client,
        channels: action.channels.reduce((sum, channel) => {
          return {
            ...sum,
            [channel.sid]: channel,
          };
        }, {}),
      };
    case UPDATE_CHANNEL:
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.channel.sid]: extendChannel(action.channel),
        },
      };
  }
}

async function loadChannels(client) {
  let channels = [];

  async function handlePage(page) {
    const extended = page.items.map(extendChannel);

    channels = [...channels, ...extended];

    if (page.hasNextPage) {
      const nextPage = await page.nextPage();
      return handlePage(nextPage);
    }
  }

  const response = await client.getSubscribedChannels();
  if (response.items?.length) {
    await handlePage(response);
  }

  return channels;
}

export default function TwilioProvider({ children }) {
  const apolloClient = useApolloClient();
  const [state, dispatch] = useReducer(twilioReducer, initialState);

  const getAccessToken = useCallback(async () => {
    const { data } = await apolloClient.query({ query: CHAT_GRANT_QUERY });
    return data.chatGrant.accessToken;
  }, [apolloClient]);

  const handleChannelUpdated = useCallback((e) => {
    dispatch({ type: UPDATE_CHANNEL, channel: e.channel });
  }, []);

  const setupTwilio = useCallback(async () => {
    const token = await getAccessToken();
    const chatClient = await Chat.Client.create(token);

    const handleExpiredToken = async () => {
      const token = await getAccessToken();
      chatClient.updateToken(token);
    };

    chatClient.on("tokenAboutToExpire", handleExpiredToken);
    chatClient.on("tokenExpired", handleExpiredToken);
    chatClient.addListener("channelUpdated", handleChannelUpdated);

    const channels = await loadChannels(chatClient);

    dispatch({
      type: LOAD_TWILIO,
      client: chatClient,
      channels,
    });

    return () => chatClient.removeAllListeners();
  }, [getAccessToken, handleChannelUpdated]);

  useEffect(() => {
    setupTwilio();
  }, [setupTwilio]);

  const channels = useMemo(() => {
    return Object.values(state.channels).sort((a, b) => {
      const lastMessageA =
        a.channelState?.lastMessage?.dateCreated || new Date();
      const lastMessageB =
        b.channelState?.lastMessage?.dateCreated || new Date();
      return lastMessageB - lastMessageA;
    });
  }, [state.channels]);

  const unreadMessages = useMemo(() => {
    return channels.reduce((sum, channel) => {
      return sum + channel.unreadMessages;
    }, 0);
  }, [channels]);

  const value = useMemo(
    () => ({
      loading: state.loading,
      channels,
      unreadMessages,
    }),
    [state, channels, unreadMessages],
  );

  return (
    <TwilioContext.Provider value={value}>{children}</TwilioContext.Provider>
  );
}
