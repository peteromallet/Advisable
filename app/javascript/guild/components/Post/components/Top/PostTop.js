import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, Avatar, Link } from "@advisable/donut";
import PostTypeTag from "@guild/components/PostTypeTag";
import { CoverImage } from "@guild/components/CoverImage";

export default function PostTop({ post }) {
  return (
    <>
      <Box position="absolute" right="2" top="2">
        <PostTypeTag post={post} />
      </Box>

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

      {post.coverImage ? (
        <Box mb="6">
          <a href={`/guild/posts/${post.id}`}>
            <CoverImage
              height={{ _: "200px", s: "320px" }}
              cover={post.coverImage.url}
            />
          </a>
        </Box>
      ) : null}
    </>
  );
}
