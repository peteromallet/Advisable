import React from "react";
import { Tag, Box } from "@advisable/donut";
import { Calendar } from "@styled-icons/heroicons-outline/Calendar";
import { Check } from "@styled-icons/heroicons-outline/Check";
import { shortDate } from "@guild/utils";

export default function StartsAtTag({
  startsAt,
  endsAt,
  attending,
  variant = "orange",
}) {
  const ended = Date.parse(endsAt) < Date.now();

  return startsAt ? (
    <Box display="flex">
      {ended ? (
        <Tag marginRight="2" size="s" variant="neutral">
          Ended
        </Tag>
      ) : null}
      <Tag size="s" icon={Calendar} variant={variant}>
        {shortDate(startsAt)}
      </Tag>
      {attending ? (
        <Tag
          icon={Check}
          marginLeft="2"
          size="s"
          variant={variant}
          opacity="0.8"
        >
          {ended ? "Attended" : "Attending"}
        </Tag>
      ) : null}
    </Box>
  ) : null;
}
