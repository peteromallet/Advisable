import React from "react";
import { DateTime } from "luxon";
import { Calendar } from "@styled-icons/ionicons-outline";
import { Circle, Box, Button, Text } from "@advisable/donut";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import useViewer from "../../hooks/useViewer";
import RescheduleAsClient from "./RescheduleAsClient";
import RescheduleAsSpecialist from "./RescheduleAsSpecialist";

export default function InterviewScheduled({ interview }) {
  const viewer = useViewer();
  const modal = useDialogState();
  const isSpecialist = viewer.isSpecialist;
  const datetime = DateTime.fromISO(interview.startsAt).toFormat(
    "cccc, dd LLLL y 'at' hh:mm a",
  );
  const recipient = isSpecialist
    ? interview.user.firstName
    : interview.specialist.firstName;

  return (
    <Box textAlign="center">
      <Box marginBottom="xl">
        <Circle size={64} bg="neutral100" marginBottom="lg">
          <Calendar size={24} />
        </Circle>
        <Text fontSize="xl" lineHeight="xl">
          Your interview with {recipient} is scheduled to take place on{" "}
          {datetime}
        </Text>
      </Box>
      {isSpecialist ? (
        <RescheduleAsSpecialist modal={modal} interview={interview} />
      ) : (
        <RescheduleAsClient modal={modal} interview={interview} />
      )}
      <DialogDisclosure {...modal} as={Button} variant="dark">
        Request To Reschedule
      </DialogDisclosure>
    </Box>
  );
}
