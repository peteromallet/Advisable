import React from "react";
import { Box } from "@advisable/donut";
import { CoverImage } from "@guild/components/CoverImage";

export default function ArticleCover({ post }) {
  return post.coverImage?.url ? (
    <Box margin={{ _: "-18px -18px 24px", s: "-26px -26px 24px" }}>
      <a href={`/guild/posts/${post.id}`}>
        <CoverImage height="269px" cover={post.coverImage.url} />
      </a>
    </Box>
  ) : null;
}
