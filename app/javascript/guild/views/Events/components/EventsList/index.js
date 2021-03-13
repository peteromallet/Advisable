import React from "react";
import { Box } from "@advisable/donut";
import Event from "./Event";
import NoResults from "@guild/components/NoResults";

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
      {events.length === 0 ? (
        <NoResults message="There are no upcoming Events" />
      ) : null}
    </Box>
  );
}
