import React from "react";
import { Circle } from "@advisable/donut";
import { PersonCircle } from "@styled-icons/ionicons-outline";

export default function NoVideo() {
  return (
    <Circle size={160} bg="neutral300" color="neutral500">
      <PersonCircle size={80} />
    </Circle>
  );
}
