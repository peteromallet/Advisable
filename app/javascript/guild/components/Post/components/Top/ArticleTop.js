import React from "react";
import { Box } from "@advisable/donut";
import PostTypeTag from "@guild/components/PostTypeTag";
import { CoverImage } from "@guild/components/CoverImage";
import OrbitsBackground from "@guild/components/Event/OrbitsBackground";

export default function ArticleTop({ post }) {
  return (
    <>
      <Box margin={{ _: "-18px -18px 24px", s: "-26px -26px 24px" }}>
        <a href={`/guild/posts/${post.id}`}>
          {post.coverImage?.url ? (
            <CoverImage height="269px" cover={post.coverImage.url} />
          ) : (
            <OrbitsBackground height="269px" borderRadius="12px 12px 0 0" />
          )}
        </a>
      </Box>

      {/*  TODO: Not sure if we need a different style for these ...  */}
      <Box position="absolute" right="2" top="2">
        <PostTypeTag post={post} />
      </Box>
    </>
  );
}
