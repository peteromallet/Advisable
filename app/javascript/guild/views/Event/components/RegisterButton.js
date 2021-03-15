import React from "react";
import { Button, useBreakpoint } from "@advisable/donut";
import { Calendar } from "@styled-icons/heroicons-outline";

export default function RegisterButton({ attending, ...props }) {
  const sUp = useBreakpoint("sUp");
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
      {attending ? "Unregister" : "Register for event"}
    </Button>
  );
}
