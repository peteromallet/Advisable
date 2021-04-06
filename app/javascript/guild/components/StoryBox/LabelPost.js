import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, Box, Avatar, Link } from "@advisable/donut";

export default function LabelPost({ post }) {
  return (
    <Box data-testid="labelPost">
      <Box height="1px" bg="neutral100" marginY="s" />
      <Box display="flex" alignItems="center">
        <Box marginRight="2" flexShrink="0">
          <Avatar
            as={RouterLink}
            to={`/freelancers/${post.author.id}/guild`}
            size="xs"
            name={post.author.name}
            url={post.author.avatar}
          />
        </Box>
        <Text
          display="block"
          fontSize="s"
          color="neutral900"
          letterSpacing="-0.03rem"
          as={Link}
          to={`/posts/${post.id}`}
        >
          {post.title}
        </Text>
      </Box>
    </Box>
  );
}
