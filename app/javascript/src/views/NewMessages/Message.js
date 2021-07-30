import React from "react";
import { Avatar, Box, Stack, Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import { DocumentText } from "@styled-icons/heroicons-solid/DocumentText";
import { DateTime } from "luxon";

export default function Message({ message }) {
  return (
    <Box display="flex" width="100%">
      <Box flexShrink="0" pr={3}>
        <Avatar
          bg="blue100"
          color="blue300"
          size="s"
          name={message.author.name}
        />
      </Box>
      <Box width="100%">
        <Box
          width="100%"
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Text fontSize="18px" fontWeight={520} marginBottom={1}>
            {message.author.name}
          </Text>
          <Text
            fontSize="xs"
            fontWeight={400}
            marginBottom={2}
            color="neutral400"
          >
            {DateTime.fromISO(message.createdAt).toFormat("HH:MM")}
          </Text>
        </Box>
        <Text autoLink color="neutral800" lineHeight="24px">
          {renderLineBreaks(message.content)}
        </Text>
        {message.attachments.length > 0 && (
          <Stack marginTop={4} spacing={2}>
            {message.attachments.map((attachment) => (
              <Box
                width="100%"
                padding={2}
                bg="neutral100"
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
                  <Text
                    as="a"
                    target="_blank"
                    href={attachment.url}
                    color="blue700"
                    fontWeight={500}
                    fontSize="sm"
                  >
                    Download
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
