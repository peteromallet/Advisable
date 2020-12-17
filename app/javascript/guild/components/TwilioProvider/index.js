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
import useViewer from "src/hooks/useViewer";

export const TwilioContext = createContext();

function getUnreadCountFromChannel(channel) {
  return channel.lastMessage.index - channel.lastConsumedMessageIndex;
}

const initialState = {
  loading: true,
  client: null,
  channels: {},
  connectionState: null,
};

const LOAD_TWILIO = "LOAD_TWILIO";
const UPDATE_CHANNEL = "UPDATE_CHANNEL";
const UPDATE_CONNECTION_STATE = "UPDATE_CONNECTION_STATE";

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
    case UPDATE_CONNECTION_STATE: {
      return { ...state, connectionState: action.connectionState };
    }
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
  const viewer = useViewer();
  const apolloClient = useApolloClient();
  const [state, dispatch] = useReducer(twilioReducer, initialState);

  const getAccessToken = useCallback(async () => {
    const { data } = await apolloClient.query({
      fetchPolicy: "network-only",
      query: CHAT_GRANT_QUERY,
    });
    console.log("NEW_TOKEN", data.chatGrant.accessToken);
    return data.chatGrant.accessToken;
  }, [apolloClient]);

  const handleChannelUpdated = useCallback((e) => {
    dispatch({ type: UPDATE_CHANNEL, channel: e.channel });
  }, []);

  const setupTwilio = useCallback(async () => {
    const token = await getAccessToken();
    const chatClient = await Chat.Client.create(token);
    window.chatClient = chatClient;

    const handleExpiredToken = async () => {
      const token = await getAccessToken();
      chatClient.updateToken(token);
    };

    chatClient.on("connectionError", (e) => {
      console.log("CONNECTION_ERROR", e);
    });

    chatClient.on("connectionStateChanged", (connectionState) => {
      if (state.connectionState !== connectionState) {
        dispatch({
          type: UPDATE_CONNECTION_STATE,
          connectionState,
        });
      }
    });

    chatClient.on("tokenExpired", handleExpiredToken);
    chatClient.on("tokenAboutToExpire", handleExpiredToken);
    chatClient.addListener("channelUpdated", handleChannelUpdated);

    const channels = await loadChannels(chatClient);

    dispatch({
      type: LOAD_TWILIO,
      client: chatClient,
      channels,
    });

    return () => chatClient.removeAllListeners();
  }, [getAccessToken, handleChannelUpdated, state.connectionState]);

  useEffect(() => {
    if (viewer && !state.client) {
      setupTwilio();
    }
  }, [viewer, setupTwilio, state.client]);

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

  console.log(state);

  const value = useMemo(
    () => ({
      loading: state.loading,
      client: state.client,
      channels,
      unreadMessages,
    }),
    [state, channels, unreadMessages],
  );

  return (
    <TwilioContext.Provider value={value}>{children}</TwilioContext.Provider>
  );
}
