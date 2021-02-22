import React from "react";
import { Tag } from "@advisable/donut";
import { Calendar } from "@styled-icons/heroicons-outline";
import { shortDate } from "@guild/utils";

export default function StartsAtTag({ startsAt, variant = "orange" }) {
  if (!startsAt) return null;

  return (
    <Tag size={["s", "m"]} icon={Calendar} variant={variant}>
      {shortDate(startsAt)}
    </Tag>
  );
}
