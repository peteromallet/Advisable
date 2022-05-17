import React from "react";
import UserMessage from "./UserMessage";
import SystemMessage from "./SystemMessage";
import GuildPostMessage from "./GuildPostMessage";
import { Avatar, Box, Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import { DateTime } from "luxon";
import MessageAttachment from "./MessageAttachment";
import { motion } from "framer-motion";
import InterviewScheduledMessage from "./SystemMessage/InterviewScheduled";
import AgreementCreatedMessage from "./AgreementCreatedMessage";
import AgreementAcceptedMessage from "./SystemMessage/AgreementAcceptedMessage";
import AgreementDeclinedMessage from "./SystemMessage/AgreementDeclinedMessage";
import InterviewDeclinedMessage from "./SystemMessage/InterviewDeclinedMessage";
import InterviewRequestMessage from "./InterviewRequestMessage";
import InterviewAutoDeclinedMessage from "./SystemMessage/InterviewAutoDeclinedMessage";
import PaymentRequestCreated from "./SystemMessage/PaymentRequestCreated";
import PaymentRequestCompleted from "./SystemMessage/PaymentRequestCompleted";

const COMPONENTS = {
  UserMessage,
  SystemMessage,
  GuildPostMessage,
  InterviewScheduledMessage,
  AgreementCreatedMessage,
  AgreementAcceptedMessage,
  AgreementDeclinedMessage,
  InterviewRequestMessage,
  InterviewDeclinedMessage,
  InterviewAutoDeclinedMessage,
  PaymentRequestCreated,
  PaymentRequestCompleted,
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
      borderRadius="20px"
      bg="white"
      className="shadow-md"
      padding={4}
      {...props}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex-shrink-0 pr-3 flex">
          <Avatar
            bg="blue100"
            color="blue300"
            size="xs"
            display="inline-flex"
            name={message.author?.name}
            url={message.author?.avatar}
          />
        </div>
        <div className="w-full">
          <div className="font-medium leading-none mb-1">
            {message.author?.name || "Deleted user"}
          </div>
          <div className="text-xs text-neutral600 leading-none">
            {dateForMessage(message.createdAt)}
          </div>
        </div>
      </div>
      <div className="my-2 h-px bg-neutral100" />
      <div className="w-full">
        {children ? (
          <Box paddingTop={3} paddingBottom={5}>
            {children}
          </Box>
        ) : null}
        <Text
          autoLink
          color="neutral900"
          style={{ overflowWrap: "break-word" }}
          className="leading-normal"
        >
          {renderLineBreaks(message.content)}
        </Text>
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
      </div>
    </Box>
  );
}
