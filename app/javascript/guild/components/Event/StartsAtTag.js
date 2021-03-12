import React from "react";
import { Tag, Box } from "@advisable/donut";
import { Calendar, Check } from "@styled-icons/heroicons-outline";
import { shortDate } from "@guild/utils";

export default function StartsAtTag({ event, variant = "orange" }) {
  return event?.startsAt ? (
    <Box display="flex">
      <Tag size={["s", "m"]} icon={Calendar} variant={variant}>
        {shortDate(event.startsAt)}
      </Tag>
      {event.attending ? (
        <Tag
          icon={Check}
          marginLeft="2"
          size={["s", "m"]}
          variant={variant}
          opacity="0.8"
        >
          Attending
        </Tag>
      ) : null}
    </Box>
  ) : null;
}
