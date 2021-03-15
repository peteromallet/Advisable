import React from "react";
import { Box } from "@advisable/donut";
import Event from "./Event";

export default function EventsList({ events }) {
  return (
    <Box
      width="100%"
      gridGap="32px"
      display="grid"
      gridTemplateColumns={{ _: "1fr", s: "1fr 1fr", l: "repeat(3, 1fr)" }}
    >
      {events?.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </Box>
  );
}
