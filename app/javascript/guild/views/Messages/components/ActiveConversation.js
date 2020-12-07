import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { Send, ArrowUp } from "@styled-icons/ionicons-solid";
import { Box, Button, Link, Textarea, Avatar, theme } from "@advisable/donut";
import Loading from "src/components/Loading";
import useViewer from "@advisable-main/hooks/useViewer";
import { useTwilioChat } from "@guild/hooks/twilioChat/useTwilioChat";
import { GuildBox, flex } from "@guild/styles";
import { ScrollToBottom } from "@guild/components/ScrollToBottom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { CHAT_PARTICIPANT_QUERY } from "../queries";
import Message from "./Message";
import { StyledComposer } from "../styles";

const ActiveConversation = ({ channelSid }) => {
  const viewer = useViewer();

  const {
    activeChannel: activeConversation,
    messages,
    initializing,
    paginator,
    onLoadPreviousMessages,
  } = useTwilioChat({
    channelSid,
  });

  useEffect(() => {
    if (!activeConversation) return;
    const setAllMessagesConsumed = async () =>
      await activeConversation.setAllMessagesConsumed();
    setAllMessagesConsumed();
  }, [activeConversation]);

  /* Get the other participant uid  */
  const other = useMemo(() => {
    if (!activeConversation) return;
    const { members } = activeConversation.attributes;
    return Object.values(members).filter((uid) => uid !== viewer.id)?.[0];
  }, [viewer, activeConversation]);

  const { data } = useQuery(CHAT_PARTICIPANT_QUERY, {
    variables: { id: other },
    skip: !other,
  });

  const otherParticipant = data?.specialist;

  const participants = [otherParticipant, viewer];

  function getParticipantById(id) {
    return participants.find((participant) => participant.id === id);
  }

  const onSubmitNewMessage = async (message) => {
    if (!message?.length) return;
    await activeConversation.sendMessage(message);
  };

  /*
    Only scroll to the bottom if there are new messages.
    Loading previous messages should not trigger this.
  */
  const scrollToBottom =
    !paginator?.hasNextPage ||
    activeConversation?.lastConsumedMessageIndex !== messages.length - 1;

  const messagesRef = useBottomScrollListener(async () => {
    await activeConversation.setAllMessagesConsumed();
  });

  if (initializing) return <Loading />;

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
            as={RouterLink}
            to={`/freelancers/${otherParticipant.id}/guild`}
            name={otherParticipant.name}
            url={otherParticipant.avatar}
          />
          <Link
            fontSize="lg"
            variant="dark"
            fontWeight="medium"
            to={`/freelancers/${otherParticipant.id}/guild`}
            css={flex.flexTruncate}
          >
            {otherParticipant.name}
          </Link>
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
                size="s"
                prefix={<ArrowUp />}
                onClick={onLoadPreviousMessages}
              >
                Show previous messages
              </Button>
            </GuildBox>
          )}
          <AnimatePresence initial={false}>
            {messages?.map((message, key) => (
              <Box
                key={key}
                as={motion.div}
                paddingBottom={6}
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
        <Box width="100%" px={5} pb={4}>
          <Composer onSubmit={onSubmitNewMessage} />
        </Box>
      </>
    )
  );
};

function Composer({ onSubmit }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
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
        minRows="3"
        maxRows="5"
        value={message}
        onKeyDown={handleKeyDown}
        onChange={({ currentTarget }) => setMessage(currentTarget.value)}
        placeholder="New Message ..."
      ></Textarea>
      <Button
        size="s"
        prefix={<Send />}
        loading={loading}
        disabled={loading}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </StyledComposer>
  );
}

export default ActiveConversation;
