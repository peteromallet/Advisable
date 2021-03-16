import React from "react";
import { Button, useBreakpoint } from "@advisable/donut";
import { Calendar } from "@styled-icons/heroicons-outline";
import { EventStatus } from "./useEventStatus";

export default function RegisterButton({ attending, eventStatus, ...props }) {
  const sUp = useBreakpoint("sUp");

  if (eventStatus === EventStatus.ended) return null;
  return (
    <Button
      mb="3"
      aria-label="Event registration"
      prefix={sUp ? <Calendar /> : null}
      css={`
        background-color: #234ee4;
      `}
      {...props}
    >
      {eventStatus === EventStatus.inProgress && attending
        ? "Join"
        : attending
        ? "Unregister"
        : "Register for event"}
    </Button>
  );
}
