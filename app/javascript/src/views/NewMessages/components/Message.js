import React from "react";
import { Avatar, Box, Stack, Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import { DocumentText } from "@styled-icons/heroicons-solid/DocumentText";
import { DateTime } from "luxon";

function dateForMessage(iso) {
  const date = DateTime.fromISO(iso);
  return date.toFormat("dd MMM, yyyy");
}

export default function Message({ message }) {
  return (
    <Box
      width="100%"
      opacity={message.status === "SENT" ? 1 : 0.4}
      id={message.id}
      data-status={message.status}
      bg="white"
      boxShadow="xs"
      padding={4}
      borderRadius="12px"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box flexShrink="0" pr={3} display="flex">
          <Avatar
            bg="blue100"
            color="blue300"
            size="xs"
            display="inline-flex"
            name={message.author.name}
          />
        </Box>
        <Box width="100%">
          <Text fontSize="17px" fontWeight={520}>
            {message.author.name}
          </Text>
        </Box>
        <Box flexShrink={0}>
          <Text fontSize="xs" fontWeight={450} color="neutral400">
            {dateForMessage(message.createdAt)}
          </Text>
        </Box>
      </Box>
      <Box height="1px" bg="neutral100" marginY={4} />
      <Box width="100%">
        <Text autoLink fontSize="17px" color="neutral900" lineHeight="24px">
          {renderLineBreaks(message.content)}
        </Text>
        {message.attachments.length > 0 && (
          <Stack marginTop={4} spacing={2}>
            {message.attachments.map((attachment) => (
              <Box
                width="100%"
                padding={2}
                bg="neutral100"
                paddingRight={3}
                key={attachment.id}
                borderRadius="8px"
                display="flex"
                alignItems="center"
              >
                <Box
                  flexShrink={0}
                  marginTop="-1px"
                  color="neutral600"
                  paddingRight={1.5}
                >
                  <DocumentText size={16} />
                </Box>
                <Box width="100%" minWidth="0">
                  <Text
                    $truncate
                    paddingY={1}
                    fontSize="sm"
                    fontWeight={500}
                    color="neutral900"
                  >
                    {attachment.filename}
                  </Text>
                </Box>
                <Box flexShrink={0}>
                  {attachment.url && (
                    <Text
                      as="a"
                      target="_blank"
                      display="block"
                      href={attachment.url}
                      color="blue700"
                      fontWeight={500}
                      fontSize="xs"
                    >
                      Download
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
