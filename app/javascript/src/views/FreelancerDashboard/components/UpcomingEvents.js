import React from "react";
import { Stack, Box, Text } from "@advisable/donut";
import Event from "./Event";

export default function UpcomingEvents({ upcomingEvents }) {
  const events = upcomingEvents.map((e) => <Event key={e.id} event={e} />);

  return (
    <>
      <Text
        color="neutral900"
        fontSize="2xl"
        lineHeight="36px"
        fontWeight={450}
        mb={6}
      >
        Upcoming events
      </Text>
      <Stack spacing={10} divider="neutral100">
        {events}
      </Stack>
    </>
  );
}
