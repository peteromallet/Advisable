import { css } from "styled-components";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Text, theme, useBreakpoint } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import { ArrowBack } from "@styled-icons/ionicons-outline";
import { useTwilioChannels } from "@guild/hooks/twilioChat/useTwilioChannels";
import { GuildBox } from "@guild/styles";
import ActiveConversation from "./components/ActiveConversation";
import ConversationItem from "./components/ConversationItem";
import MessageWithAction from "@guild/components/MessageWithAction";
import { use100vh } from "react-div-100vh";

const Messages = () => {
  const height = use100vh();
  const history = useHistory();
  const { conversationId: paramsChannelSid } = useParams();
  const sUp = useBreakpoint("sUp");

  const { loading, subscribedChannels } = useTwilioChannels();
  const [activeChannelSid, setActiveChannelSid] = useState(null);

  /* Set the initial channel */
  useEffect(() => {
    if (!subscribedChannels.length || !sUp || activeChannelSid) return;
    const initialChannel = paramsChannelSid || subscribedChannels[0].sid;
    handleSetActive(initialChannel);
  }, [
    subscribedChannels,
    activeChannelSid,
    handleSetActive,
    paramsChannelSid,
    sUp,
  ]);

  const handleSetActive = useCallback(
    (channelSid) => {
      setActiveChannelSid(channelSid);
      const pathname = ["/messages", channelSid].filter((x) => x).join("/");
      history.replace({ pathname });
    },
    [history],
  );

  return (
    <Box height={height - 60} width="100%">
      {loading ? (
        <Loading />
      ) : (
        <Box height="100%" display="flex" flexDirection="row">
          {subscribedChannels.length ? (
            <>
              {(sUp || !activeChannelSid) && (
                <Box
                  bg="white"
                  pt={4}
                  px={4}
                  display="flex"
                  flexShrink="0"
                  flexDirection="column"
                  zIndex={4}
                  width={{ _: "100%", s: "40%", l: "30%", xl: "26%" }}
                  boxShadow="0 0 24px rgba(0,0,0,0.04)"
                >
                  {/* Conversations Inbox Header */}
                  <Box
                    pb={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      size="3xl"
                      color="neutral900"
                      fontWeight="medium"
                      letterSpacing="-0.01rem"
                    >
                      Inbox
                    </Text>
                  </Box>

                  {/* Conversations Inbox List */}
                  <Box
                    width="100%"
                    height="100%"
                    display="flex"
                    overflow="scroll"
                    background="white"
                    flexDirection="column"
                  >
                    {subscribedChannels.map((conversation, key) => (
                      <ConversationItem
                        key={key}
                        conversation={conversation}
                        setActive={handleSetActive}
                        isActive={activeChannelSid === conversation.sid}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Active Conversation and New Message */}
              {activeChannelSid && (
                <Box width="100%" display="flex" flexDirection="column">
                  {!sUp && (
                    <MobileBackConversations
                      onBack={() => handleSetActive(null)}
                    />
                  )}
                  <ActiveConversation channelSid={activeChannelSid} />
                </Box>
              )}
            </>
          ) : (
            <MessageWithAction
              message="No Guild Messages"
              actionText="Posts Feed"
              actionLink="/feed"
              prefix
            />
          )}
        </Box>
      )}
    </Box>
  );
};

const MobileBackConversations = ({ onBack }) => (
  <Box
    height="60px"
    display="flex"
    flexShrink={0}
    alignItems="center"
    width={"100%"}
    onClick={onBack}
    css={css`
      cursor: pointer;
      border-bottom: 1px solid ${theme.colors.ghostWhite};
    `}
  >
    <GuildBox spaceChildrenHorizontal={16} display="flex" mx="l">
      <ArrowBack size="18px" color="catalinaBlue100" />
      <Text fontWeight="medium" size="l" color="catalinaBlue100">
        Conversations
      </Text>
    </GuildBox>
  </Box>
);

export default Messages;
