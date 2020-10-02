import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { css } from "styled-components";
import { motion } from "framer-motion";
import { truncate } from "lodash-es";
import { Text, Avatar, Link, Textarea, theme } from "@advisable/donut";
import useViewer from "@advisable-main/hooks/useViewer";
import { useTwilioChat } from "@guild/hooks/twilioChat/useTwilioChat";
import { StyledMessage } from "../styles";
import InboxHeader from "../components/InboxHeader";
import { GuildBox, flex } from "@guild/styles";
import { SubmitButton } from "@guild/components/Buttons/styles";
import { relativeDate } from "@guild/utils";
import { CHAT_PARTICIPANT_QUERY } from "../queries";

const ActiveConversation = ({ channelSid }) => {
  const viewer = useViewer();
  const [message, setMessage] = useState("");

  const { activeChannel: activeConversation, messages } = useTwilioChat({
    channelSid,
  });

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

  const onSubmitNewMessage = async () => {
    if (!message?.length) return;
    await activeConversation.sendMessage(message);
  };

  console.log("activeConversation", activeConversation);
  console.log("messages", messages?.items);
  console.log("data", data);

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

          {messages?.map((message, key) => (
            <GuildBox key={key} spaceChildrenVertical={4}>
              <StyledMessage
                key={key}
                as={motion.div}
                sender={message.author !== other}
                width={{ _: "90%", m: "65%" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key * 0.12 }}
              >
                {message.author === other && (
                  <GuildBox
                    mr="s"
                    flexShrink={0}
                    flexCenterBoth
                    spaceChildrenVertical={4}
                  >
                    <Avatar
                      width={"24px"}
                      as={Link}
                      to={`/profiles/${other}`}
                      size="s"
                      name={otherParticipant.name}
                      url={otherParticipant.avatar}
                    />
                    <Text size="xs" color="quartz">
                      {truncate(otherParticipant.name, { length: 13 })}
                    </Text>
                  </GuildBox>
                )}
                <Text>{message.body}</Text>
              </StyledMessage>
              <Text
                as={GuildBox}
                alignSelf={message.author === other ? "flex-start" : "flex-end"}
                color="darkGray"
                size="xxs"
              >
                5 mins ago
              </Text>
            </GuildBox>
          ))}
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
          <Textarea
            minRows="3"
            maxRows="8"
            value={message}
            onChange={({ currentTarget }) => setMessage(currentTarget.value)}
            placeholder="New Message ..."
          ></Textarea>
          <SubmitButton
            size="l"
            type="submit"
            loading={false}
            onClick={onSubmitNewMessage}
          >
            Send
          </SubmitButton>
        </GuildBox>
      </>
    )
  );
};

export default ActiveConversation;
