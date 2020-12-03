import React from "react";
import pluralize from "src/utilities/pluralize";
import { Text, Tooltip } from "@advisable/donut";

export default function ConnectionsCount({ post, ...props }) {
  const count = post.engagementsCount;
  const firstName = post.author.firstName;

  if (count <= 0) return null;

  const tooltipText = `${pluralize(
    count,
    "person has",
    "people have",
  )} connected with ${firstName} over this post`;

  return (
    <Tooltip maxWidth={200} content={tooltipText}>
      <Text
        {...props}
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
