import React from "react";
import { Box } from "@advisable/donut";
import { CoverImage } from "@guild/components/CoverImage";

export default function PostCover({ post }) {
  return post.coverImage?.url ? (
    <Box mb="6">
      <a href={`/guild/posts/${post.id}`}>
        <CoverImage
          height={{ _: "200px", s: "320px" }}
          cover={post.coverImage.url}
        />
      </a>
    </Box>
  ) : null;
}
