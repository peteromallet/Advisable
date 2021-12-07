import React from "react";
import { DateTime } from "luxon";
import { Box, Text } from "@advisable/donut";

export default function InterviewScheduledMessage({ message }) {
  const interview = message.interview;
  const { startsAt, specialist } = interview;
  const datetime = DateTime.fromISO(startsAt).toFormat("dd LLLL y 'at' hh:mma");

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
      <Text>
        {specialist.firstName} scheduled an interview for{" "}
        <Text as="span" fontWeight={520}>
          {datetime}
        </Text>
      </Text>
    </Box>
  );
}
