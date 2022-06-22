import React from "react";
import { DateTime } from "luxon";
import useViewer from "src/hooks/useViewer";
import { Box, Link, Text } from "@advisable/donut";

export default function InterviewScheduledMessage({ message }) {
  const viewer = useViewer();
  const { startsAt, interview } = message;
  const other = interview.participants.find((p) => !p.isViewer);
  const isRequestor = interview.requestedBy.id === viewer.account.id;
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
          {isRequestor ? other.name : "You"}
        </Text>{" "}
        scheduled a call for{" "}
        <Text as="span" fontWeight={520}>
          {datetime}
        </Text>
      </Text>

      <Link to={`/interviews/${interview.id}`} state={{ back: true }}>
        Manage call
      </Link>
    </Box>
  );
}
