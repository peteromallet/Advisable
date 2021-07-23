import React from "react";
import { Avatar, Box, Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";
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
      </Box>
    </Box>
  );
}
