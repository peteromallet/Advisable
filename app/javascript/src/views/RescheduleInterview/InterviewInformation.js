import React from "react";
import { DateTime } from "luxon";
import { Box, Circle, Text } from "@advisable/donut";
import { Calendar } from "@styled-icons/ionicons-outline";
import useViewer from "../../hooks/useViewer";

export default function InterviewInformation({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;
  const datetime = DateTime.fromISO(interview.startsAt).toFormat(
    "cccc, dd LLLL y 'at' hh:mm a",
  );
  const recipient = isSpecialist
    ? interview.user.firstName
    : interview.specialist.firstName;

  return (
    <Box textAlign="center">
      <Circle size={64} bg="neutral100" marginBottom="lg">
        <Calendar size={24} />
      </Circle>
      <Text fontSize="xl" lineHeight="xl">
        Your interview with {recipient} is scheduled to take place on {datetime}
      </Text>
    </Box>
  );
}
