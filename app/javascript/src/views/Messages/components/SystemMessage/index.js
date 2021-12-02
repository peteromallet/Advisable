import React from "react";
import { Box, Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import MessageAttachment from "../MessageAttachment";
import ConsultationDeclined from "./ConsultationDeclined";

const SYSTEM_MESSAGES = {
  "consultations.declined": ConsultationDeclined,
};

function SystemMessageContent({ message }) {
  return (
    <Text
      autoLink
      color="neutral800"
      lineHeight="24px"
      style={{ overflowWrap: "break-word" }}
    >
      {renderLineBreaks(message.content)}
    </Text>
  );
}

export default function SystemMessage({ message }) {
  const contentComponent =
    SYSTEM_MESSAGES[message.content] || SystemMessageContent;

  return (
    <Box
      padding={4}
      width="100%"
      id={message.id}
      data-status={message.status}
      borderRadius="20px"
      border="2px solid"
      borderColor="neutral100"
      textAlign="center"
    >
      <Box width="100%">
        {React.createElement(contentComponent, { message })}
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
