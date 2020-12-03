import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Text, Textarea, theme } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import useViewer from "@advisable-main/hooks/useViewer";
import { useTwilioChat } from "@guild/hooks/twilioChat/useTwilioChat";
import InboxHeader from "../components/InboxHeader";
import { GuildBox, flex } from "@guild/styles";
import { SubmitButton } from "@guild/components/Buttons/styles";
import { relativeDate } from "@guild/utils";
import { ScrollToBottom } from "@guild/components/ScrollToBottom";
import { CHAT_PARTICIPANT_QUERY } from "../queries";
import Message from "./Message";

const ActiveConversation = ({ channelSid }) => {
  const viewer = useViewer();

  const {
    activeChannel: activeConversation,
    messages,
    initializing,
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

  if (initializing) return <Loading />;

  return (
    activeConversation && (
      <>
        <InboxHeader>
          <Text
            fontWeight="medium"
            size="2xl"
            color="catalinaBlue100"
            css={flex.flexTruncate}
          >
            {activeConversation?.attributes?.subject}
          </Text>
        </InboxHeader>

        <GuildBox
          px="l"
          py="s"
          height="100%"
          overflow="scroll"
          spaceChildrenVertical={16}
          css={css`
            border-bottom: 1px solid ${theme.colors.ghostWhite};
          `}
        >
          <Text as={GuildBox} size="xs" color="darkGray" alignSelf="center">
            started {relativeDate(activeConversation?.dateCreated)} ago
          </Text>

          <AnimatePresence initial={false}>
            {messages?.map((message, key) => (
              <Box
                key={key}
                as={motion.div}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Message
                  message={message}
                  isAuthor={viewer.id === message.author}
                  author={getParticipantById(message.author)}
                />
              </Box>
            ))}
          </AnimatePresence>
          <ScrollToBottom />
        </GuildBox>

        {/* New Message */}
        <GuildBox
          marginY="m"
          marginX="l"
          width={"95%"}
          height={"143px"}
          alignSelf="center"
          spaceChildrenVertical={8}
        >
          <Composer onSubmit={onSubmitNewMessage} />
        </GuildBox>
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
    <>
      <Textarea
        minRows="3"
        maxRows="3"
        value={message}
        onKeyDown={handleKeyDown}
        onChange={({ currentTarget }) => setMessage(currentTarget.value)}
        placeholder="New Message ..."
      ></Textarea>
      <SubmitButton
        size="l"
        type="submit"
        loading={loading}
        onClick={handleSubmit}
      >
        Send
      </SubmitButton>
    </>
  );
}

export default ActiveConversation;
