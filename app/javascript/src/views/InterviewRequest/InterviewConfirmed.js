import React from "react";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import illustration from "./illustration.png";
import Event from "./Event";

export default function InterviewConfirmed({ clientName, startsAt }) {
  const location = useLocation();
  const date = DateTime.fromISO(startsAt);

  return (
    <Box textAlign="center">
      <img width={250} src={illustration} alt="" />
      <Text
        as="h3"
        mb="xs"
        fontSize="xxl"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Call Scheduled
      </Text>
      <Text color="neutral700" mb="xl">
        Your call with {clientName} has been scheduled!
      </Text>
      <Event date={date} zone={location.state?.zone} />
    </Box>
  );
}
