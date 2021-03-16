import React from "react";
import { Box, Notice, Text } from "@advisable/donut";
import { EventStatus } from "./useEventStatus";

export default function StatusNotice({ eventStatus }) {
  if (eventStatus === EventStatus.pending) return null;

  const notice =
    eventStatus === EventStatus.ended
      ? "has ended."
      : eventStatus === EventStatus.startingSoon
      ? "is starting soon"
      : "is in progress";

  return (
    <Notice marginBottom="5" padding="s">
      <Box display="flex" alignItems="center">
        <Text fontSize="m" color="#8E8EA1">
          {`This event ${notice}`}
        </Text>
      </Box>
    </Notice>
  );
}
