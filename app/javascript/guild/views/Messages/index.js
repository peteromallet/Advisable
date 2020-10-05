import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
import { Card, Text, theme, Link, Button } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
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
  const { loading, subscribedChannels, sortChannels } = useTwilioChannels();
  const [sortConversations, toggleSortConversations] = useToggle();
  const [activeChannelSid, setActiveChannelSid] = useState(null);

  /* Set the initial activeConversation. */
  useEffect(() => {
    if (!subscribedChannels.length || activeChannelSid) return;
    setActiveChannelSid(subscribedChannels[0].sid);
  }, [subscribedChannels, activeChannelSid]);

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
          height="85vh"
        >
          {loading ? (
            <Loading />
          ) : (
            <GuildBox height="100%" display="flex" flexDirection="row">
              {subscribedChannels.length ? (
                <>
                  <GuildBox
                    width="38%"
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

                    {/* Conversation Inbox List */}
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
                          setActive={setActiveChannelSid}
                          isActive={activeChannelSid === conversation.sid}
                        />
                      ))}
                    </GuildBox>
                  </GuildBox>

                  {/* Active Conversation and New Message */}
                  <GuildBox
                    width="62%"
                    display="flex"
                    flexDirection="column"
                    background="white"
                  >
                    <ActiveConversation channelSid={activeChannelSid} />
                  </GuildBox>
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

export default Messages;
