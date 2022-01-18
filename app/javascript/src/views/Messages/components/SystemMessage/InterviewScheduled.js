import React from "react";
import { DateTime } from "luxon";
import { Box, Link, Text } from "@advisable/donut";

export default function InterviewScheduledMessage({ message }) {
  const { startsAt, interview } = message;
  const { id, specialist } = interview;
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
      <Text marginBottom={2}>
        <Text as="span" fontWeight={520}>
          {specialist.firstName}
        </Text>{" "}
        scheduled a call for{" "}
        <Text as="span" fontWeight={520}>
          {datetime}
        </Text>
      </Text>

      <Link to={`/interviews/${id}`}>Manage call</Link>
    </Box>
  );
}
