import React from "react";
import { Box, Text } from "@advisable/donut";
import Event from "./Event";

export default function UpcomingEvents({ upcomingEvents }) {
  const events = upcomingEvents.map((e) => <Event key={e.id} event={e} />);

  return (
    <Box>
      <Text color="neutral900" fontSize="2xl" fontWeight={450} mb={8}>
        Upcoming events
      </Text>
      <Box>{events}</Box>
    </Box>
  );
}
