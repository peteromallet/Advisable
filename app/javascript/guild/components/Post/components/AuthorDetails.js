import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Avatar, Link } from "@advisable/donut";

export default function AuthorDetails({ post }) {
  return (
    <Box display="flex" marginBottom="5" alignItems="center">
      <Avatar
        as={RouterLink}
        to={`/freelancers/${post.author.id}/guild`}
        size="s"
        name={post.author.name}
        url={post.author.avatar}
      />
      <Box ml="3">
        <Link
          mb={0.5}
          variant="dark"
          fontSize={["m", "l"]}
          color="neutral900"
          letterSpacing="-0.01rem"
          to={`/freelancers/${post.author.id}/guild`}
        >
          {post.author.name}
        </Link>
        <Text fontSize="xs" letterSpacing="-0.01rem" color="neutral600">
          {post.createdAtTimeAgo} ago
        </Text>
      </Box>
    </Box>
  );
}
