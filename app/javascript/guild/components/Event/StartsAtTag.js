import React from "react";
import { Tag, Box } from "@advisable/donut";
import { Calendar, Check } from "@styled-icons/heroicons-outline";
import { shortDate } from "@guild/utils";

export default function StartsAtTag({
  startsAt,
  attending,
  variant = "orange",
}) {
  return startsAt ? (
    <Box display="flex">
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
          Attending
        </Tag>
      ) : null}
    </Box>
  ) : null;
}
