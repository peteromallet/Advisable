import React from "react";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";
import { Heading, Box, Text, theme } from "@advisable/donut";
import Event from "./Event";
import CalendarIllustration from "src/illustrations/zest/calendar";

export default function InterviewConfirmed({ clientName, startsAt }) {
  const location = useLocation();
  const date = DateTime.fromISO(startsAt);

  return (
    <Box textAlign="center">
      <CalendarIllustration
        color={theme.colors.blue100}
        width="160px"
        marginBottom={4}
      />
      <Heading marginBottom={2}>Call Scheduled</Heading>
      <Text fontSize="lg" color="neutral900" mb={8}>
        Your call with {clientName} has been scheduled!
      </Text>
      <Event date={date} zone={location.state?.zone} />
    </Box>
  );
}
