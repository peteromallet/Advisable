import React from "react";
import pluralize from "src/utilities/pluralize";
import { Box, Text, Tooltip } from "@advisable/donut";

export default function ConnectionsCount({ post }) {
  const count = post.engagementsCount;
  const firstName = post.author.firstName;

  const tooltipText = `${pluralize(
    count,
    "person has",
    "people have",
  )} connected with ${firstName} over this post`;

  return (
    <Tooltip maxWidth={200} content={tooltipText}>
      <Text
        ml="1"
        fontSize="sm"
        color="neutral500"
        css={`
          outline: none;
          cursor: default;
          user-select: none;
        `}
      >
        {pluralize(count, "connection", "connections")}
      </Text>
    </Tooltip>
  );
}
