import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Text, theme, useBreakpoint } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import { ArrowBack } from "@styled-icons/ionicons-outline";
import { useToggle } from "@guild/hooks/useToggle";
import { useTwilioChannels } from "@guild/hooks/twilioChat/useTwilioChannels";
import HeaderLayout from "@guild/components/Layouts/HeaderLayout";
import SortConversations from "@guild/components/ShowMore";
import { GuildBox } from "@guild/styles";
import InboxHeader from "./components/InboxHeader";
import ActiveConversation from "./components/ActiveConversation";
import ConversationItem from "./components/ConversationItem";
import MessageWithAction from "@guild/components/MessageWithAction";

const Messages = () => {
  const history = useHistory();
  const { conversationId: paramsChannelSid } = useParams();
  const sUp = useBreakpoint("sUp");

  const { loading, subscribedChannels, sortChannels } = useTwilioChannels();
  const [sortConversations, toggleSortConversations] = useToggle();
  const [activeChannelSid, setActiveChannelSid] = useState(null);

  /* Set initial channel */
  useEffect(() => {
    if (!subscribedChannels.length || activeChannelSid) return;
    const initialChannel = paramsChannelSid || subscribedChannels[0].sid;
    handleSetActive(initialChannel);
  }, [subscribedChannels]);

  const handleSetActive = (channelSid) => {
    setActiveChannelSid(channelSid);
    const pathname = ["/messages", channelSid].filter((x) => x).join("/");
    history.replace({ pathname });
  };

  const handleSortConversations = () => {
    const order = sortConversations ? "desc" : "asc";
    toggleSortConversations();
    sortChannels({ order });
  };

  return (
    <HeaderLayout>
      <GuildBox
        display="flex"
        justifyContent="center"
        mt={{ _: "s", m: "3xl" }}
      >
        <Card
          elevation="m"
          maxWidth={theme.breakpoints.l}
          width="100%"
          height={{ _: "92vh", s: "85vh" }}
        >
          {loading ? (
            <Loading />
          ) : (
            <GuildBox height="100%" display="flex" flexDirection="row">
              {subscribedChannels.length ? (
                <>
                  {(sUp || !activeChannelSid) && (
                    <GuildBox
                      width={{ _: "100%", s: "38%" }}
                      display="flex"
                      flexDirection="column"
                      background="ghostWhite"
                    >
                      {/* Conversations Inbox Header */}
                      <InboxHeader>
                        <Text
                          fontWeight="medium"
                          size="3xl"
                          color="catalinaBlue100"
                        >
                          Inbox
                        </Text>
                        <SortConversations
                          showingMore={sortConversations}
                          onToggle={handleSortConversations}
                          text={{ more: "Sort", less: "Sort" }}
                        />
                      </InboxHeader>

                      {/* Conversations Inbox List */}
                      <GuildBox
                        width="100%"
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        background="ghostWhite"
                        overflow="scroll"
                        css={`
                          border-right: 1px solid ${theme.colors.ghostWhite};
                        `}
                      >
                        {subscribedChannels.map((conversation, key) => (
                          <ConversationItem
                            key={key}
                            conversation={conversation}
                            setActive={handleSetActive}
                            isActive={activeChannelSid === conversation.sid}
                          />
                        ))}
                      </GuildBox>
                    </GuildBox>
                  )}

                  {/* Active Conversation and New Message */}
                  {activeChannelSid && (
                    <GuildBox
                      width={{ _: "100%", s: "62%" }}
                      display="flex"
                      flexDirection="column"
                      background="white"
                    >
                      {!sUp && (
                        <MobileBackConversations
                          onBack={() => handleSetActive(null)}
                        />
                      )}
                      <ActiveConversation channelSid={activeChannelSid} />
                    </GuildBox>
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
            </GuildBox>
          )}
        </Card>
      </GuildBox>
    </HeaderLayout>
  );
};

const MobileBackConversations = ({ onBack }) => (
  <GuildBox
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
      <ArrowBack size="24px" color="catalinaBlue100" />
      <Text fontWeight="medium" size="l" color="catalinaBlue100">
        Select Conversation
      </Text>
    </GuildBox>
  </GuildBox>
);

export default Messages;
