import React, { useRef, useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { Send } from "@styled-icons/ionicons-solid/Send";
import { ArrowUp } from "@styled-icons/ionicons-solid/ArrowUp";
import {
  Box,
  Button,
  Link,
  Textarea,
  Avatar,
  Text,
  theme,
  useBreakpoint,
} from "@advisable/donut";
import Loading from "src/components/Loading";
import useViewer from "@advisable-main/hooks/useViewer";
import { useTwilioChat } from "@guild/hooks/twilioChat/useTwilioChat";
import { GuildBox, flex } from "@guild/styles";
import useTwilio from "@guild/components/TwilioProvider/useTwilioChat";
import { ScrollToBottom } from "@guild/components/ScrollToBottom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { CHAT_PARTICIPANT_QUERY } from "../queries";
import Message from "./Message";
import { StyledComposer } from "../styles";

function Composer({ onSubmit }) {
  const { connectionState } = useTwilio();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isConnected = connectionState === "connected";
  const isWidescreen = useBreakpoint("sUp");

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
    await onSubmit(message);
    setMessage("");
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <StyledComposer>
      <Textarea
        minRows={isWidescreen ? "3" : "1"}
        maxRows="5"
        name="message"
        value={message}
        onKeyDown={handleKeyDown}
        disabled={!isConnected}
        onChange={({ currentTarget }) => setMessage(currentTarget.value)}
        placeholder="New Message ..."
      ></Textarea>
      <Button
        size="s"
        prefix={<Send />}
        loading={loading}
        disabled={loading || !isConnected}
        onClick={handleSubmit}
        data-testid="sendMessage"
      >
        Send
      </Button>
    </StyledComposer>
  );
}

const ActiveConversation = ({ channelSid }) => {
  const viewer = useViewer();
  const topMessage = useRef(null);

  const {
    activeChannel: activeConversation,
    messages,
    initializing,
    paginator,
    fetchingMoreMessages,
    onLoadPreviousMessages,
  } = useTwilioChat({
    channelSid,
  });

  useEffect(() => {
    if (!activeConversation) return;
    activeConversation.setAllMessagesConsumed();
  }, [activeConversation]);

  /* Get the other participant uid  */
  const other = useMemo(() => {
    if (!activeConversation) return;
    const { members } = activeConversation.attributes;
    return Object.values(members).filter((uid) => uid !== viewer.id)?.[0];
  }, [viewer, activeConversation]);

  const { data, loading } = useQuery(CHAT_PARTICIPANT_QUERY, {
    variables: { id: other },
    skip: !other,
  });

  const otherParticipant = data?.specialist;

  const participants = [otherParticipant, viewer];

  function getParticipantById(id) {
    return participants.find((participant) => participant?.id === id);
  }

  const onSubmitNewMessage = async (message) => {
    if (!message?.length) return;
    await activeConversation.sendMessage(message);
    activeConversation.updateFriendlyName(message.slice(0, 120));
  };

  /*
    Only scroll to the bottom if there are new messages.
    Loading previous messages should not trigger this.
  */
  const hasUnreadMessages =
    activeConversation?.lastConsumedMessageIndex !== messages.length - 1;
  const scrollToBottom =
    !fetchingMoreMessages && (!paginator?.hasNextPage || hasUnreadMessages);

  const messagesRef = useBottomScrollListener(() => {
    if (activeConversation) {
      activeConversation.setAllMessagesConsumed();
    }
  });

  async function loadMoreMessages() {
    const topMessageBefore = topMessage.current;
    await onLoadPreviousMessages();
    topMessageBefore.scrollIntoView();
    messagesRef.current.scrollTop = messagesRef.current.scrollTop - 64;
  }

  const safeName = otherParticipant?.name || "Deleted User";

  if (initializing || loading) return <Loading />;

  return (
    activeConversation && (
      <>
        <Box
          py={4}
          px={5}
          display="flex"
          alignItems="center"
          borderBottom="1px solid"
          borderColor="neutral200"
        >
          <Avatar
            mr={2}
            size="xs"
            as={otherParticipant && RouterLink}
            to={`/freelancers/${otherParticipant?.id}/guild`}
            name={safeName}
            url={otherParticipant?.avatar}
          />
          {otherParticipant ? (
            <Link
              fontSize="lg"
              variant="dark"
              fontWeight="medium"
              to={`/freelancers/${otherParticipant.id}/guild`}
              css={flex.flexTruncate}
            >
              {safeName}
            </Link>
          ) : (
            <Text>{safeName}</Text>
          )}
        </Box>

        <GuildBox
          ref={messagesRef}
          px={5}
          pt={5}
          height="100%"
          overflow="scroll"
          css={css`
            border-bottom: 1px solid ${theme.colors.ghostWhite};
          `}
        >
          {paginator?.hasPrevPage && (
            <GuildBox flexCenterBoth>
              <Button
                mb={4}
                size="xs"
                variant="subtle"
                prefix={<ArrowUp />}
                onClick={loadMoreMessages}
                loading={fetchingMoreMessages}
              >
                Load previous messages
              </Button>
            </GuildBox>
          )}
          <AnimatePresence initial={false}>
            {messages?.map((message, key) => (
              <Box
                key={message.sid}
                as={motion.div}
                paddingBottom={6}
                ref={key === 0 ? topMessage : null}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Message
                  message={message}
                  isAuthor={viewer?.id === message.author}
                  author={getParticipantById(message.author)}
                />
              </Box>
            ))}
          </AnimatePresence>
          {scrollToBottom && <ScrollToBottom />}
        </GuildBox>

        {/* New Message */}
        <Box width="100%" p={3}>
          <Composer onSubmit={onSubmitNewMessage} />
        </Box>
      </>
    )
  );
};

export default ActiveConversation;
