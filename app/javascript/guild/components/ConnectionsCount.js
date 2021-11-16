import React from "react";
import { Annotation } from "@styled-icons/heroicons-solid";
import pluralize from "src/utilities/pluralize";
import { Box, Text, Tooltip } from "@advisable/donut";

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
    <Tooltip placement="top" maxWidth={200} content={tooltipText}>
      <Box
        {...props}
        color="neutral600"
        display="inline-flex"
        alignItems="center"
        css={`
          outline: none;
          cursor: default;
          user-select: none;
        `}
      >
        <Annotation size={20} />
        <Text
          marginLeft={1}
          marginTop="-1px"
          fontSize="sm"
          fontWeight={460}
          letterSpacing="-0.01rem"
        >
          {pluralize(count, "connection", "connections")}
        </Text>
      </Box>
    </Tooltip>
  );
}
