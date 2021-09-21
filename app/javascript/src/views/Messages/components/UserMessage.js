import React from "react";
import { Avatar, Box, Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import { DateTime } from "luxon";
import MessageAttachment from "./MessageAttachment";

function dateForMessage(iso) {
  const date = DateTime.fromISO(iso);
  return date.toFormat("dd MMM, yyyy HH:mm");
}

export default function UserMessage({ message }) {
  return (
    <Box
      width="100%"
      opacity={message.status === "SENT" ? 1 : 0.4}
      id={message.id}
      data-status={message.status}
      borderRadius="12px"
      bg="white"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
      padding={4}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={6}
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
