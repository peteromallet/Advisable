import React from "react";
import { Box, Text } from "@advisable/donut";
import Event from "./Event";

export default function UpcomingEvents({ upcomingEvents }) {
  const events = upcomingEvents.map((e) => <Event key={e.id} event={e} />);

  return (
    <Box>
      <Text mb={4}>Upcoming events</Text>
      <Box>{events}</Box>
    </Box>
  );
}
