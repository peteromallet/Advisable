import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, Box, Avatar, Link } from "@advisable/donut";

export default function LabelPost({ post }) {
  return (
    <Box data-testid="labelPost" display="flex" alignItems="center">
      <Box marginRight="3" flexShrink="0">
        <Avatar
          size="xs"
          as={RouterLink}
          to={`/freelancers/${post.author.id}/guild`}
          name={post.author.name}
          url={post.author.avatar}
        />
      </Box>
      <Text
        as={Link}
        fontSize="sm"
        color="neutral900"
        letterSpacing="-0.01rem"
        to={`/posts/${post.id}`}
        css={`
          min-width: 0;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
      >
        {post.title}
      </Text>
    </Box>
  );
}
