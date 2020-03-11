import React from "react";
import moment from "moment-timezone";
import { Box, Text } from "@advisable/donut";
import illustration from "./illustration.png";
import Event from "./Event";

export default ({ clientName, startsAt, timeZone }) => {
  const date = moment.tz(startsAt, timeZone);

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
      <Event date={date} />
    </Box>
  );
};
