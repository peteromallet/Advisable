import React, { useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
import { Card, Text, Textarea, theme } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import { useToggle } from "@guild/hooks/useToggle";
import { useTwilioChat } from "@guild/hooks/useTwilioChat";
import HeaderLayout from "@guild/components/Layouts/HeaderLayout";
import SortConversations from "@guild/components/ShowMore";
import { GuildBox, flex } from "@guild/styles";
import { SubmitButton } from "@guild/components/Buttons/styles";
import InboxHeader from "./components/InboxHeader";
import ActiveConversation from "./components/ActiveConversation";
import ConversationItem from "./components/ConversationItem";

import { data } from "./stub";

const Messages = () => {
  const {
    subscribedChannels,
    activeChannel,
    selectActiveChannel,
    loading,
  } = useTwilioChat();

  const initialConversation = data?.conversations?.[0];
  const [activeConversation, setActiveConversation] = useState(
    initialConversation,
  );
  const [sortConversations, toggleSortConversations] = useToggle();

  console.log("activeChannel", activeChannel);
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
              <GuildBox
                width="38%"
                display="flex"
                flexDirection="column"
                background="ghostWhite"
              >
                {/* Conversations Inbox Header */}
                <InboxHeader>
                  <Text fontWeight="medium" size="3xl" color="catalinaBlue100">
                    Inbox
                  </Text>
                  <SortConversations
                    showingMore={sortConversations}
                    onToggle={toggleSortConversations}
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
                      setActive={selectActiveChannel}
                      isActive={activeConversation.id === conversation.sid}
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
                <InboxHeader>
                  <Text
                    fontWeight="medium"
                    size="2xl"
                    color="catalinaBlue100"
                    css={flex.flexTruncate}
                  >
                    {activeConversation.subject}
                  </Text>
                </InboxHeader>

                <ActiveConversation activeConversation={activeConversation} />

                {/* New Message */}
                <GuildBox
                  width={"95%"}
                  spaceChildrenVertical={8}
                  height={"143px"}
                  alignSelf="center"
                  marginX="l"
                  marginY="m"
                >
                  <Textarea
                    minRows="3"
                    maxRows="8"
                    placeholder="New Message ..."
                  ></Textarea>
                  <SubmitButton size="l" loading={false} type="submit">
                    Send
                  </SubmitButton>
                </GuildBox>
              </GuildBox>
            </GuildBox>
          )}
        </Card>
      </GuildBox>
    </HeaderLayout>
  );
};

export default Messages;
