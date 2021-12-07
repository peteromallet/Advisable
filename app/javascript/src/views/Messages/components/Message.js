import React from "react";
import UserMessage from "./UserMessage";
import SystemMessage from "./SystemMessage";
import GuildPostMessage from "./GuildPostMessage";
import ConsultationRequestMessage from "./ConsultationRequestMessage";
import { Avatar, Box, Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import { DateTime } from "luxon";
import MessageAttachment from "./MessageAttachment";
import { motion } from "framer-motion";
import InterviewScheduledMessage from "./SystemMessage/InterviewScheduled";

const COMPONENTS = {
  UserMessage,
  SystemMessage,
  GuildPostMessage,
  ConsultationRequestMessage,
  InterviewScheduledMessage,
};

export default function Message({ message }) {
  const component = COMPONENTS[message.__typename] || UserMessage;
  return React.createElement(component, { message });
}

function dateForMessage(iso) {
  const date = DateTime.fromISO(iso);
  return date.toFormat("dd MMM, yyyy HH:mm");
}

export function BaseMessage({
  message,
  sending,
  children,
  highlight,
  ...props
}) {
  return (
    <Box
      width="100%"
      as={motion.div}
      border="2px solid"
      style={{ borderColor: "#FFF" }}
      animate={{
        borderColor: highlight ? ["#1C1C25", "#FFF"] : "#FFF",
      }}
      id={message.id}
      data-status={message.status}
      opacity={sending ? 0.4 : 1}
      borderRadius="24px"
      bg="white"
      boxShadow="0px 2px 4px rgba(15, 17, 26, 0.08), 0px 2px 24px rgba(15, 17, 26, 0.04);"
      padding={6}
      {...props}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={5}
      >
        <Box flexShrink="0" pr={3} display="flex">
          <Avatar
            bg="blue100"
            color="blue300"
            size="xs"
            display="inline-flex"
            name={message.author?.name}
          />
        </Box>
        <Box width="100%">
          <Text fontSize="17px" fontWeight={550}>
            {message.author?.name || "Deleted user"}
          </Text>
        </Box>
        <Box flexShrink={0}>
          <Text fontSize="xs" fontWeight={400} color="neutral500">
            {dateForMessage(message.createdAt)}
          </Text>
        </Box>
      </Box>
      <Box my={4} height="1px" bg="neutral100" />
      <Box width="100%">
        <Text
          autoLink
          fontSize="17px"
          color="neutral900"
          lineHeight="24px"
          style={{ overflowWrap: "break-word" }}
        >
          {renderLineBreaks(message.content)}
        </Text>
        {children ? <Box paddingTop={5}>{children}</Box> : null}
        {message.attachments.length > 0 && (
          <Box
            display="grid"
            gridGap="12px"
            marginTop={4}
            gridTemplateColumns={{ _: "1fr 1fr", m: "1fr 1fr 1fr 1fr" }}
          >
            {message.attachments.map((attachment) => (
              <MessageAttachment key={attachment.id} attachment={attachment} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
